import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import { Investments } from "../model/investmentModel.js"


const createInvestment = asyncHandler(async (req, res) => {
    const { amount, plan } = req.body;

    const userID = req.user._id

    if (!amount || amount <= 0) {
        return res.status(400).json(
            new apiError(
                400,
                "Invalid amount"
            )
        );
    }


    const plans = {
        BASIC: { roi: 1, days: 30 },
        PRO: { roi: 1.5, days: 60 },
        PREMIUM: { roi: 2, days: 90 }
    };

    if (!plans[plan]) {
        return res.status(400).json(
            new apiError(
                400,
                "Invalid plan"
            )
        );
    }

    const dailyROI = (amount * plans[plan].roi) / 100;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plans[plan].days);


    const investment = await Investments.create({
        user: userID,
        amount,
        plan,
        dailyROI,
        startDate,
        endDate
    });

    return res.status(201).json(
        new apiResponse(
            201,
            "Investment created successfully",
            { investment }
        )
    );

})

export { createInvestment }