import axiosInstance from '@/utils/axios';
export async function addPlan(entries) {
    return axiosInstance.post('/plans', { entries });
}
export async function getPlans() {
    return axiosInstance.get('/plans');
}
export async function updatePlan(id, payload) {
    return axiosInstance.patch(`/plans/${id}`, payload);
}
export async function deletePlan(id) {
    return axiosInstance.delete(`/plans/${id}`);
}
