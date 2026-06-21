import { Response } from 'express';
import { UserRequest } from '../interfaces';
import RCData from '../models/RCData';
import { touchSummariesForDate } from '../utils/summaryInvalidation';

export const addRCData = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const entries = req.body.entries as Array<{
            date: string;
            currency: string;
            sender: { name: string; phone?: string };
            amount: { amount: number; currency?: string; size?: "GB" | "MB" };
            type: 'airtime' | 'data';
            network: "MTN" | "Airtel" | "Glo" | "9mobile";
            remark?: string;
        }>;

        if (!entries || !Array.isArray(entries) || entries.length === 0) {
            res.status(400).json({ message: "No RC-Data entries provided", success: false });
            return;
        }

        const records = entries.map(entry => ({
            user: userId,
            currency: entry.currency || "NGN",
            date: entry.date ? new Date(entry.date) : new Date(),
            sender: entry.sender,
            amount: entry.amount,
            type: entry.type,
            network: entry.network,
            remark: entry.remark,
        }));

        const saved = await RCData.insertMany(records);

        for (const record of saved) {
            await touchSummariesForDate(userId, record.date);
        }

        res.status(201).json({
            success: true,
            message: `${saved.length} RC-Data record(s) added successfully`,
            data: saved,
        });
    } catch (error: any) {
        console.error("Error adding RC-Data:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};

export const getRCData = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const records = await RCData.find({ user: userId }).sort({ date: -1 });
        res.status(200).json({ success: true, data: records });
    } catch (error: any) {
        console.error("Error fetching RC-Data:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};

export const updateRCData = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const { id } = req.params;
        const { date, currency, sender, amount, type, network, remark } = req.body;

        const existing = await RCData.findOne({ _id: id, user: userId });
        if (!existing) {
            res.status(404).json({ message: "RC-Data record not found", success: false });
            return;
        }

        const oldDate = existing.date;
        const newDate = date ? new Date(date) : existing.date;

        const updated = await RCData.findOneAndUpdate(
            { _id: id, user: userId },
            { $set: { date: newDate, currency, sender, amount, type, network, remark } },
            { new: true }
        );

        if (!updated) {
            res.status(404).json({ message: "RC-Data record not found", success: false });
            return;
        }

        await touchSummariesForDate(userId, oldDate);
        if (newDate.getTime() !== oldDate.getTime()) {
            await touchSummariesForDate(userId, newDate);
        }

        res.status(200).json({ success: true, message: "RC-Data updated successfully", data: updated });
    } catch (error: any) {
        console.error("Error updating RC-Data:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};

export const deleteRCData = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const { id } = req.params;

        const deleted = await RCData.findOneAndDelete({ _id: id, user: userId });

        if (!deleted) {
            res.status(404).json({ message: "RC-Data record not found", success: false });
            return;
        }

        await touchSummariesForDate(userId, deleted.date);

        res.status(200).json({ success: true, message: "RC-Data deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting RC-Data:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};