import cron from "node-cron"
import { User } from "../model/userModel.js"
import { ROIHistory } from "../model/roiHistoryModel.js"
import { Investments } from "../model/investmentModel.js"



cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Daily ROI job started...");

    const today = new Date().toISOString().slice(0, 10); 

 
    const investments = await Investments.find({ status: "ACTIVE" });

    for (const inv of investments) {
      if (new Date() > inv.endDate) {
        inv.status = "COMPLETED";
        await inv.save();
        continue;
      }

      const existingROI = await ROIHistory.findOne({ investment: inv._id, date: today });
      if (existingROI) continue;

    
      await ROIHistory.create({
        user: inv.user,
        investment: inv._id,
        date: today,
        amount: inv.dailyROI
      });

      await User.findByIdAndUpdate(inv.user, {
        $inc: { balance: inv.dailyROI, roiIncome: inv.dailyROI }
      });
    }

    console.log("Daily ROI job completed successfully.");

  } catch (error) {
    console.error("Error running daily ROI job:", error);
  }
});