// stores/billtype.store.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import * as billTypeApi from '@/api/billtype.api';
export const useBillTypeStore = defineStore('billType', () => {
    const billTypes = ref([]);
    const isLoading = ref(false);
    const error = ref(null);
    async function addBillType(entries) {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await billTypeApi.addBillType(entries);
            billTypes.value.unshift(...response.data.data);
            return response.data;
        }
        catch (err) {
            const msg = err.response?.data?.message || err.message || 'Failed to create bill type';
            error.value = msg;
            throw new Error(msg);
        }
        finally {
            isLoading.value = false;
        }
    }
    async function getBillTypes() {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await billTypeApi.getBillTypes();
            billTypes.value = response.data.data;
        }
        catch (err) {
            error.value = err.response?.data?.message || err.message || 'Failed to fetch bill types';
        }
        finally {
            isLoading.value = false;
        }
    }
    async function updateBillType(id, payload) {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await billTypeApi.updateBillType(id, payload);
            const index = billTypes.value.findIndex(b => b._id === id);
            if (index !== -1)
                billTypes.value[index] = response.data.data;
            return response.data;
        }
        catch (err) {
            const msg = err.response?.data?.message || err.message || 'Failed to update bill type';
            error.value = msg;
            throw new Error(msg);
        }
        finally {
            isLoading.value = false;
        }
    }
    async function deleteBillType(id) {
        isLoading.value = true;
        error.value = null;
        try {
            await billTypeApi.deleteBillType(id);
            billTypes.value = billTypes.value.filter(b => b._id !== id);
        }
        catch (err) {
            const msg = err.response?.data?.message || err.message || 'Failed to delete bill type';
            error.value = msg;
            throw new Error(msg);
        }
        finally {
            isLoading.value = false;
        }
    }
    return { billTypes, isLoading, error, addBillType, getBillTypes, updateBillType, deleteBillType };
});
