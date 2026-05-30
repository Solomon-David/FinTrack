import mongoose, { Model, Schema } from "mongoose";
import { IRCData } from "../interfaces";

const ContactSubSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String },
  },
  { _id: false }
);

const RCDataSchema: Schema<IRCData> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    currency: { type: String, required: true },
    date: { type: Date, required: true },
    sender: { type: ContactSubSchema, required: true },
    amount: {
      amount: { type: Number, required: true },
      currency: { type: String, required: true },
      size: { type: String, enum: ["GB", "MB"] },
    },
    type: { type: String, enum: ["airtime", "data"], required: true },
    network: { type: String, enum: ["MTN", "Airtel", "Glo", "9mobile"], required: true },
    remark: { type: String },
  },
  { timestamps: true }
);

const RCDataModel: Model<RCData> = mongoose.models.RCData || mongoose.model<RCData>("RCData", RCDataSchema);

export default RCDataModel;
