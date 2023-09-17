import { Router } from "express";
const router = Router();

import { addPlan, getPlan } from "../controllers/plans";

router.route("/details").post(addPlan).get(getPlan);

export default router;
