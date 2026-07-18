import axiosInstance from '@/utils/axios';
export async function addExpense(entries) {
    return axiosInstance.post('/expenses', { entries });
}
export async function getExpenses() {
    return axiosInstance.get('/expenses');
}
export async function updateExpense(id, payload) {
    return axiosInstance.patch(`/expenses/${id}`, payload);
}
export async function deleteExpense(id) {
    return axiosInstance.delete(`/expenses/${id}`);
}
