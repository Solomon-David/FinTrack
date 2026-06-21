import { defineStore } from "pinia";
import { ref } from "vue";
import * as billApi from "@/api/bills.api";
import type { BillEntry } from "@/types";

export interface Bill {
  _id: string;
  user: string;
  amount: number;
  total: number;
  currency: string;
  date: string;
  type: "Electricity" | "Accommodation" | "Subscription" | "Insurance" | "Other";
  name: string;
  status: "Paid" | "Part" | "Unpaid" | "Overdue";
  recurrence: "One-time" | "Daily" | "Weekly" | "Monthly" | "Yearly";
  dueEvery?: number;
  dueDate?: string;
  remark: string;
  createdAt: string;
  updatedAt: string;
}

export const useBillStore = defineStore("bill", () => {
    const bills = ref<Bill[]>([]);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    async function addBill(entries: BillEntry[]) {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await billApi.addBill(entries);
            bills.value.unshift(...response.data.data);
            return response.data;
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || "Failed to add bill";
            error.value = msg;
            throw new Error(msg);
        } finally {
            isLoading.value = false;
        }
    }

    async function getBills() {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await billApi.getBills();
            bills.value = response.data.data;
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || "Failed to fetch bills";
            error.value = msg;
        } finally {
            isLoading.value = false;
        }
    }

    async function updateBill(id: string, payload: Partial<BillEntry>) {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await billApi.updateBill(id, payload);
            const index = bills.value.findIndex((b) => b._id === id);
            if (index !== -1) bills.value[index] = response.data.data;
            return response.data;
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || "Failed to update bill";
            error.value = msg;
            throw new Error(msg);
        } finally {
            isLoading.value = false;
        }
    }

    async function deleteBill(id: string) {
        isLoading.value = true;
        error.value = null;
        try {
            await billApi.deleteBill(id);
            bills.value = bills.value.filter((b) => b._id !== id);
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || "Failed to delete bill";
            error.value = msg;
            throw new Error(msg);
        } finally {
            isLoading.value = false;
        }
    }

    return {
        bills,
        isLoading,
        error,
        addBill,
        getBills,
        updateBill,
        deleteBill,
    };
});

// TODO:
// 