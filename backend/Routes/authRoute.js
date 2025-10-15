import express from "express";
import { register, login, verifyToken } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Example protected route
router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

export default router;
