import express from "express";
import {
  createRDV,
  createRDV_RE,
  confirmRDV,
  cancelRDV,
  getAllRDVs,
  getRDVById,
  getDisabledDatesByPoste,
} from "../controllers/RDVController.js";
import photoUpload from "../cloudinary/photoUpload.js";

const router = express.Router();
router.post("/replace_engine", photoUpload.array("Images", 5), createRDV_RE);
router.post("/", photoUpload.array("Images", 5), createRDV);
router.put("/confirm/:id", confirmRDV);
router.put("/cancel/:id", cancelRDV);
router.get("/", getAllRDVs);
router.get("/:id", getRDVById);
router.get("/disabled-dates/:poste", getDisabledDatesByPoste);

export default router;
