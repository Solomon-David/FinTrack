import axiosInstance from '@/utils/axios';
import type { User } from '../types';

export async function signUp(payload: { email: string; password: string; firstName: string; lastName: string; }) {
  return axiosInstance.post('/auth/signup', payload);
}

export async function login(email: string, password: string) {
  return axiosInstance.post('/auth/login', { email, password });
}

export async function refreshToken(token: string) {
  return axiosInstance.post('/auth/refresh-token', { token });
}

export async function resendVerificationCode(email: string) {
  return axiosInstance.post('/auth/resend-code', { email });
}

export async function verifyAccount(email: string, code: string) {
  return axiosInstance.post('/auth/verify-account', { email, code });
}

export async function forgotPassword(email: string) {
  return axiosInstance.post('/auth/forgot-password', { email });
}

export async function resetPassword(email: string, code: string, newPassword: string) {
  return axiosInstance.post('/auth/reset-password', { email, code, newPassword });
}

export async function getUserPhoto(userId: string) {
  return axiosInstance.get(`/users/${userId}/photo`, { responseType: 'blob' });
}
