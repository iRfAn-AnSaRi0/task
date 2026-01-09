import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import { User } from "../model/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import mongoose from "mongoose"

const GenerateRefreshAndAccessToken = async (user) => {
    const RefreshToken = jwt.sign(
        { id: user.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    )
    const AccessToken = jwt.sign(
        { id: user.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )

    user.refreshtoken = RefreshToken
    await user.save({ validateBeforeSave: false })

    return { RefreshToken, AccessToken }
}



const register = asyncHandler(async (req, res) => {
    const { username, email, password, referrer } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json(
            new apiError(
                400,
                "User Already Exists"
            )

        )
    }

    const userCreated = await User.create({
        username,
        email,
        password,
        referrer: referrer || null
    })

    if (userCreated) {
        return res.status(201).json(
            new apiResponse(
                201,
                "Register Successfully"
            )
        )
    } else {
        return res.status(500).json(
            new apiError(
                500,
                "Internal Server Error"
            )
        )
    }

})


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    console.log(password);
    

    const user = await User.findOne({ email }).select("+password");
    // console.log(user.password);
    

    if (!user) {
        return res.status(400).json(
            new apiError(
                400,
                "Invalid email"
            )
        )
    }

      console.log("REQ PASS:", password);
  console.log("DB PASS:", user.password);

    const passwordcheck = await bcrypt.compare(password, user.password)

    if (!passwordcheck) {
        return res.status(400).json(
            new apiError(
                400,
                "Invalid password"
            )
        )
    }

    const { RefreshToken, AccessToken } = await GenerateRefreshAndAccessToken(user);

    const option = {
        httpOnly: true,
        // secure : true 
    }

    return res.status(200)
        .cookie("RefreshToken", RefreshToken, option)
        .cookie("AccessToken", AccessToken, option)
        .json(
            new apiResponse(
                200,
                { RefreshToken, AccessToken,
                    user:{
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                 },
                "Login Successfully"
            )
        )

})


export { register, login }