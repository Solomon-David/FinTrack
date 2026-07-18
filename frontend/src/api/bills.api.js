import axiosInstance from '@/utils/axios';
export async function addBill(entries) {
    return axiosInstance.post('/bills', { entries });
}
export async function getBills() {
    return axiosInstance.get('/bills');
}
export async function updateBill(id, payload) {
    return axiosInstance.patch(`/bills/${id}`, payload);
}
export async function deleteBill(id) {
    return axiosInstance.delete(`/bills/${id}`);
}
