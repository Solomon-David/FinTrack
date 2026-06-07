import cron from 'node-cron';
import User from '../models/User';
import { generateSummaryForUser } from '../controllers/summary.controller';

const runJob = async (label: string) => {
    console.log(`[${new Date().toISOString()}] ${label} summary job running...`);
    try {
        const users = await User.find({}).select('_id').lean();
        console.log(`Found ${users.length} user(s) to process`);

        for (const user of users) {
            const userId = user._id.toString();
            const results = await generateSummaryForUser(userId);

            // ---- UNCOMMENT TO WRITE TO DATABASE ----
            // Results are already saved inside generateSummaryForUser
            // when the Summary.findOneAndUpdate block is uncommented

            console.log(`Summary created for user ${userId}:`,
                results.map(r => `${r.timeframe}: Income=${r.data.find(d => d.category === 'Income')?.total}`)
            );
        }

        console.log(`${label} summary created`);
    } catch (error) {
        console.error(`${label} summary job failed:`, error);
    }
};

export const startSummaryJob = () => {
    // Daily — midnight every day
    // Testing: '* * * * *'
    cron.schedule('0 0 * * *', () => runJob('Daily'));

    // Weekly — midnight every Monday (first day of the week)
    // Testing: '* * * * *'
    cron.schedule('0 0 * * 1', () => runJob('Weekly'));

    // Monthly — midnight on the 1st of every month
    // Testing: '* * * * *'
    cron.schedule('0 0 1 * *', () => runJob('Monthly'));

    // Yearly — midnight on Jan 1st
    // Testing: '* * * * *'
    cron.schedule('0 0 1 1 *', () => runJob('Yearly'));

    console.log('Summary cron jobs scheduled: Daily | Weekly | Monthly | Yearly');
};