import { defineStore } from 'pinia';
import { ref } from 'vue';
import * as summaryApi from '@/api/summary.api';
export const useSummaryStore = defineStore('summary', () => {
    const summaries = ref([]);
    const isLoading = ref(false);
    const isGenerating = ref(false);
    const error = ref(null);
    async function getSummaries() {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await summaryApi.getSummaries();
            summaries.value = response.data.data;
        }
        catch (err) {
            const msg = err.response?.data?.message || err.message || 'Failed to fetch summaries';
            error.value = msg;
        }
        finally {
            isLoading.value = false;
        }
    }
    // Generates a summary for preview only — it is NOT written to the
    // database, so it's intentionally not added to `summaries` (which
    // reflects what's actually persisted). The caller is responsible for
    // displaying the returned summary (e.g. in a dialog).
    async function generateSummary(timeframe, date) {
        isGenerating.value = true;
        error.value = null;
        try {
            const response = await summaryApi.generateSummary(timeframe, date);
            // The backend returns an array of results (one per requested timeframe);
            // since we always pass a single timeframe here, take the first entry.
            const results = response.data.data;
            const summary = Array.isArray(results) ? results[0] : results;
            return summary;
        }
        catch (err) {
            const msg = err.response?.data?.message || err.message || 'Failed to generate summary';
            error.value = msg;
            throw new Error(msg);
        }
        finally {
            isGenerating.value = false;
        }
    }
    // Helper getters for display
    const get = (summary, category) => summary.data.find(d => d.category === category)?.total ?? 0;
    return {
        summaries, isLoading, isGenerating, error,
        getSummaries, generateSummary, get,
    };
});
