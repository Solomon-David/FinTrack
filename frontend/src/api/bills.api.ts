import axiosInstance from '@/utils/axios';
import type { BillEntry } from '@/types';

export async function addBill(entries: BillEntry[]) {
    return axiosInstance.post('/bills', { entries });
}

export async function getBills() {
    return axiosInstance.get('/bills');
}

export async function updateBill(id: string, payload: Partial<BillEntry>) {
    return axiosInstance.patch(`/bills/${id}`, payload);
}

export async function deleteBill(id: string) {
    return axiosInstance.delete(`/bills/${id}`);
}