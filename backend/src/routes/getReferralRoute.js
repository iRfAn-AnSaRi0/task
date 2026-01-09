import { Router } from "express";
import { VerifyUser } from "../middleware/authMiddleware.js"
import { getReferralTree } from "../controller/referraController.js"

const getReferralTreeroutes = Router();

getReferralTreeroutes.route("/Referral").get(
    VerifyUser,
    getReferralTree
)

export { getReferralTreeroutes }