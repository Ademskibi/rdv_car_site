import RDV from "../models/RDV.js";
import path from "path";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
import validator from "validator";

dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup for temporary local storage
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
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "video/mp4",
    ];
    if (allowedMimeTypes.includes(file.mimetype)) cb(null, true);
    else cb({ message: "Unsupported file format" }, false);
  },
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
});

// Upload files to Cloudinary
const cloudinaryUploadFile = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(filePath); // delete temp file
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

// Compare dates ignoring time
const sameDay = (d1, d2) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

// -------------------- CONTROLLERS -------------------- //

// Create Normal RDV
export const createRDV = async (req, res) => {
  try {
    const {
      First_Name,
      Last_Name,
      phone,
      Matricule,
      Model,
      Motor_type,
      Date_RDV,
      Poste,
    } = req.body;

    // Validation
    if (!First_Name || !Last_Name || !phone || !Matricule || !Model || !Motor_type || !Date_RDV || !Poste)
      return res.status(400).json({ message: "Missing required fields" });

    if (!validator.isMobilePhone(phone, "any"))
      return res.status(400).json({ message: "Invalid phone number" });

    if (new Date(Date_RDV) < new Date())
      return res.status(400).json({ message: "Cannot book a past date" });

    if (Poste === "Fast service") {
      const existing = await RDV.findOne({ Poste, Date_RDV, Type: true });
      if (existing)
        return res.status(400).json({ message: "This date is already booked for Fast service" });
    }

    let uploadedUrls = [];
    if (req.files && req.files.length > 0) {
      uploadedUrls = await uploadFiles(req.files);
    }

    const newRDV = new RDV({
      First_Name,
      Last_Name,
      phone,
      Matricule,
      Model,
      Motor_type,
      Date_RDV,
      Poste,
      Images: uploadedUrls,
      Type: false,
    });

    const savedRDV = await newRDV.save();
    res.status(201).json(savedRDV);
  console.log("req.body:", req.body);
console.log("req.files:", req.files);
  } catch (error) {
    console.error("Error creating RDV:", error);
    res.status(500).json({ message: "Error creating RDV", error: error.message });
  }
  console.log("req.body:", req.body);
console.log("req.files:", req.files);
};


// Create replace engine RDV (blocks 3 consecutive days)
export const createRDV_RE = async (req, res) => {
  try {
    const {
      First_Name,
      Last_Name,
      phone,
      Matricule,
      Model,
      Motor_type,
      Date_RDV,
      Poste,
   
    } = req.body;

    // Validation
    if (
      !First_Name ||
      !Last_Name ||
      !phone ||
      !Matricule ||
      !Model ||
      !Motor_type ||
      !Date_RDV ||
      !Poste
    )
      return res.status(400).json({ message: "Missing required fields" });

    if (!validator.isMobilePhone(phone, "any"))
      return res.status(400).json({ message: "Invalid phone number" });

    if (new Date(Date_RDV) < new Date())
      return res.status(400).json({ message: "Cannot book a past date" });

    if (Poste === "Fast service") {
      const existing = await RDV.findOne({
        Poste: "Fast service",
        Date_RDV,
        Type: true,
      });
      if (existing)
        return res
          .status(400)
          .json({ message: "This date is already booked for Fast service" });
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
      phone,
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
    res
      .status(500)
      .json({ message: "Error creating Fast Service RDV", error: error.message });
  }
};

// Confirm RDV
export const confirmRDV = async (req, res) => {
  try {
    const { id } = req.params;
    const rdv = await RDV.findById(id);
    if (!rdv) return res.status(404).json({ message: "RDV not found" });

    rdv.Type = true;
    await rdv.save();

    // Update DisabledDates for same Poste
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

// Cancel RDV
export const cancelRDV = async (req, res) => {
  try {
    const { id } = req.params;
    const rdv = await RDV.findById(id);
    if (!rdv) return res.status(404).json({ message: "RDV not found" });

    // Remove dates from other RDVs
    if (rdv.DisabledDates.length > 0) {
      await RDV.updateMany(
        { Poste: rdv.Poste },
        { $pull: { DisabledDates: { $in: rdv.DisabledDates } } }
      );
    }

    await RDV.findByIdAndDelete(id);
    res.status(200).json({ message: "RDV canceled and dates freed" });
  } catch (error) {
    console.error("Error canceling RDV:", error);
    res.status(500).json({ message: "Error canceling RDV", error: error.message });
  }
};

// Get all RDVs
export const getAllRDVs = async (req, res) => {
  try {
    const rdvs = await RDV.find();
    res.status(200).json(rdvs);
  } catch (error) {
    console.error("Error fetching RDVs:", error);
    res.status(500).json({ message: "Error fetching RDVs", error: error.message });
  }
};

// Get RDV by ID
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

// Get Disabled Dates by Poste
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
