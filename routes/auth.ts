import { Router } from "express";
const router = Router();
import { errorHandler } from "../middleware/errorHandler";

import { login, logout, register, resetPassword } from "../controllers/auth";

router.route("/register").post(register);
router.route("/login").post(login, errorHandler);
router.route("/logout").get(logout);
router.route("/reset-password").post(resetPassword, errorHandler);

export default router;
