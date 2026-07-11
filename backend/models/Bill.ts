// models/Bill.ts
import mongoose, { Model, Schema } from "mongoose";
import User from "./User";
import { IBill } from "../interfaces";

const BillSchema: Schema<IBill> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    billType: { type: Schema.Types.ObjectId, ref: "BillType", required: true },
    amount: { type: Number, required: true }, // amount paid in this transaction
    currency: { type: String },
    date: { type: Date, required: true },
    remark: { type: String },
  },
  { timestamps: true }
);

BillSchema.pre<IBill>("save", async function () {
  if (!this.currency && this.user) {
    const u = await User.findById(this.user).select("preferredCurrency").lean();
    if (u?.preferredCurrency) this.currency = u.preferredCurrency;
  }
});

const Bill: Model<IBill> = mongoose.models.Bill || mongoose.model<IBill>("Bill", BillSchema);

export default Bill;