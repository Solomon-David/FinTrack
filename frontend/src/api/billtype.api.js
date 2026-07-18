// api/billtype.api.ts
import axiosInstance from '@/utils/axios';
export async function addBillType(entries) {
    return axiosInstance.post('/bill-types', { entries });
}
export async function getBillTypes() {
    return axiosInstance.get('/bill-types');
}
export async function updateBillType(id, payload) {
    return axiosInstance.patch(`/bill-types/${id}`, payload);
}
export async function deleteBillType(id) {
    return axiosInstance.delete(`/bill-types/${id}`);
}
