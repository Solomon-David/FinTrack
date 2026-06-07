import axiosInstance from '@/utils/axios';

export async function getSummaries() {
  return axiosInstance.get('/summaries');
}

export async function generateSummary(timeframe: string) {
  return axiosInstance.post('/summaries/generate', { timeframe });
}