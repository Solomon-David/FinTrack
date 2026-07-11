// models/Bill.ts
import mongoose, { Model, Schema } from "mongoose";
import User from "./User";
import { BillTypeEntry } from "../interfaces";

const BillSchema: Schema<BillTypeEntry> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    total: { type: Number, required: false },
    currency: { type: String, required: false },
    recurrence: { type: String, required: true },
    dueEvery: { type: Number, required: false },
    dueDate: { type: Date, required: false },
    amountPaid: { type: Number, required: false, default: 0 },
    status: {
      type: String,
      enum: ["Paid", "Part", "Unpaid", "Overdue"],
      default: "Unpaid",
    },
    remark: { type: String, required: false },
  },
  { timestamps: true }
);

BillSchema.pre<BillTypeEntry>("save", async function () {
  if (!this.currency && this.user) {
    const u = await User.findById(this.user).select("preferredCurrency").lean();
    if (u?.preferredCurrency) this.currency = u.preferredCurrency;
  }
});

const BillType: Model<BillTypeEntry> = mongoose.models.BillType || mongoose.model<BillTypeEntry>("BillType", BillSchema);

export default BillType;