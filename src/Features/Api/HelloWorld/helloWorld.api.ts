import api from "../api";


export const fetchHelloWorld = async () => {
    const response = await api.get('/now');
    return response.data;
} 