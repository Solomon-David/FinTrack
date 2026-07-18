import axiosInstance from '@/utils/axios';
export async function addIncome(entries) {
    return axiosInstance.post('/income', { entries });
}
export async function getIncomes() {
    return axiosInstance.get('/income');
}
export async function updateIncome(id, payload) {
    return axiosInstance.patch(`/income/${id}`, payload);
}
export async function deleteIncome(id) {
    return axiosInstance.delete(`/income/${id}`);
}
