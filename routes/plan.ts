import { Router } from "express";
const router = Router();

import {
  addPlan,
  getPlan,
  updatePlan,
  adminGetPlansByIdFromEmail,
  getOnePlan,
} from "../controllers/plans";

router.route("/details").post(addPlan).get(getPlan);
router.route("/update/:id").patch(updatePlan);
router
  .route("/adminGetPlansByIdFromEmail/:id")
  .post(adminGetPlansByIdFromEmail);
router.route("/admin/getOnePlan/:id").get(getOnePlan);

export default router;
