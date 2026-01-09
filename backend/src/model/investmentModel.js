import mongoose, { Schema } from "mongoose"

const investmentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    amount: {
        type: Number,
        required: true
    },
    plan: {
        type: String,
        enum: ["BASIC", "PRO", "PREMIUM"],
        required: true
    },
    dailyROI: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["ACTIVE", "COMPLETED"],
        default: "ACTIVE"
    }
}, {timestamps:true})

export const Investments = mongoose.model("Investments" , investmentSchema)