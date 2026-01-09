import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../model/userModel.js"

const buildReferralTree = async (userId) => {

    const referrals = await User.find({ referrer: userId })
        .select("_id username email")
        .lean();

    const referralTree = await Promise.all(
        referrals.map(async (ref) => ({
            userId: ref._id,
            username: ref.username,
            email: ref.email,
            referrals: await buildReferralTree(ref._id)
        }))
    );

    return referralTree;
};

const getReferralTree = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const tree = await buildReferralTree(userId);

    return res.status(200).json({
        success: true,
        data: tree
    });
});

export { getReferralTree }