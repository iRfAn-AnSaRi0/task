import { Router } from "express";
import { register, login } from "../controller/userController.js";

const userroutes = Router();

userroutes.route("/Register").post(
    register
)

userroutes.route("/Login").post(
    login
)

export { userroutes }