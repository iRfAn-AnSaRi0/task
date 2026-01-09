import mongoose, {Schema} from "mongoose"

const roiSchema = new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",   
      required: true
    },
    investment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Investments",  
      required: true
    },
    date: {
      type: String, 
      required: true
    },
    amount: {
      type: Number,  
      required: true
    }
}, {timestamps:true})

roiSchema.index({ investment: 1, date: 1 }, { unique: true });

export const ROIHistory = mongoose.model("ROIHistory", roiSchema)