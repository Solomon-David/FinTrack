import { defineStore } from "pinia";
import { ref } from "vue";
import * as planApi from "@/api/plans.api";
import type { PlanEntry } from "@/types";

export interface Plan {
  _id: string;
  user: string;
  name: string;
  description?: string;
  progress: number;
  targetAmount: number | "Unknown";
  dueDate?: string;
  status: "Completed" | "In Progress" | "Overdue";
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export const usePlanStore = defineStore("plan", () => {
  const plans = ref<Plan[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function addPlan(entries: PlanEntry[]) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await planApi.addPlan(entries);
      plans.value.unshift(...response.data.data);
      return response.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to add plan";
      error.value = msg;
      throw new Error(msg);
    } finally {
      isLoading.value = false;
    }
  }

  async function getPlans() {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await planApi.getPlans();
      plans.value = response.data.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to fetch plans";
      error.value = msg;
    } finally {
      isLoading.value = false;
    }
  }

  async function updatePlan(id: string, payload: Partial<PlanEntry>) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await planApi.updatePlan(id, payload);
      const index = plans.value.findIndex((p) => p._id === id);
      if (index !== -1) plans.value[index] = response.data.data;
      return response.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to update plan";
      error.value = msg;
      throw new Error(msg);
    } finally {
      isLoading.value = false;
    }
  }

  async function deletePlan(id: string) {
    isLoading.value = true;
    error.value = null;
    try {
      await planApi.deletePlan(id);
      plans.value = plans.value.filter((p) => p._id !== id);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to delete plan";
      error.value = msg;
      throw new Error(msg);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    plans,
    isLoading,
    error,
    addPlan,
    getPlans,
    updatePlan,
    deletePlan,
  };
});