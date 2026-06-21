import { Response } from 'express';
import { UserRequest } from '../interfaces';
import Bill from '../models/Bill';
import { computeNextDueDate } from '../utils/computeDueDate';
import { touchSummariesForDate } from '../utils/summaryInvalidation';

export const addBill = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const entries = req.body.entries as Array<{
            date: string;
            amount: number;
            total: number;
            currency?: string;
            type: "Electricity" | "Accommodation" | "Subscription" | "Insurance" | "Other";
            name: string;
            recurrence: "One-time" | "Daily" | "Weekly" | "Monthly" | "Yearly";
            dueEvery?: number;
            remark: string;
        }>;

        if (!entries || !Array.isArray(entries) || entries.length === 0) {
            res.status(400).json({ message: "No bill entries provided", success: false });
            return;
        }

        const saved = [];

        for (const entry of entries) {
            const date = entry.date ? new Date(entry.date) : new Date();

            const bill = await Bill.create({
                user: userId,
                amount: entry.amount,
                total: entry.total,
                currency: entry.currency || "NGN",
                date,
                type: entry.type,
                name: entry.name,
                // status omitted — pre-save hook derives it from amount vs total
                status: "Unpaid",
                recurrence: entry.recurrence,
                dueEvery: entry.dueEvery,
                dueDate: computeNextDueDate(entry.recurrence, entry.dueEvery, date),
                remark: entry.remark,
            });

            saved.push(bill);
            await touchSummariesForDate(userId, date);
        }

        res.status(201).json({
            success: true,
            message: `${saved.length} bill record(s) added successfully`,
            data: saved,
        });
    } catch (error: any) {
        console.error("Error adding bill:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};

export const getBills = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const bills = await Bill.find({ user: userId }).sort({ date: -1 });
        res.status(200).json({ success: true, data: bills });
    } catch (error: any) {
        console.error("Error fetching bills:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};

export const updateBill = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const { id } = req.params;
        const { date, amount, total, currency, type, name, recurrence, dueEvery, remark, status } = req.body;

        const existing = await Bill.findOne({ _id: id, user: userId });
        if (!existing) {
            res.status(404).json({ message: "Bill record not found", success: false });
            return;
        }

        const oldDate = existing.date;
        const newDate = date ? new Date(date) : existing.date;

        existing.date = newDate;
        if (amount !== undefined) existing.amount = amount;
        if (total !== undefined) existing.total = total;
        if (currency !== undefined) existing.currency = currency;
        if (type !== undefined) existing.type = type;
        if (name !== undefined) existing.name = name;
        if (recurrence !== undefined) existing.recurrence = recurrence;
        if (dueEvery !== undefined) existing.dueEvery = dueEvery;
        if (remark !== undefined) existing.remark = remark;

        // Allow explicit status override (e.g. user manually marks Overdue or force-Paid),
        // otherwise the pre-save hook re-derives it from amount vs total.
        if (status !== undefined) {
            existing.status = status;
        } else if (existing.status !== "Overdue") {
            // Reset so the pre-save hook recalculates Paid/Part/Unpaid
            existing.status = "Unpaid";
        }

        existing.dueDate = computeNextDueDate(existing.recurrence, existing.dueEvery, newDate);

        const updated = await existing.save();

        await touchSummariesForDate(userId, oldDate);
        if (newDate.getTime() !== oldDate.getTime()) {
            await touchSummariesForDate(userId, newDate);
        }

        res.status(200).json({ success: true, message: "Bill updated successfully", data: updated });
    } catch (error: any) {
        console.error("Error updating bill:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};

export const deleteBill = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const { id } = req.params;

        const deleted = await Bill.findOneAndDelete({ _id: id, user: userId });

        if (!deleted) {
            res.status(404).json({ message: "Bill record not found", success: false });
            return;
        }

        await touchSummariesForDate(userId, deleted.date);

        res.status(200).json({ success: true, message: "Bill deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting bill:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};