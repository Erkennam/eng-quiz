import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001/api', 
    timeout: 10000, 
    headers: { 'Content-Type': 'application/json' }
});
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 401) {
    }
    return Promise.reject(error);
});

export default instance;
