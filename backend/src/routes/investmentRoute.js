import { Router } from "express";
import { VerifyUser } from "../middleware/authMiddleware.js"
import { createInvestment } from "../controller/investmentController.js"

const investmentroutes = Router();

investmentroutes.route("/Investment").post(
    VerifyUser,
    createInvestment
)



export { investmentroutes }