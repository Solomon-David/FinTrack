// data types for the API requests and responses

// user -> id, email, first name, last name, nickname, photo, token,
// refresh token, dob,

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  photoData?: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  isVerified: boolean;
  dob?: Date;
  preferredCurrency?: string;
  billsSummary?: Record<string, number>;
  plansSummary?: Record<string, number>;
}

export interface IncomeEntry {
  _id: string;
  userId: string;
  date: string | null;
  amount: number | null;
  sender: string;
  purpose?: string;
  currency?: string;
}

export interface ExpenseEntry {
  date: string | null;
  amount: number | null;
  currency?: string;
  item: string;
  isBill?: boolean;
  vendor?: string;
  billStatus?: "Paid" | "Part" | "Unpaid" | "Overdue";
  billType?: "Electricity" | "Accommodation" | "Subscription" | "Insurance" | "Other";
  billRecurrence?: "One-time" | "Daily" | "Weekly" | "Monthly" | "Yearly";
  billDueDate?: string;
  billTypeId?: string;
  billPaymentRemark?: string;
}

export interface RCDataEntry {
  date: string | null;
  currency: string;
  sender: { name: string; phone?: string };
  amount: {
    amount: number | null;
    currency?: string;
    size?: "GB" | "MB";
  };
  type: "airtime" | "data";
  network: "MTN" | "Airtel" | "Glo" | "9mobile";
  remark?: string;
}

export interface BillEntry {
  date: string | null;
  amount: number | null; // amount paid
  total: number | null;  // total owed
  currency?: string;
  type: "Electricity" | "Accommodation" | "Subscription" | "Insurance" | "Other";
  name: string;
  status?: "Paid" | "Part" | "Unpaid" | "Overdue"; // optional override only
  recurrence: "One-time" | "Daily" | "Weekly" | "Monthly" | "Yearly";
  dueEvery?: number;
  remark: string;
}

export interface BillTypeEntry {
  name: string;
  type: "Electricity" | "Accommodation" | "Subscription" | "Insurance" | "Other";
  total: number | null;
  currency?: string;
  recurrence: "One-time" | "Daily" | "Weekly" | "Monthly" | "Yearly";
  dueEvery?: number;
  remark?: string;
  status?: "Paid" | "Part" | "Unpaid" | "Overdue"; // optional manual override (e.g. mark Overdue)
}

export interface PlanEntry {
  name: string;
  description?: string;
  progress: number | null;                 // amount saved / put toward the plan so far
  targetAmount: number | "Unknown" | null;  // total amount the plan is aiming for
  dueDate?: string | null;
  status?: "Completed" | "In Progress" | "Overdue"; // optional override only
  currency?: string;
}