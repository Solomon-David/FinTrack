// api/billtype.api.ts
import axiosInstance from '@/utils/axios';
import type { BillTypeEntry } from '@/types';

export async function addBillType(entries: BillTypeEntry[]) {
  return axiosInstance.post('/bill-types', { entries });
}
export async function getBillTypes() {
  return axiosInstance.get('/bill-types');
}
export async function updateBillType(id: string, payload: Partial<BillTypeEntry>) {
  return axiosInstance.patch(`/bill-types/${id}`, payload);
}
export async function deleteBillType(id: string) {
  return axiosInstance.delete(`/bill-types/${id}`);
}