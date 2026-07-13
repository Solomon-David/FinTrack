import axiosInstance from '@/utils/axios';

export async function getSummaries() {
  return axiosInstance.get('/summaries');
}

export async function generateSummary(timeframe: string, startDate?: Date, endDate?: Date) {
  const body: any = { timeframe };
  if (startDate) body.startDate = startDate.toISOString();
  if (endDate) body.endDate = endDate.toISOString();
  return axiosInstance.post('/summaries/generate', body);
}