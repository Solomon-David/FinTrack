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
    }
    isVerified: boolean;
    dob?: Date;
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
    currency?: {
        type: string,
        default: "NGN",
    }
}

export interface ExpenseEntry {
  date: string | null;
  amount: number | null;
  currency?: string;
  item: string;
  isBill?: boolean;
  vendor?: string; // plain string — controller wraps it in { name }
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
  type: 'airtime' | 'data';
  network: "MTN" | "Airtel" | "Glo" | "9mobile";
  remark?: string;
}
