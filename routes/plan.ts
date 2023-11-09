import { Router } from "express";
const router = Router();

import { addPlan, getPlan, updatePlan } from "../controllers/plans";

router.route("/details").post(addPlan).get(getPlan);
router.route("/update").patch(updatePlan);

export default router;
