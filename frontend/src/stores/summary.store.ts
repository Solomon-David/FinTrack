import { defineStore } from 'pinia';
import { ref } from 'vue';
import * as summaryApi from '@/api/summary.api';

export interface SummaryDataEntry {
  category: string;
  total: number;
}

export interface Summary {
  _id: string;
  user: string;
  timeframe: "Daily" | "Monthly" | "Yearly";
  category: string;
  data: SummaryDataEntry[];
  currency: string;
  period: { start: string; end: string };
  createdAt: string;
  updatedAt: string;
}

export const useSummaryStore = defineStore('summary', () => {
  const summaries = ref<Summary[]>([]);
  const isLoading = ref(false);
  const isGenerating = ref(false);
  const error = ref<string | null>(null);

  async function getSummaries() {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await summaryApi.getSummaries();
      summaries.value = response.data.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to fetch summaries';
      error.value = msg;
    } finally {
      isLoading.value = false;
    }
  }

  // Generates a summary for preview only — it is NOT written to the
  // database, so it's intentionally not added to `summaries` (which
  // reflects what's actually persisted). The caller is responsible for
  // displaying the returned summary (e.g. in a dialog).
  async function generateSummary(
    timeframe: "Daily" | "Weekly" | "Monthly" | "Yearly",
    date?: string
  ) {
    isGenerating.value = true;
    error.value = null;
    try {
      const response = await summaryApi.generateSummary(timeframe, date);
      // The backend returns an array of results (one per requested timeframe);
      // since we always pass a single timeframe here, take the first entry.
      const results = response.data.data as Summary[];
      const summary = Array.isArray(results) ? results[0] : (results as unknown as Summary);
      return summary;
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to generate summary';
      error.value = msg;
      throw new Error(msg);
    } finally {
      isGenerating.value = false;
    }
  }

  // Helper getters for display
  const get = (summary: Summary, category: string) =>
    summary.data.find(d => d.category === category)?.total ?? 0;

  return {
    summaries, isLoading, isGenerating, error,
    getSummaries, generateSummary, get,
  };
});