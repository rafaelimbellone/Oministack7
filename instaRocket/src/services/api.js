import axios from 'axios';

const api = axios.create({
    baseURL: 'https://192.168.1.33',
})

export default api;