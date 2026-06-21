import cron from 'node-cron';
import User from '../models/User';
import Bill from '../models/Bill';
import { generateSummaryForUser } from '../controllers/summary.controller';
import { computeNextDueDate } from './computeDueDate';

const runSummaryJob = async (label: string) => {
    console.log(`[${new Date().toISOString()}] ${label} summary job running...`);
    try {
        const users = await User.find({}).select('_id').lean();
        for (const user of users) {
            const userId = user._id.toString();
            const results = await generateSummaryForUser(userId);
            console.log(`Summary created for user ${userId}:`,
                results.map(r => `${r.timeframe}: Income=${r.data.find(d => d.category === 'Income')?.total}`)
            );
        }
        console.log(`${label} summary created`);
    } catch (error) {
        console.error(`${label} summary job failed:`, error);
    }
};

// Marks Unpaid bills as Overdue once their dueDate has passed,
// and rolls recurring bills forward to their next due date.
const runBillStatusJob = async (label: string) => {
    console.log(`[${new Date().toISOString()}] ${label} bill status job running...`);
    try {
        const now = new Date();

        // Mark overdue
        const overdueResult = await Bill.updateMany(
            { status: { $in: ["Unpaid", "Part"] }, dueDate: { $lt: now } },
            { $set: { status: "Overdue" } }
        );
        console.log(`${label}: marked ${overdueResult.modifiedCount} bill(s) as Overdue`);

        // Roll recurring bills forward once their due date has passed
        const recurringDue = await Bill.find({
            recurrence: { $ne: "One-time" },
            dueDate: { $lt: now },
        });

        for (const bill of recurringDue) {
            const nextDue = computeNextDueDate(bill.recurrence, bill.dueEvery, bill.dueDate ?? now);
            bill.dueDate = nextDue;
            bill.status = "Unpaid"; // reset for the new cycle
            await bill.save();
        }
        console.log(`${label}: rolled forward ${recurringDue.length} recurring bill(s)`);

    } catch (error) {
        console.error(`${label} bill status job failed:`, error);
    }
};

export const startSummaryJob = () => {
    // Daily — midnight every day
    cron.schedule('0 0 * * *', () => {
        runSummaryJob('Daily');
        runBillStatusJob('Daily');
    });

    // Weekly — midnight every Monday
    cron.schedule('0 0 * * 1', () => {
        runSummaryJob('Weekly');
        runBillStatusJob('Weekly');
    });

    // Monthly — midnight on the 1st of every month
    cron.schedule('0 0 1 * *', () => {
        runSummaryJob('Monthly');
        runBillStatusJob('Monthly');
    });

    // Yearly — midnight on Jan 1st
    cron.schedule('0 0 1 1 *', () => {
        runSummaryJob('Yearly');
        runBillStatusJob('Yearly');
    });

    console.log('Summary & bill status cron jobs scheduled: Daily | Weekly | Monthly | Yearly');
};