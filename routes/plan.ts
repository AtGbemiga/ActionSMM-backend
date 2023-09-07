import { Router } from "express";
const router = Router();

import { addPlan } from "../controllers/plans";

router.route("/details").post(addPlan);

export default router;
