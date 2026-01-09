import { Router } from "express";
import { VerifyUser } from "../middleware/authMiddleware.js"
import { getDashboard } from "../controller/getDashboardController.js"

const getDashboardroutes = Router();

getDashboardroutes.route("/Dashboard").get(
    VerifyUser,
    getDashboard
)

export { getDashboardroutes }