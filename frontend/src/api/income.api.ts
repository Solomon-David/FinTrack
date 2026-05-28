import axiosInstance from '@/utils/axios';
import type {IncomeEntry as IncomeEntryPayload } from "@/types";
 

export async function addIncome(entries: IncomeEntryPayload[]) {
  return axiosInstance.post('/income', { entries });
}

export async function getIncomes() {
  return axiosInstance.get('/income');
}

export async function updateIncome(id: string, payload: Partial<IncomeEntryPayload>) {
  return axiosInstance.patch(`/income/${id}`, payload);
}

export async function deleteIncome(id: string) {
  return axiosInstance.delete(`/income/${id}`);
}