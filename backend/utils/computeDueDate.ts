// utils/computeDueDate.ts
export function computeNextDueDate(
    recurrence: "One-time" | "Daily" | "Weekly" | "Monthly" | "Yearly",
    dueEvery: number | undefined,
    fromDate: Date = new Date()
): Date | undefined {
    if (recurrence === "One-time") return undefined;

    const result = new Date(fromDate);

    if (recurrence === "Daily") {
        result.setDate(result.getDate() + 1);
        return result;
    }

    if (recurrence === "Weekly" && dueEvery !== undefined) {
        const currentDay = result.getDay();
        let diff = dueEvery - currentDay;
        if (diff <= 0) diff += 7;
        result.setDate(result.getDate() + diff);
        return result;
    }

    if (recurrence === "Monthly" && dueEvery !== undefined) {
        result.setDate(dueEvery);
        if (result <= fromDate) result.setMonth(result.getMonth() + 1);
        return result;
    }

    if (recurrence === "Yearly" && dueEvery !== undefined) {
        result.setMonth(dueEvery - 1, 1);
        if (result <= fromDate) result.setFullYear(result.getFullYear() + 1);
        return result;
    }

    return undefined;
}