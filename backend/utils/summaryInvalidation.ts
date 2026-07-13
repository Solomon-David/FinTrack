// utils/summaryInvalidation.ts
import Summary from '../models/Summary';
import { generateSummaryForUser } from '../controllers/summary.controller';

/**
 * Re-generates and overwrites any saved Summary whose period contains the given date.
 * Called after any create/update/delete on Income, Expense, RCData, or Bill.
 */
export const touchSummariesForDate = async (userId: string, date: Date) => {
    const affected = await Summary.find({
        user: userId,
        'period.start': { $lte: date },
        'period.end': { $gte: date },
    });

    for (const summary of affected) {
        await generateSummaryForUser(userId, summary.period.start, summary.timeframe, true, "cron");
    }
};