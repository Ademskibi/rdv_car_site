import mongoose from "mongoose";

const RDVSchema = new mongoose.Schema(
  {
    First_Name: { type: String, required: true },
    Last_Name: { type: String, required: true },
    phone: { type: String, required: true },
    Matricule: { type: String, required: true },
    Model: { type: String, required: true },
    Motor_type: { type: String, required: true },
    Date_RDV: { type: Date, required: true },
    Images: [{ type: String }], 
    Poste: { type: String, required: true },
    DisabledDates: { type: [Date], default: [] },
    Type: { type: Boolean, default: false }, 
    description:{type:String }
  },
  { timestamps: true }
);

export default mongoose.model("RDV", RDVSchema);
