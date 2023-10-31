import { Router } from "express";
const router = Router();

import { email, createEmail } from "../controllers/profile";

router.route("/").get(email).post(createEmail);

export default router;
