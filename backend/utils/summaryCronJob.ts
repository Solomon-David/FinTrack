import cron from 'node-cron';
import User from '../models/User';
import BillType from '../models/BillType';
import Summary from '../models/Summary';
import { generateSummaryForUser } from '../controllers/summary.controller';
import { computeNextDueDate } from './computeDueDate';

const runSummaryJob = async (label: string) => {
    console.log(`[${new Date().toISOString()}] ${label} summary job running...`);
    try {
        const users = await User.find({}).select('_id').lean();
        const timeframe = label as "Daily" | "Weekly" | "Monthly" | "Yearly";
        for (const user of users) {
            const userId = user._id.toString();
            await Summary.deleteMany({
                user: user._id,
                $or: [{ source: { $exists: false } }, { source: "manual" }],
            });
            const results = await generateSummaryForUser(userId, new Date(), timeframe, true, "cron");
            console.log(`Summary created for user ${userId}:`,
                results.map(r => `${r.timeframe}: Income=${r.data.find(d => d.category === 'Income')?.total}`)
            );
        }
        console.log(`${label} summary created`);
    } catch (error) {
        console.error(`${label} summary job failed:`, error);
    }
};

const runBillStatusJob = async (label: string) => {
    console.log(`[${new Date().toISOString()}] ${label} bill status job running...`);
    try {
        const now = new Date();

        // Mark overdue — only BillTypes with unpaid/part status past their due date
        const overdueResult = await BillType.updateMany(
            { status: { $in: ["Unpaid", "Part"] }, dueDate: { $lt: now } },
            { $set: { status: "Overdue" } }
        );
        console.log(`${label}: marked ${overdueResult.modifiedCount} bill type(s) as Overdue`);

        // Roll recurring bill types forward when their due date has passed and they are paid
        const paidRecurring = await BillType.find({
            recurrence: { $ne: "One-time" },
            status: "Paid",
            dueDate: { $lt: now },
        });

        for (const bill of paidRecurring) {
            bill.amountPaid = 0;
            bill.dueDate = computeNextDueDate(bill.recurrence, bill.dueEvery, bill.dueDate ?? now);
            // pre-save hook resets status to Unpaid since amountPaid is now 0
            await bill.save();
        }
        console.log(`${label}: rolled forward ${paidRecurring.length} paid recurring bill type(s)`);

    } catch (error) {
        console.error(`${label} bill status job failed:`, error);
    }
};

export const startSummaryJob = () => {
    cron.schedule('0 0 * * *', () => { runSummaryJob('Daily'); runBillStatusJob('Daily'); });
    cron.schedule('0 0 * * 1', () => { runSummaryJob('Weekly'); runBillStatusJob('Weekly'); });
    cron.schedule('0 0 1 * *', () => { runSummaryJob('Monthly'); runBillStatusJob('Monthly'); });
    cron.schedule('0 0 1 1 *', () => { runSummaryJob('Yearly'); runBillStatusJob('Yearly'); });

    console.log('Summary & bill status cron jobs scheduled: Daily | Weekly | Monthly | Yearly');
};