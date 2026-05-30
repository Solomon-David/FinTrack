import axiosInstance from '@/utils/axios';
import type { ExpenseEntry } from '@/types';

export async function addExpense(entries: ExpenseEntry[]) {
  return axiosInstance.post('/expenses', { entries });
}

export async function getExpenses() {
  return axiosInstance.get('/expenses');
}

export async function updateExpense(id: string, payload: Partial<ExpenseEntry>) {
  return axiosInstance.patch(`/expenses/${id}`, payload);
}

export async function deleteExpense(id: string) {
  return axiosInstance.delete(`/expenses/${id}`);
}