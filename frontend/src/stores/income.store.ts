import { defineStore } from 'pinia';
import { ref } from 'vue';
import * as incomeApi from '@/api/income.api';
import type { IncomeEntry as IncomeEntryPayload } from '@/types/';

export interface Income {
  _id: string;
  user: string;
  amount: number;
  currency: string;
  date: string;
  sender: string;
  purpose?: string;
  createdAt: string;
  updatedAt: string;
}

export const useIncomeStore = defineStore('income', () => {
  const incomes = ref<Income[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function addIncome(entries: IncomeEntryPayload[]) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await incomeApi.addIncome(entries);
      // Prepend new records to the top
      incomes.value.unshift(...response.data.data);
      return response.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to add income';
      error.value = msg;
      throw new Error(msg);
    } finally {
      isLoading.value = false;
    }
  }

  async function getIncomes() {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await incomeApi.getIncomes();
      incomes.value = response.data.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to fetch incomes';
      error.value = msg;
    } finally {
      isLoading.value = false;
    }
  }

  async function updateIncome(id: string, payload: Partial<IncomeEntryPayload>) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await incomeApi.updateIncome(id, payload);
      const index = incomes.value.findIndex(i => i._id === id);
      if (index !== -1) incomes.value[index] = response.data.data;
      return response.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to update income';
      error.value = msg;
      throw new Error(msg);
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteIncome(id: string) {
    isLoading.value = true;
    error.value = null;
    try {
      await incomeApi.deleteIncome(id);
      incomes.value = incomes.value.filter(i => i._id !== id);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to delete income';
      error.value = msg;
      throw new Error(msg);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    incomes, isLoading, error,
    addIncome, getIncomes, updateIncome, deleteIncome,
  };
});