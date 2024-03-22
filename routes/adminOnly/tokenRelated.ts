import { Router } from "express";
const router = Router();
// import { errorHandler } from "../middleware/errorHandler";
import { checkRoleViaToken } from "../../controllers/adminOnly/checkRoleViaToken";

router.route("/checkRoleViaToken").get(checkRoleViaToken);

export default router;
