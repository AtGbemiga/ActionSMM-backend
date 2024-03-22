import { Router } from "express";
const router = Router();
import { errorHandler } from "../middleware/errorHandler";
import {
  login,
  logout,
  register,
  resetPassword,
  updateAccountRole,
  getAllAccounts,
} from "../controllers/auth";
import { accessRoute } from "../middleware/accessRoute";

router.route("/register").post(register);
router.route("/login").post(login, errorHandler);
router.route("/logout").get(logout);
router.route("/reset-password").post(resetPassword, errorHandler);
router.route("/updateAccountRole").patch(accessRoute, updateAccountRole);
router.route("/getAllAccounts").get(accessRoute, getAllAccounts);

export default router;
