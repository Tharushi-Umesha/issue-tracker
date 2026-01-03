import axios, { type AxiosInstance } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

interface IssueFilters {
    page?: number;
    limit?: number;
    status?: string;
    priority?: string;
    search?: string;
}

interface IssueData {
    title: string;
    description: string;
    status?: string;
    priority?: string;
    severity?: string;
}

export const authAPI = {
    register: (userData: RegisterData) => api.post('/auth/register', userData),
    login: (credentials: LoginCredentials) => api.post('/auth/login', credentials),
    getMe: () => api.get('/auth/me')
};

export const issuesAPI = {
    getAll: (params: IssueFilters) => api.get('/issues', { params }),
    getById: (id: number) => api.get(`/issues/${id}`),
    create: (issueData: IssueData) => api.post('/issues', issueData),
    update: (id: number, issueData: IssueData) => api.put(`/issues/${id}`, issueData),
    delete: (id: number) => api.delete(`/issues/${id}`),
    getStats: () => api.get('/issues/stats')
};

export default api;
