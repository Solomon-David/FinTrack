import { Response } from 'express';
import { UserRequest } from '../interfaces';
import Expense from '../models/Expense';
import Bill from '../models/Bill';
import BillType from '../models/BillType';
import { touchSummariesForDate } from '../utils/summaryInvalidation';


export const addExpense = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const entries = req.body.entries as Array<{
            date: string;
            amount: number;
            currency?: string;
            item: string;
            isBill?: boolean;
            vendor?: string;
            billTypeId?: string; // existing BillType being paid
            billPaymentRemark?: string;
        }>;

        if (!entries || !Array.isArray(entries) || entries.length === 0) {
            res.status(400).json({ message: "No expense entries provided", success: false });
            return;
        }

        const savedExpenses = [];

        for (const entry of entries) {
            let billId = undefined;
            const date = entry.date ? new Date(entry.date) : new Date();

            if (entry.isBill && entry.billTypeId) {
                // Record the payment
                const bill = await Bill.create({
                    user: userId,
                    billType: entry.billTypeId,
                    amount: entry.amount,
                    currency: entry.currency || "NGN",
                    date,
                    remark: entry.billPaymentRemark,
                });
                billId = bill._id;

                // Update the running total on the BillType
                const billType = await BillType.findOne({ _id: entry.billTypeId, user: userId });
                if (billType) {
                    billType.amountPaid += entry.amount;
                    // If fully paid and recurring, roll forward to next cycle
                    if (billType.amountPaid >= billType.total && billType.recurrence !== "One-time") {
                        billType.amountPaid = 0;
                        billType.dueDate = computeNextDueDate(billType.recurrence, billType.dueEvery, billType.dueDate ?? date);
                    }
                    await billType.save(); // pre-save hook recalculates status
                }
            }

            const expense = await Expense.create({
                user: userId,
                amount: entry.amount,
                currency: entry.currency || "NGN",
                date,
                item: entry.item,
                isBill: entry.isBill ?? false,
                bill: billId,
                vendor: entry.vendor ? { name: entry.vendor } : { name: "" },
            });

            savedExpenses.push(expense);
            await touchSummariesForDate(userId, date);
        }

        res.status(201).json({
            success: true,
            message: `${savedExpenses.length} expense record(s) added successfully`,
            data: savedExpenses,
        });
    } catch (error: any) {
        console.error("Error adding expense:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};


export const getExpenses = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const expenses = await Expense.find({ user: userId }).sort({ date: -1 });
        res.status(200).json({ success: true, data: expenses });
    } catch (error: any) {
        console.error("Error fetching expenses:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};

export const updateExpense = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const { id } = req.params;
        const { amount, currency, date, item, isBill, vendor } = req.body;

        const existing = await Expense.findOne({ _id: id, user: userId });
        if (!existing) {
            res.status(404).json({ message: "Expense record not found", success: false });
            return;
        }

        const oldDate = existing.date;
        const newDate = date ? new Date(date) : existing.date;

        const updated = await Expense.findOneAndUpdate(
            { _id: id, user: userId },
            {
                $set: {
                    amount,
                    currency,
                    date: newDate,
                    item,
                    isBill,
                    vendor: vendor ? { name: vendor } : { name: "" },
                }
            },
            { new: true }
        );

        if (!updated) {
            res.status(404).json({ message: "Expense record not found", success: false });
            return;
        }

        await touchSummariesForDate(userId, oldDate);
        if (newDate.getTime() !== oldDate.getTime()) {
            await touchSummariesForDate(userId, newDate);
        }

        res.status(200).json({ success: true, message: "Expense updated successfully", data: updated });
    } catch (error: any) {
        console.error("Error updating expense:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};

export const deleteExpense = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const { id } = req.params;

        const deleted = await Expense.findOneAndDelete({ _id: id, user: userId });

        if (!deleted) {
            res.status(404).json({ message: "Expense record not found", success: false });
            return;
        }

        await touchSummariesForDate(userId, deleted.date);

        res.status(200).json({ success: true, message: "Expense deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting expense:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};