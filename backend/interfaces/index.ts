import mongoose, { Document } from "mongoose";
import { Request } from "express";

 interface GenericDocument extends Document {
    createdAt: Date;
    updatedAt: Date;
}

export interface IContact extends Document {
    name: string;
    phone?: string;
}

export interface IUserModel extends GenericDocument {
    _id: string;
    firstName: string;
    lastName: string;
    nickname?: string;
    email: string;
    photoData?: string; 
    dob?: Date;
    lastSeen?: Date;
    preferredCurrency?: string;
    preferredTheme?: string;
    password: string;
    contacts?: Array<IContact>;
    verified: boolean;
    verificationCode?: string | null; //6 character code for email verification
    verificationCodeExpires: number|null,
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
    passwordResetCode?: string | null; //6 character code for password reset
    passwordResetCodeExpires: number|null,
    comparePassword(password: string): Promise<boolean>;
    changePassword(oldPassword: string, newPassword: string): Promise<void>;
}

 interface FinancialRecord extends GenericDocument {
    user: mongoose.Types.ObjectId;
    amount: number;
    currency: string;
    date: Date;
    
}


export interface IIncome extends FinancialRecord {
    sender: mongoose.Types.ObjectId;
    purpose?: string;
}

export interface IExpense extends FinancialRecord {
    item: string;
    isBill: boolean;
    bill?: mongoose.Types.ObjectId; // Reference to Bill if isBill is true
    vendor: IContact | null; 
}   

export interface IRCData extends GenericDocument {
    user: mongoose.Types.ObjectId;
    currency: string;
    date: Date;
    sender: IContact;
    amount: IAirtime | IData;
    type: 'airtime' | 'data';
    network: "MTN" | "Airtel" | "Glo" | "9mobile";
    remark?: string;
}

export interface IAirtime {
    amount: number;
    currency: string;
}

export interface IData {
    amount: number;
    size: "GB" | "MB";
}

export interface IBill extends FinancialRecord {
    type: "Electricity" | "Accommodation" | "Subscription" | "Insurance" | "Other";
    name: string;
    status: "Paid" | "Part" | "Unpaid" | "Overdue";
    recurrence: "One-time" | "Daily" | "Weekly" | "Monthly" | "Yearly";
    dueDate?: Date;
    remark: string;
}

export interface IPlan extends GenericDocument {
    user: mongoose.Types.ObjectId;
    name: string;
    description?: string;
    progress: number;
    targetAmount: number | "Unknown";
    dueDate?: Date;
    status: "Completed" | "In Progress" | "Overdue";
    currency: string;
}

export interface ISummary extends GenericDocument {
    user: mongoose.Types.ObjectId;
    timeframe: "Daily" | "Weekly" | "Monthly" | "Yearly";
    category: "Income" | "Expense" | "RCData" | "Bill" | "Plan";
    data: Array<{
        category: string;
        total: number;
    }>;
    currency: string;
    period: IDataRange;
}

export interface IDataRange {
    start: Date;
    end: Date;
}
    
//interface for email
export interface SendEmailDTO {
    to: string;
    subject: string;
    text: string;
    html?: string;
}

export interface IUser {
    firstName: string;
    lastName: string;
    nickname?: string;
    email: string;
    photoData?: string; 
    dob?: Date;
    lastSeen: Date;
    preferredCurrency: string;
    preferredTheme: string;
    contacts: Array<IContact>;
    verified: boolean;
}

export interface TokenPayload {
    userId: string;
}

export interface UserRequest extends Request {
    user?: { userId: string; lastActive?: number };
}