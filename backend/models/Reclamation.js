import mongoose from "mongoose";

const ReclamationSchema = new mongoose.Schema(
  {
    Full_Name: { type: String, required: true },
    Email: { type: String, required: true },
    phone: { type: String, required: true },
    description:{type:String }
  },
  { timestamps: true }
);

export default mongoose.model("Reclamation", ReclamationSchema);