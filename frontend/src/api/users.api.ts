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

export async function getUserDetails() {
  return axiosInstance.get('/users/user-details');
}

export async function updateProfile(payload: Partial<{
  firstName: string;
  lastName: string;
  nickname?: string;
  email: string;
}>) {
  return axiosInstance.patch('/users/update-profile', payload);
}

export async function uploadProfilePicture(file: File) {
  const formData = new FormData();
  formData.append('profilePicture', file);
  return axiosInstance.post('/users/upload-photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export async function changePassword(currentPassword: string, newPassword: string) {
  return axiosInstance.patch('/users/change-password', { currentPassword, newPassword });
}