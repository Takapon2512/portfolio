import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://172.16.1.114:80/api/v1",
    headers: {
        "Content-Type": "application/json"
    },
});

export const apiClient_multi = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: {
        "Content-Type": "multipart/form-data"
    },
});

export default apiClient;