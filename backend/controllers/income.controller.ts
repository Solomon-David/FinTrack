import { Response } from 'express';
import { UserRequest, IIncome } from '../interfaces';
import Income from '../models/Income';

export const addIncome = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const entries = req.body.entries as Array<IIncome>;

        if (!entries || !Array.isArray(entries) || entries.length === 0) {
            res.status(400).json({ message: "No income entries provided", success: false });
            return;
        }

        const incomes = entries.map(entry => ({
            user: userId,
            amount: entry.amount,
            currency: entry.currency || "NGN",
            date: entry.date ? new Date(entry.date) : new Date(),
            sender: entry.sender,
            purpose: entry.purpose,
        }));

        const saved = await Income.insertMany(incomes);

        res.status(201).json({
            success: true,
            message: `${saved.length} income record(s) added successfully`,
            data: saved,
        });
    } catch (error: any) {
        console.error("Error adding income:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};

export const getIncomes = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const incomes = await Income.find({ user: userId }).sort({ date: -1 });
        res.status(200).json({ success: true, data: incomes });
    } catch (error: any) {
        console.error("Error fetching incomes:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};

export const updateIncome = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const { id } = req.params;
        const { amount, currency, date, sender, purpose } = req.body;

        const updated = await Income.findOneAndUpdate(
            { _id: id, user: userId },
            { $set: { amount, currency, date, sender, purpose } },
            { new: true }
        );

        if (!updated) {
            res.status(404).json({ message: "Income record not found", success: false });
            return;
        }

        res.status(200).json({ success: true, message: "Income updated successfully", data: updated });
    } catch (error: any) {
        console.error("Error updating income:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};

export const deleteIncome = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const { id } = req.params;

        const deleted = await Income.findOneAndDelete({ _id: id, user: userId });

        if (!deleted) {
            res.status(404).json({ message: "Income record not found", success: false });
            return;
        }

        res.status(200).json({ success: true, message: "Income deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting income:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};