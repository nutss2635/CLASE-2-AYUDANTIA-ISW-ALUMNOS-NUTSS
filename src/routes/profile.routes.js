import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getPublicProfile,
  getPrivateProfile,
  patchUserProfile,
  deleteUserAccount,
} from "../controllers/profile.controller.js";

const router = Router();

// Endpoints existentes
router.get("/public", getPublicProfile);
router.get("/private", authMiddleware, getPrivateProfile);

// 🔹 Nuevos endpoints
router.patch("/private", authMiddleware, patchUserProfile);
router.delete("/private", authMiddleware, deleteUserAccount);

export default router;
