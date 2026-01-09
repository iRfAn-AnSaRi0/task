import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    referrer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    balance: {
        type: Number,
        default: 0,
    },
    roiIncome: {
        type: Number,
        default: 0,
    },
    levelIncome: {
        type: Number,
        default: 0,
    },
}, { timestamps: true })

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

export const User = mongoose.model("Users", userSchema);