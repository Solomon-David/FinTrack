import { computeNextDueDate } from './computeDueDate';

function startOfDay(d: Date) {
  const n = new Date(d);
  n.setHours(0, 0, 0, 0);
  return n;
}

export function computeRecurrencePeriod(
  recurrence: 'One-time' | 'Daily' | 'Weekly' | 'Monthly' | 'Yearly',
  dueEvery: number | undefined,
  reference: Date = new Date()
): { start?: Date; end?: Date } {
  if (recurrence === 'One-time') return {};

  // Use computeNextDueDate to find the next due, then derive previous due
  const next = computeNextDueDate(recurrence, dueEvery, reference);
  if (!next) {
    // Fallbacks based on recurrence
    const now = new Date(reference);
    if (recurrence === 'Daily') {
      const s = startOfDay(now);
      const e = new Date(s); e.setDate(e.getDate() + 1);
      return { start: s, end: e };
    }
    if (recurrence === 'Weekly') {
      const s = startOfDay(now);
      const e = new Date(s); e.setDate(e.getDate() + 7);
      return { start: s, end: e };
    }
    if (recurrence === 'Monthly') {
      const s = new Date(now.getFullYear(), now.getMonth(), 1);
      const e = new Date(s); e.setMonth(e.getMonth() + 1);
      return { start: s, end: e };
    }
    if (recurrence === 'Yearly') {
      const s = new Date(now.getFullYear(), 0, 1);
      const e = new Date(s); e.setFullYear(e.getFullYear() + 1);
      return { start: s, end: e };
    }
  }

  const end = startOfDay(next);
  let start: Date;

  if (recurrence === 'Daily') {
    start = new Date(end); start.setDate(start.getDate() - 1);
  } else if (recurrence === 'Weekly') {
    start = new Date(end); start.setDate(start.getDate() - 7);
  } else if (recurrence === 'Monthly') {
    start = new Date(end); start.setMonth(start.getMonth() - 1);
  } else if (recurrence === 'Yearly') {
    start = new Date(end); start.setFullYear(start.getFullYear() - 1);
  } else {
    start = new Date(0);
  }

  return { start: startOfDay(start), end };
}

export default computeRecurrencePeriod;
