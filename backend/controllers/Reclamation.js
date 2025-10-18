import Reclamation from "../models/Reclamation.js";

export const createReclamation = async (req, res) => {
  try {
    const { Full_Name, Email, phone, description } = req.body;

    if (!Full_Name || !Email || !phone) {
      return res.status(400).json({ message: "Full name, email, and phone are required." });
    }

    const newReclamation = new Reclamation({
      Full_Name,
      Email,
      phone,
      description,
    });

    const savedReclamation = await newReclamation.save();
    res.status(201).json(savedReclamation);
  } catch (error) {
    console.error("Error creating reclamation:", error);
    res.status(500).json({ message: "Server error while creating reclamation." });
  }
};

export const getReclamations = async (req, res) => {
  try {
    const reclamations = await Reclamation.find().sort({ createdAt: -1 });
    res.status(200).json(reclamations);
  } catch (error) {
    console.error("Error fetching reclamations:", error);
    res.status(500).json({ message: "Server error while fetching reclamations." });
  }
};
