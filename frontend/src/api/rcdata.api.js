import axiosInstance from '@/utils/axios';
export async function addRCData(entries) {
    return axiosInstance.post('/rcdata', { entries });
}
export async function getRCData() {
    return axiosInstance.get('/rcdata');
}
export async function updateRCData(id, payload) {
    return axiosInstance.patch(`/rcdata/${id}`, payload);
}
export async function deleteRCData(id) {
    return axiosInstance.delete(`/rcdata/${id}`);
}
