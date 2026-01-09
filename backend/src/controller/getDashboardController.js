import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import { User } from "../model/userModel.js"
import { Referrals } from "../model/levelIncomeModel.js"
import { ROIHistory } from "../model/roiHistoryModel.js"
import { Investments } from "../model/investmentModel.js"


const getDashboard = asyncHandler(async (req, res) => {
    const userID = req.user._id;

    const investment = await Investments.find({ user: userID }).leap();

    const roiData = await ROIHistory.aggregate([
        { $match: { user: userID } },
        {
            $group: {
                _id: "$investment",
                totalROI: { $sum: "$amount" }
            }
        }
    ])

    const roiMap = {};
    roiData.forEach(r => {
        roiMap[r._id.toString()] = r.totalROI;
    });

    const investmentsWithROI = investment.map(inv => ({
        ...inv,
        totalROI: roiMap[inv._id.toString()] || 0
    }));

    const levelIncomeData = await Referrals.aggregate([
        { $match: { toUser: userID } },
        {
            $group: {
                _id: "$level",
                total: { $sum: "$amount" }
            }
        }
    ]);


    const levelIncome = {};
    let totalLevelIncome = 0;
    levelIncomeData.forEach(l => {
        Referrals[`level${l._id}`] = l.total;
        totalLevelIncome += l.total;
    });


    const totalROI = investmentsWithROI.reduce((sum, inv) => sum + inv.totalROI, 0);

    return res.status(200).json(
        new apiResponse(
            200,
            data = {
                investments: investmentsWithROI,
                totalROI,
                levelIncome,
                totalLevelIncome
            }
        ));

})

export { getDashboard }