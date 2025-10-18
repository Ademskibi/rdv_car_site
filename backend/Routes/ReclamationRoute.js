import express from "express";
import { createReclamation, getReclamations } from "../controllers/Reclamation.js";

const router = express.Router();    
router.post("/", createReclamation);
router.get("/", getReclamations);
export default router;
