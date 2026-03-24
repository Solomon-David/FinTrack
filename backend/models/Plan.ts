import mongoose, { Model, Schema } from "mongoose";
import User from "./User";
import { IPlan } from "./interfaces";

const PlanSchema: Schema<IPlan> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String },
    progress: { type: Number, required: true, default: 0 },
    targetAmount: { type: Schema.Types.Mixed, required: true },
    dueDate: { type: Date },
    status: {
      type: String,
      enum: ["Completed", "In Progress", "Overdue"],
      required: true,
    },
    currency: { type: String },
  },
  { timestamps: true }
);

PlanSchema.pre<IPlan>("save", async function() {
  if (!this.currency && this.user) {
    const u = await User.findById(this.user).select("preferredCurrency").lean();
    if (u?.preferredCurrency) {
      this.currency = u.preferredCurrency;
    }
  }
});

const Plan: Model<IPlan> = mongoose.models.Plan || mongoose.model<IPlan>("Plan", PlanSchema);

export default Plan;
