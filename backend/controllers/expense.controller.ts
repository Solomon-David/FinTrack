import { Response } from "express";
import { UserRequest } from "../interfaces";
import Expense from "../models/Expense";

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
    }>;

    if (!entries || !Array.isArray(entries) || entries.length === 0) {
      res.status(400).json({ message: "No expense entries provided", success: false });
      return;
    }

    const expenses = entries.map((entry) => ({
      user: userId,
      amount: entry.amount,
      currency: entry.currency || "NGN",
      date: entry.date ? new Date(entry.date) : new Date(),
      item: entry.item,
      isBill: entry.isBill ?? false,
      vendor: entry.vendor ? { name: entry.vendor } : { name: "" },
    }));

    const saved = await Expense.insertMany(expenses);

    res.status(201).json({
      success: true,
      message: `${saved.length} expense record(s) added successfully`,
      data: saved,
    });
  } catch (error: any) {
    console.error("Error adding expense:", error);
    res
      .status(500)
      .json({ message: error.message || "Internal server error", success: false });
  }
};

export const getExpenses = async (req: UserRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const expenses = await Expense.find({ user: userId }).sort({ date: -1 });
    res.status(200).json({ success: true, data: expenses });
  } catch (error: any) {
    console.error("Error fetching expenses:", error);
    res
      .status(500)
      .json({ message: error.message || "Internal server error", success: false });
  }
};

export const updateExpense = async (req: UserRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;
    const { amount, currency, date, item, isBill, vendor } = req.body;

    const updated = await Expense.findOneAndUpdate(
      { _id: id, user: userId },
      {
        $set: {
          amount,
          currency,
          date,
          item,
          isBill,
          vendor: vendor ? { name: vendor } : { name: "" },
        },
      },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Expense record not found", success: false });
      return;
    }

    res
      .status(200)
      .json({ success: true, message: "Expense updated successfully", data: updated });
  } catch (error: any) {
    console.error("Error updating expense:", error);
    res
      .status(500)
      .json({ message: error.message || "Internal server error", success: false });
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

    res.status(200).json({ success: true, message: "Expense deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting expense:", error);
    res
      .status(500)
      .json({ message: error.message || "Internal server error", success: false });
  }
};
