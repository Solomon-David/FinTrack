import { defineStore } from 'pinia';
import { ref } from 'vue';
import * as rcDataApi from '@/api/rcdata.api';
import type { RCDataEntry } from '@/types';

export interface RCData {
  _id: string;
  user: string;
  currency: string;
  date: string;
  sender: { name: string; phone?: string };
  amount: { amount: number; currency?: string; size?: "GB" | "MB" };
  type: 'airtime' | 'data';
  network: "MTN" | "Airtel" | "Glo" | "9mobile";
  remark?: string;
  createdAt: string;
  updatedAt: string;
}

export const useRCDataStore = defineStore('rcdata', () => {
  const records = ref<RCData[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function addRCData(entries: RCDataEntry[]) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await rcDataApi.addRCData(entries);
      records.value.unshift(...response.data.data);
      return response.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to add RC-Data';
      error.value = msg;
      throw new Error(msg);
    } finally {
      isLoading.value = false;
    }
  }

  async function getRCData() {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await rcDataApi.getRCData();
      records.value = response.data.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to fetch RC-Data';
      error.value = msg;
    } finally {
      isLoading.value = false;
    }
  }

  async function updateRCData(id: string, payload: Partial<RCDataEntry>) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await rcDataApi.updateRCData(id, payload);
      const index = records.value.findIndex(r => r._id === id);
      if (index !== -1) records.value[index] = response.data.data;
      return response.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to update RC-Data';
      error.value = msg;
      throw new Error(msg);
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteRCData(id: string) {
    isLoading.value = true;
    error.value = null;
    try {
      await rcDataApi.deleteRCData(id);
      records.value = records.value.filter(r => r._id !== id);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to delete RC-Data';
      error.value = msg;
      throw new Error(msg);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    records, isLoading, error,
    addRCData, getRCData, updateRCData, deleteRCData,
  };
});