import mongoose, { Model, Schema } from "mongoose";
import User from "./User";
import { IIncome } from "./interfaces";

const IncomeSchema: Schema<IIncome> = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'Contact', required: true },
    amount: { type: Number, required: true },
    currency: { type: String },
    date: { type: Date, required: true },
    purpose: { type: String }
}, { timestamps: true });

IncomeSchema.pre<IIncome>("save", async function() {
  if (!this.currency && this.user) {
    const u = await User.findById(this.user).select("preferredCurrency").lean();
    if (u?.preferredCurrency) {
      this.currency = u.preferredCurrency;
    }
  }
});

const Income: Model<IIncome> = mongoose.models.Income || mongoose.model<IIncome>('Income', IncomeSchema);

export default Income;
