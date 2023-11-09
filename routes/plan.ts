import { Router } from "express";
const router = Router();

import { addPlan, getPlan, updatePlan } from "../controllers/plans";

router.route("/details").post(addPlan).get(getPlan);
router.route("/update/:id").patch(updatePlan);

export default router;
