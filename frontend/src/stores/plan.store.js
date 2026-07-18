import { defineStore } from "pinia";
import { ref } from "vue";
import * as planApi from "@/api/plans.api";
export const usePlanStore = defineStore("plan", () => {
    const plans = ref([]);
    const isLoading = ref(false);
    const error = ref(null);
    async function addPlan(entries) {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await planApi.addPlan(entries);
            plans.value.unshift(...response.data.data);
            return response.data;
        }
        catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to add plan";
            error.value = msg;
            throw new Error(msg);
        }
        finally {
            isLoading.value = false;
        }
    }
    async function getPlans() {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await planApi.getPlans();
            plans.value = response.data.data;
        }
        catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to fetch plans";
            error.value = msg;
        }
        finally {
            isLoading.value = false;
        }
    }
    async function updatePlan(id, payload) {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await planApi.updatePlan(id, payload);
            const index = plans.value.findIndex((p) => p._id === id);
            if (index !== -1)
                plans.value[index] = response.data.data;
            return response.data;
        }
        catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to update plan";
            error.value = msg;
            throw new Error(msg);
        }
        finally {
            isLoading.value = false;
        }
    }
    async function deletePlan(id) {
        isLoading.value = true;
        error.value = null;
        try {
            await planApi.deletePlan(id);
            plans.value = plans.value.filter((p) => p._id !== id);
        }
        catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to delete plan";
            error.value = msg;
            throw new Error(msg);
        }
        finally {
            isLoading.value = false;
        }
    }
    return {
        plans,
        isLoading,
        error,
        addPlan,
        getPlans,
        updatePlan,
        deletePlan,
    };
});
