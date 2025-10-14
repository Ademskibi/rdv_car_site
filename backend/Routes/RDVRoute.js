import express from "express";
import {
  createRDV,
  createRDVFS,
  confirmRDV,
  cancelRDV,
  getAllRDVs,
  getRDVById,
  getDisabledDatesByPoste,
} from "../controllers/RDVController.js";
import photoUpload from "../cloudinary/photoupload.js";

const router = express.Router();
router.post("/ER", photoUpload.array("Images", 5), createRDVFS);
router.post("/", photoUpload.array("Images", 5), createRDV);
router.put("/confirm/:id", confirmRDV);
router.put("/cancel/:id", cancelRDV);
router.get("/", getAllRDVs);
router.get("/:id", getRDVById);
router.get("/disabled-dates/:poste", getDisabledDatesByPoste);

export default router;
