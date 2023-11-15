//import {API_URL } from "@env";
const API_URL = "https://ea233c96-ce30-466c-bda8-4f3b0d62c7b3.mock.pstmn.io"
import axios from 'axios';

//axios instance
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: {
        'Accept': 'application/json',
    },
});

//axios request
axiosInstance.interceptors.request.use(
    async function (config) {
        return config
    },
    function (error) {
        return Promise.reject(error);
    },
);

//axios response
axiosInstance.interceptors.response.use(
    async function (config) {
        return config
    },
    function (error) {
        return Promise.reject(error);
    },
);

export default axiosInstance;