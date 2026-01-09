import mongoose, { Schema } from "mongoose"

const referralsSchema = new Schema({
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    toUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    investment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Investments"
    }
}, { timestamps: true })

referralsSchema.index({ fromUser: 1, toUser: 1, level: 1, investment: 1 }, { unique: true });

export const Referrals = mongoose.model("Referrals", referralsSchema)