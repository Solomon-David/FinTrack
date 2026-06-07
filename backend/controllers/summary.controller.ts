import { Response } from 'express';
import { UserRequest } from '../interfaces';
import Summary from '../models/Summary';
import Income from '../models/Income';
import Expense from '../models/Expense';
import RCData from '../models/RCData';
import Bill from '../models/Bill';
import Plan from '../models/Plan';
import User from '../models/User';

// Helper to get date range
const getDateRange = (timeframe: "Daily" | "Monthly" | "Weekly" | "Yearly", date: Date) => {
    const start = new Date(date);
    const end = new Date(date);

    if (timeframe === "Daily") {
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
    } else if (timeframe === "Weekly") {
        const day = start.getDay();
        start.setDate(start.getDate() - day);
        start.setHours(0, 0, 0, 0);
        end.setDate(end.getDate() - day + 6);
        end.setHours(23, 59, 59, 999);
    } else if (timeframe === "Monthly") {
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        end.setMonth(end.getMonth() + 1, 0);
        end.setHours(23, 59, 59, 999);
    } else if (timeframe === "Yearly") {
        start.setMonth(0, 1);
        start.setHours(0, 0, 0, 0);
        end.setMonth(11, 31);
        end.setHours(23, 59, 59, 999);
    }

    return { start, end };
};

// Core summary generator — used by both cron and manual trigger
export const generateSummaryForUser = async (
    userId: string,
    date: Date = new Date(),
    timeframe?: "Daily" | "Weekly" | "Monthly" | "Yearly"
) => {
    const timeframes = timeframe
        ? [timeframe]
        : ["Daily", "Monthly", "Weekly", "Yearly"] as Array<"Daily" | "Monthly" | "Weekly" | "Yearly">;

    const results = [];

    for (const tf of timeframes) {
        const { start, end } = getDateRange(tf, date);
        const dateFilter = { user: userId, date: { $gte: start, $lte: end } };

        const [incomes, expenses, rcdata, bills, plans] = await Promise.all([
            Income.find(dateFilter),
            Expense.find(dateFilter),
            RCData.find(dateFilter),
            Bill.find({ user: userId }),
            Plan.find({ user: userId }),
        ]);

        const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
        const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);

        const totalAirtime = rcdata
            .filter(r => r.type === "airtime")
            .reduce((s, r) => s + r.amount.amount, 0);

        const totalDataMB = rcdata
            .filter(r => r.type === "data")
            .reduce((s, r) => s + (r.amount.size === "GB" ? r.amount.amount * 1024 : r.amount.amount), 0);

        const billsPaid = bills.filter(b => b.status === "Paid").length;
        const billsTotal = bills.length;
        const billsOverdue = bills.filter(b => b.status === "Overdue").length;
        const billsAmountDue = bills
            .filter(b => b.status !== "Paid")
            .reduce((s, b) => s + b.amount, 0);

        const plansTotal = plans.length;
        const plansCompleted = plans.filter(p => p.status === "Completed").length;

        const summaryData = {
            user: userId,
            timeframe: tf,
            category: "Income" as const,
            period: { start, end },
            data: [
                { category: "Income", total: totalIncome },
                { category: "Expenses", total: totalExpense },
                { category: "Difference", total: totalIncome - totalExpense },
                { category: "Airtime", total: totalAirtime },
                { category: "DataMB", total: totalDataMB },
                { category: "BillsPaid", total: billsPaid },
                { category: "BillsTotal", total: billsTotal },
                { category: "BillsOverdue", total: billsOverdue },
                { category: "BillsAmountDue", total: billsAmountDue },
                { category: "PlansTotal", total: plansTotal },
                { category: "PlansCompleted", total: plansCompleted },
            ],
        };

        const saved = await Summary.findOneAndUpdate(
            { user: userId, timeframe: tf, 'period.start': start },
            { $set: summaryData },
            { upsert: true, new: true }
        );

        results.push(saved);
    }

    return results;
};

export const getSummaries = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const summaries = await Summary.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: summaries });
    } catch (error: any) {
        console.error("Error fetching summaries:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};

// Manual trigger endpoint for testing
export const generateSummaryNow = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const results = await generateSummaryForUser(userId);
        res.status(200).json({
            success: true,
            message: "Summary generated successfully",
            data: results,
        });
    } catch (error: any) {
        console.error("Error generating summary:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};