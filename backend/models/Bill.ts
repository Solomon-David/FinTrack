import mongoose, { Model, Schema } from "mongoose";
import User from "./User";
import { IBill } from "../interfaces";

const BillSchema: Schema<IBill> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true }, // amount paid so far
    total: { type: Number, required: true },  // total amount owed
    currency: { type: String },
    date: { type: Date, required: true },

    type: {
      type: String,
      enum: ["Electricity", "Accommodation", "Subscription", "Insurance", "Utility", "Other"],
      required: true,
    },
    name: { type: String, required: true },
    status: {
      type: String,
      enum: ["Paid", "Part", "Unpaid", "Overdue"],
      required: true,
    },
    recurrence: {
      type: String,
      enum: ["One-time", "Daily", "Weekly", "Monthly", "Yearly"],
      required: true,
    },
    dueEvery: { type: Number },
    dueDate: { type: Date },
    remark: { type: String, required: true },
  },
  { timestamps: true }
);

BillSchema.pre<IBill>("save", async function() {
  if (!this.currency && this.user) {
    const u = await User.findById(this.user).select("preferredCurrency").lean();
    if (u?.preferredCurrency) {
      this.currency = u.preferredCurrency;
    }
  }

  // Auto-derive status from amount vs total — unless explicitly Overdue (handled by cron)
  if (this.status !== "Overdue") {
    if (this.amount >= this.total) {
      this.status = "Paid";
    } else if (this.amount > 0) {
      this.status = "Part";
    } else {
      this.status = "Unpaid";
    }
  }
});

const Bill: Model<IBill> = mongoose.models.Bill || mongoose.model<IBill>("Bill", BillSchema);

export default Bill;