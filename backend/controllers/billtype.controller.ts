import { Response } from 'express';
import { UserRequest } from '../interfaces';
import BillType from '../models/BillType';
import { computeNextDueDate } from '../utils/computeDueDate';

export const addBillType = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const entries = req.body.entries as Array<{
            name: string;
            type: "Electricity" | "Accommodation" | "Subscription" | "Insurance" | "Other";
            total: number;
            currency?: string;
            recurrence: "One-time" | "Daily" | "Weekly" | "Monthly" | "Yearly";
            dueEvery?: number;
            remark?: string;
        }>;

        if (!entries || !Array.isArray(entries) || entries.length === 0) {
            res.status(400).json({ message: "No bill type entries provided", success: false });
            return;
        }

        const now = new Date();
        const billTypes = entries.map(entry => ({
            user: userId,
            name: entry.name,
            type: entry.type,
            total: entry.total,
            currency: entry.currency || "NGN",
            recurrence: entry.recurrence,
            dueEvery: entry.dueEvery,
            dueDate: computeNextDueDate(entry.recurrence, entry.dueEvery, now),
            amountPaid: 0,
            status: "Unpaid",
            remark: entry.remark,
        }));

        const saved = await BillType.insertMany(billTypes);

        res.status(201).json({
            success: true,
            message: `${saved.length} bill type(s) created successfully`,
            data: saved,
        });
    } catch (error: any) {
        console.error("Error creating bill type:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};

export const getBillTypes = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const billTypes = await BillType.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: billTypes });
    } catch (error: any) {
        console.error("Error fetching bill types:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};

export const updateBillType = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const { id } = req.params;
        const { name, type, total, currency, recurrence, dueEvery, remark } = req.body;

        const existing = await BillType.findOne({ _id: id, user: userId });
        if (!existing) {
            res.status(404).json({ message: "Bill type not found", success: false });
            return;
        }

        if (name !== undefined) existing.name = name;
        if (type !== undefined) existing.type = type;
        if (total !== undefined) existing.total = total;
        if (currency !== undefined) existing.currency = currency;
        if (recurrence !== undefined) existing.recurrence = recurrence;
        if (dueEvery !== undefined) existing.dueEvery = dueEvery;
        if (remark !== undefined) existing.remark = remark;

        existing.dueDate = computeNextDueDate(existing.recurrence, existing.dueEvery, new Date());

        const updated = await existing.save();

        res.status(200).json({ success: true, message: "Bill type updated successfully", data: updated });
    } catch (error: any) {
        console.error("Error updating bill type:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};

export const deleteBillType = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const { id } = req.params;

        const deleted = await BillType.findOneAndDelete({ _id: id, user: userId });

        if (!deleted) {
            res.status(404).json({ message: "Bill type not found", success: false });
            return;
        }

        res.status(200).json({ success: true, message: "Bill type deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting bill type:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};