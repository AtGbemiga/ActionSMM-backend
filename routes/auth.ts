import { Router } from "express";
const router = Router();

import { login, logout, register, resetPassword } from "../controllers/auth";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/reset-password").post(resetPassword);

export default router;
