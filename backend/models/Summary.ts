import mongoose, { Model, Schema } from "mongoose";
import User from "./User";
import { ISummary } from "../interfaces";

const SummaryDataEntrySchema = new Schema(
  {
    category: { type: String, required: true },
    total: { type: Number, required: true },
  },
  { _id: false }
);

const DataRangeSchema = new Schema(
  {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  { _id: false }
);

const SummarySchema: Schema<ISummary> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    timeframe: { type: String, enum: ["Daily", "Weekly", "Monthly", "Yearly"], required: true },
    category: { type: String, enum: ["Income", "Expense", "RCData", "Bill", "Plan"], required: true },
    data: { type: [SummaryDataEntrySchema], required: true },
    currency: { type: String },
    period: { type: DataRangeSchema, required: true },
  },
  { timestamps: true }
);

SummarySchema.pre<ISummary>("save", async function() {
  if (!this.currency && this.user) {
    const u = await User.findById(this.user).select("preferredCurrency").lean();
    if (u?.preferredCurrency) {
      this.currency = u.preferredCurrency;
    }
  }
});

const Summary: Model<ISummary> = mongoose.models.Summary || mongoose.model<ISummary>("Summary", SummarySchema);

export default Summary;
