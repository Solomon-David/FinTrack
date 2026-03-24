import mongoose, { Model, Schema } from "mongoose";
import User from "./User";
import { IExpense } from "./interfaces";

const ExpenseSchema: Schema<IExpense> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    currency: { type: String },
    date: { type: Date, required: true },

    item: { type: String, required: true },
    isBill: { type: Boolean, default: false },
    bill: { type: Schema.Types.ObjectId, ref: "Bill" },
    vendor: {
      name: { type: String, required: true },
      phone: { type: String },
    },
  },
  { timestamps: true }
);

ExpenseSchema.pre<IExpense>("save", async function() {
  if (!this.currency && this.user) {
    const u = await User.findById(this.user).select("preferredCurrency").lean();
    if (u?.preferredCurrency) {
      this.currency = u.preferredCurrency;
    }
  }
});

const Expense: Model<IExpense> = mongoose.models.Expense || mongoose.model<IExpense>("Expense", ExpenseSchema);

export default Expense;
