import RDV from "../models/RDV.js";
import path from "path";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// 🧩 Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🗂️ Multer Setup for Local Temp Storage
const mediaStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

export const mediaUpload = multer({
  storage: mediaStorage,
  fileFilter: function (req, file, cb) {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "video/mp4"];
    if (allowedMimeTypes.includes(file.mimetype)) cb(null, true);
    else cb({ message: "Unsupported file format" }, false);
  },
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
});

// 🧠 Helper Functions
const cloudinaryUploadFile = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(filePath); // delete local temp file
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error.message);
    throw new Error("Cloudinary upload failed");
  }
};

const uploadFiles = async (files = []) => {
  const uploaded = [];
  for (const file of files) uploaded.push(await cloudinaryUploadFile(file.path));
  return uploaded;
};

// Compare two dates ignoring timezones
const sameDay = (d1, d2) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

// 🆕 Create RDV (Normal)
export const createRDV = async (req, res) => {
  try {
    const { First_Name, Last_Name, Matricule, Model, Motor_type, Date_RDV, Poste } = req.body;

    // Validate required fields
    if (!First_Name || !Last_Name || !Matricule || !Model || !Motor_type || !Date_RDV || !Poste)
      return res.status(400).json({ message: "Missing required fields" });

    // Prevent past date booking
    if (new Date(Date_RDV) < new Date())
      return res.status(400).json({ message: "Cannot book a past date" });

    // Prevent duplicate booking for Fast Service
    if (Poste === "Fast service") {
      const existing = await RDV.findOne({ Poste: "Fast service", Date_RDV, Type: true });
      if (existing)
        return res.status(400).json({ message: "This date is already booked for Fast service" });
    }

    const DisabledDates = new Date(Date_RDV);
    const uploadedUrls = await uploadFiles(req.files);

    const newRDV = new RDV({
      First_Name,
      Last_Name,
      Matricule,
      Model,
      Motor_type,
      Date_RDV,
      Poste,
      Images: uploadedUrls,
      DisabledDates,
      Type: false,
    });

    const savedRDV = await newRDV.save();
    res.status(201).json(savedRDV);
  } catch (error) {
    console.error("Error creating RDV:", error);
    res.status(500).json({ message: "Error creating RDV", error: error.message });
  }
};

// 🆕 Create RDV (Fast Service — blocks 3 consecutive days)
export const createRDVFS = async (req, res) => {
  try {
    const { First_Name, Last_Name, Matricule, Model, Motor_type, Date_RDV, Poste } = req.body;

    if (!First_Name || !Last_Name || !Matricule || !Model || !Motor_type || !Date_RDV || !Poste)
      return res.status(400).json({ message: "Missing required fields" });

    if (new Date(Date_RDV) < new Date())
      return res.status(400).json({ message: "Cannot book a past date" });

    if (Poste === "Fast service") {
      const existing = await RDV.findOne({ Poste: "Fast service", Date_RDV, Type: true });
      if (existing)
        return res.status(400).json({ message: "This date is already booked for Fast service" });
    }

    const startDate = new Date(Date_RDV);
    const DisabledDates = [];
    for (let i = 0; i < 3; i++) {
      const newDate = new Date(startDate);
      newDate.setDate(startDate.getDate() + i);
      DisabledDates.push(newDate);
    }

    const uploadedUrls = await uploadFiles(req.files);

    const newRDV = new RDV({
      First_Name,
      Last_Name,
      Matricule,
      Model,
      Motor_type,
      Date_RDV,
      Poste,
      Images: uploadedUrls,
      DisabledDates,
      Type: false,
    });

    const savedRDV = await newRDV.save();
    res.status(201).json(savedRDV);
  } catch (error) {
    console.error("Error creating Fast Service RDV:", error);
    res.status(500).json({ message: "Error creating Fast Service RDV", error: error.message });
  }
};

// ✅ Confirm RDV
export const confirmRDV = async (req, res) => {
  try {
    const { id } = req.params;
    const rdv = await RDV.findById(id);
    if (!rdv) return res.status(404).json({ message: "RDV not found" });

    rdv.Type = true;
    await rdv.save();

    const samePosteRDVs = await RDV.find({ Poste: rdv.Poste });
    for (const r of samePosteRDVs) {
      for (const d of rdv.DisabledDates) {
        const exists = r.DisabledDates.some((existing) =>
          sameDay(new Date(existing), new Date(d))
        );
        if (!exists) r.DisabledDates.push(d);
      }
      await r.save();
    }

    res.status(200).json({
      message: `RDV confirmed for ${rdv.Model}. All related dates disabled for "${rdv.Poste}".`,
      rdv,
    });
  } catch (error) {
    console.error("Error confirming RDV:", error);
    res.status(500).json({ message: "Error confirming RDV", error: error.message });
  }
};

// ❌ Cancel RDV (and clean up DisabledDates)
export const cancelRDV = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the RDV to cancel
    const rdv = await RDV.findById(id);
    if (!rdv) return res.status(404).json({ message: "RDV not found" });

    // Remove this RDV's dates from DisabledDates of all RDVs of the same Poste
    if (rdv.DisabledDates.length > 0) {
      await RDV.updateMany(
        { Poste: rdv.Poste },
        { $pull: { DisabledDates: { $in: rdv.DisabledDates } } }
      );
    }

    // Delete the RDV
    await RDV.findByIdAndDelete(id);

    res.status(200).json({ message: "✅ RDV canceled and dates freed" });
  } catch (error) {
    console.error("❌ Error canceling RDV:", error);
    res.status(500).json({ message: "Error canceling RDV", error: error.message });
  }
};

// 📋 Get All RDVs
export const getAllRDVs = async (req, res) => {
  try {
    const rdvs = await RDV.find();
    res.status(200).json(rdvs);
  } catch (error) {
    console.error("Error fetching RDVs:", error);
    res.status(500).json({ message: "Error fetching RDVs", error: error.message });
  }
};

// 🔍 Get RDV by ID
export const getRDVById = async (req, res) => {
  try {
    const rdv = await RDV.findById(req.params.id);
    if (!rdv) return res.status(404).json({ message: "RDV not found" });
    res.status(200).json(rdv);
  } catch (error) {
    console.error("Error fetching RDV:", error);
    res.status(500).json({ message: "Error fetching RDV", error: error.message });
  }
};

// 📅 Get Disabled Dates by Poste
export const getDisabledDatesByPoste = async (req, res) => {
  try {
    const { poste } = req.params;
    const rdvs = await RDV.find({ Poste: poste, Type: true }, "DisabledDates");
    const dates = rdvs.flatMap((r) => r.DisabledDates);
    res.status(200).json(dates);
  } catch (error) {
    console.error("Error fetching disabled dates:", error);
    res.status(500).json({ message: "Error fetching disabled dates", error: error.message });
  }
};
