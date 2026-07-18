import axiosInstance from '@/utils/axios';
export async function signUp(payload) {
    return axiosInstance.post('/auth/signup', payload);
}
export async function login(email, password) {
    return axiosInstance.post('/auth/login', { email, password });
}
export async function refreshToken(token) {
    return axiosInstance.post('/auth/refresh-token', { token });
}
export async function resendVerificationCode(email) {
    return axiosInstance.post('/auth/resend-code', { email });
}
export async function verifyAccount(email, code) {
    return axiosInstance.post('/auth/verify-account', { email, code });
}
export async function forgotPassword(email) {
    return axiosInstance.post('/auth/forgot-password', { email });
}
export async function resetPassword(email, code, newPassword) {
    return axiosInstance.post('/auth/reset-password', { email, code, newPassword });
}
export async function getUserPhoto(userId) {
    return axiosInstance.get(`/users/${userId}/photo`, { responseType: 'blob' });
}
export async function getUserDetails() {
    return axiosInstance.get('/users/user-details');
}
export async function updateProfile(payload) {
    return axiosInstance.patch('/users/update-profile', payload);
}
export async function uploadProfilePicture(file) {
    const formData = new FormData();
    formData.append('profilePicture', file);
    return axiosInstance.post('/users/upload-photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
}
export async function changePassword(currentPassword, newPassword) {
    return axiosInstance.patch('/users/change-password', { currentPassword, newPassword });
}
