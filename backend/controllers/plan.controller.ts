import { Response } from 'express';
import { UserRequest } from '../interfaces';
import Plan from '../models/Plan';

type PlanStatus = "Completed" | "In Progress" | "Overdue";

// Derives a plan's status from its progress vs target and due date, unless
// the caller explicitly overrides it. Mirrors the pattern used for Bills,
// where amount/total drive an auto-derived status.
const computeStatus = (
    progress: number,
    targetAmount: number | "Unknown",
    dueDate?: Date | null
): PlanStatus => {
    if (targetAmount !== "Unknown" && progress >= targetAmount) {
        return "Completed";
    }
    if (dueDate && dueDate.getTime() < Date.now()) {
        return "Overdue";
    }
    return "In Progress";
};

export const addPlan = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const entries = req.body.entries as Array<{
            name: string;
            description?: string;
            progress?: number;
            targetAmount: number | "Unknown";
            dueDate?: string;
            status?: PlanStatus;
            currency?: string;
        }>;

        if (!entries || !Array.isArray(entries) || entries.length === 0) {
            res.status(400).json({ message: "No plan entries provided", success: false });
            return;
        }

        const saved = [];

        for (const entry of entries) {
            const progress = entry.progress ?? 0;
            const dueDate = entry.dueDate ? new Date(entry.dueDate) : undefined;

            const plan = await Plan.create({
                user: userId,
                name: entry.name,
                description: entry.description,
                progress,
                targetAmount: entry.targetAmount,
                dueDate,
                status: entry.status ?? computeStatus(progress, entry.targetAmount, dueDate),
                currency: entry.currency || "NGN",
            });

            saved.push(plan);
        }

        res.status(201).json({
            success: true,
            message: `${saved.length} plan(s) added successfully`,
            data: saved,
        });
    } catch (error: any) {
        console.error("Error adding plan:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};

export const getPlans = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const plans = await Plan.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: plans });
    } catch (error: any) {
        console.error("Error fetching plans:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};

export const updatePlan = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const { id } = req.params;
        const { name, description, progress, targetAmount, dueDate, remark, status, currency } = req.body;

        const existing = await Plan.findOne({ _id: id, user: userId });
        if (!existing) {
            res.status(404).json({ message: "Plan not found", success: false });
            return;
        }

        if (name !== undefined) existing.name = name;
        if (description !== undefined) existing.description = description;
        if (progress !== undefined) existing.progress = progress;
        if (targetAmount !== undefined) existing.targetAmount = targetAmount;
        if (currency !== undefined) existing.currency = currency;
        if (dueDate !== undefined) {
            existing.dueDate = dueDate ? new Date(dueDate) : undefined;
        }

        // Allow explicit status override (e.g. user manually marks Completed),
        // otherwise re-derive it from progress vs target and due date.
        if (status !== undefined) {
            existing.status = status;
        } else {
            existing.status = computeStatus(
                existing.progress,
                existing.targetAmount as number | "Unknown",
                existing.dueDate
            );
        }

        const updated = await existing.save();

        res.status(200).json({ success: true, message: "Plan updated successfully", data: updated });
    } catch (error: any) {
        console.error("Error updating plan:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};

export const deletePlan = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const { id } = req.params;

        const deleted = await Plan.findOneAndDelete({ _id: id, user: userId });

        if (!deleted) {
            res.status(404).json({ message: "Plan not found", success: false });
            return;
        }

        res.status(200).json({ success: true, message: "Plan deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting plan:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};