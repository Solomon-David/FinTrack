import axios, {AxiosError} from 'axios';
import type {AxiosInstance,  AxiosResponse, InternalAxiosRequestConfig} from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Track if a token refresh is already in progress
let isRefreshing = false;
// Queue of requests that failed while refresh was in progress
let failedQueue: { resolve: (token: string) => void; reject: (err: any) => void }[] = [];

function processQueue(error: any, token: string | null = null) {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error);
        else resolve(token!);
    });
    failedQueue = [];
}

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Only attempt refresh on 401, and not on the refresh endpoint itself
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes('/auth/refresh-token')
        ) {
            const refreshToken = localStorage.getItem('user')
                ? JSON.parse(localStorage.getItem('user')!).tokens?.refreshToken
                : null;

            // No refresh token — force logout
            if (!refreshToken) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
                return Promise.reject(error);
            }

            if (isRefreshing) {
                // Queue this request until the refresh completes
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                }).catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const response = await axiosInstance.post('/auth/refresh-token', { token: refreshToken });
                const newAccessToken: string = response.data.accessToken;

                // Update stored token
                localStorage.setItem('token', newAccessToken);
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    user.tokens.accessToken = newAccessToken;
                    localStorage.setItem('user', JSON.stringify(user));
                }

                // Retry all queued requests with new token
                processQueue(null, newAccessToken);

                // Retry the original request
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // For 403 (inactivity timeout) force logout
        if (error.response?.status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export async function testConnection() {
    const status = await axiosInstance.get('/health');
    console.log("API Connection Status:", status.status === 200 ? "Connected" : "Unable to connect");
}

export default axiosInstance;