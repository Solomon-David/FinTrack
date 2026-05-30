import axiosInstance from '@/utils/axios';
import type { RCDataEntry } from '@/types';

export async function addRCData(entries: RCDataEntry[]) {
  return axiosInstance.post('/rcdata', { entries });
}

export async function getRCData() {
  return axiosInstance.get('/rcdata');
}

export async function updateRCData(id: string, payload: Partial<RCDataEntry>) {
  return axiosInstance.patch(`/rcdata/${id}`, payload);
}

export async function deleteRCData(id: string) {
  return axiosInstance.delete(`/rcdata/${id}`);
}