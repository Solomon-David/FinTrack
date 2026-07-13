import axiosInstance from '@/utils/axios';
import type { PlanEntry } from '@/types';

export async function addPlan(entries: PlanEntry[]) {
    return axiosInstance.post('/plans', { entries });
}

export async function getPlans() {
    return axiosInstance.get('/plans');
}

export async function updatePlan(id: string, payload: Partial<PlanEntry>) {
    return axiosInstance.patch(`/plans/${id}`, payload);
}

export async function deletePlan(id: string) {
    return axiosInstance.delete(`/plans/${id}`);
}