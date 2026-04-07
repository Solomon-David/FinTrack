import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';


const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    },
});

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
        console.log("Request error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

 export async function testConnection() {
    let status = await axiosInstance.get('/health');
    console.log("API Connection Status:", status.status == 200 ? "Connected" : "Unable to connect");
}


export default axiosInstance;