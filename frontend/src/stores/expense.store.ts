import { defineStore } from 'pinia';
import { ref } from 'vue';
import * as expenseApi from '@/api/expense.api';
import type { ExpenseEntry } from '@/types';

export interface Expense {
  _id: string;
  user: string;
  amount: number;
  currency: string;
  date: string;
  item: string;
  isBill: boolean;
  vendor: { name: string; phone?: string } | null;
  createdAt: string;
  updatedAt: string;
}

export const useExpenseStore = defineStore('expense', () => {
  const expenses = ref<Expense[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function addExpense(entries: ExpenseEntry[]) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await expenseApi.addExpense(entries);
      expenses.value.unshift(...response.data.data);
      return response.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to add expense';
      error.value = msg;
      throw new Error(msg);
    } finally {
      isLoading.value = false;
    }
  }

  async function getExpenses() {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await expenseApi.getExpenses();
      expenses.value = response.data.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to fetch expenses';
      error.value = msg;
    } finally {
      isLoading.value = false;
    }
  }

  async function updateExpense(id: string, payload: Partial<ExpenseEntry>) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await expenseApi.updateExpense(id, payload);
      const index = expenses.value.findIndex(e => e._id === id);
      if (index !== -1) expenses.value[index] = response.data.data;
      return response.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to update expense';
      error.value = msg;
      throw new Error(msg);
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteExpense(id: string) {
    isLoading.value = true;
    error.value = null;
    try {
      await expenseApi.deleteExpense(id);
      expenses.value = expenses.value.filter(e => e._id !== id);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to delete expense';
      error.value = msg;
      throw new Error(msg);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    expenses, isLoading, error,
    addExpense, getExpenses, updateExpense, deleteExpense,
  };
});