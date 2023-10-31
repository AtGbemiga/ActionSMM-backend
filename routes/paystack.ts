import { Router } from "express";
const router = Router();

import {
  paystack,
  starter,
  pro,
  supreme,
  starterPlus,
  proPlus,
  supremePlus,
} from "../controllers/paystack";

router.route("/payment").get(paystack);
router.route("/starter").get(starter);
router.route("/pro").get(pro);
router.route("/supreme").get(supreme);
router.route("/starterPlus").get(starterPlus);
router.route("/proPlus").get(proPlus);
router.route("/supremePlus").get(supremePlus);

export default router;
