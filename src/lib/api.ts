import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token');
    
    if (token) {
      // Decode token to check expiry (optional but recommended)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = payload.exp * 1000 < Date.now();
        
        if (isExpired) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          return Promise.reject(new Error('Token expired'));
        }
        
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('Token decode error:', error);
      }
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      const data: any = error.response.data;
      
      switch (status) {
        case 401:
          toast.error('Authentication required. Please login.');
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          break;
        case 403:
          toast.error('Access denied. Insufficient permissions.');
          break;
        case 404:
          toast.error('Resource not found.');
          break;
        case 500:
          toast.error('Server error. Please try again later.');
          break;
        default:
          toast.error(data?.detail || 'An error occurred.');
      }
    } else if (error.request) {
      toast.error('Network error. Check your connection.');
    }
    
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  register: (data: {
    email: string;
    password: string;
    name: string;
    role: string;
    department: string;
  }) => api.post('/api/v1/auth/register', data),
  
  login: (email: string, password: string) =>
    api.post('/api/v1/auth/login', new URLSearchParams({
      username: email,
      password: password,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }),
  
  getCurrentUser: () => api.get('/api/v1/auth/me'),
};

// Tasks API endpoints
export const tasksAPI = {
  getAll: () => api.get('/api/v1/tasks'),
  getById: (id: number) => api.get(`/api/v1/tasks/${id}`),
  create: (data: {
    title: string;
    description: string;
    priority: string;
    due_date: string;
    assigned_to?: number;
  }) => api.post('/api/v1/tasks', data),
  
  update: (id: number, data: any) => api.put(`/api/v1/tasks/${id}`, data),
  delete: (id: number) => api.delete(`/api/v1/tasks/${id}`),
  updateStatus: (id: number, status: string) => 
    api.patch(`/api/v1/tasks/${id}/status`, { status }),
};

// Dashboard API endpoints
export const dashboardAPI = {
  getStats: () => api.get('/api/v1/dashboard/stats'),
  getAdminStats: () => api.get('/api/v1/dashboard/admin'),
  getManagerStats: () => api.get('/api/v1/dashboard/manager'),
  getEmployeeStats: () => api.get('/api/v1/dashboard/employee'),
};

// Notifications API endpoints
export const notificationsAPI = {
  getAll: () => api.get('/api/v1/notifications'),
  markAsRead: (id: number) => api.patch(`/api/v1/notifications/${id}/read`),
  delete: (id: number) => api.delete(`/api/v1/notifications/${id}`),
};

// Users API endpoints
export const usersAPI = {
  getAll: () => api.get('/api/v1/users'),
  getById: (id: number) => api.get(`/api/v1/users/${id}`),
  update: (id: number, data: any) => api.put(`/api/v1/users/${id}`, data),
  delete: (id: number) => api.delete(`/api/v1/users/${id}`),
};

// Chatbot API endpoint
export const chatbotAPI = {
  sendMessage: (message: string) => 
    api.post('/api/v1/chatbot', { message }),
};

export default api;

