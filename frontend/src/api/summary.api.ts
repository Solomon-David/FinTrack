import axiosInstance from '@/utils/axios';

export async function getSummaries() {
  return axiosInstance.get('/summaries');
}

// `save` defaults to false so summaries generated on-demand from the
// frontend are computed and returned for preview only — they are not
// written to the database unless explicitly requested.
export async function generateSummary(timeframe: string, date?: string, save: boolean = false) {
  return axiosInstance.post('/summaries/generate', { timeframe, date, save });
}