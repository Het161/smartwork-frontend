import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://sih-backend-xiz8.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
  withCredentials: false,
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token');
    
    if (token) {
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
        case 405:
          toast.error('Method not allowed. Check API endpoint.');
          break;
        case 422:
          toast.error('Validation error. Check input data.');
          break;
        case 500:
          toast.error('Server error. Please try again later.');
          break;
        default:
          const data: any = error.response.data;
          toast.error(data?.detail || 'An error occurred.');
      }
    } else if (error.request) {
      toast.error('Network error. Check your connection.');
    } else {
      toast.error('An error occurred.');
    }
    
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  register: (data: {
    email: string;
    password: string;
    full_name: string;
    role: string;
    department?: string;
  }) => api.post('/api/v1/auth/register', data),
  
  login: (email: string, password: string) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    
    return api.post('/api/v1/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
  
  getCurrentUser: () => api.get('/api/v1/auth/me'),
};

// Tasks API endpoints
export const tasksAPI = {
  getAll: (skip: number = 0, limit: number = 100) => 
    api.get('/api/v1/tasks', {
      params: { skip, limit }
    }),
  
  getById: (id: number) => 
    api.get(`/api/v1/tasks/${id}`),
  
  create: (data: {
    title: string;
    description?: string;
    priority: string;
    due_date?: string;
    assigned_to?: number;
  }) => {
    const payload: any = {
      title: data.title.trim(),
      priority: data.priority || 'medium',
      status: 'pending',
    };
    
    if (data.description && data.description.trim()) {
      payload.description = data.description.trim();
    }
    
    if (data.due_date) {
      payload.due_date = new Date(data.due_date).toISOString();
    }
    
    if (data.assigned_to) {
      payload.assigned_to = data.assigned_to;
    }
    
    console.log('Creating task with payload:', payload);
    
    return api.post('/api/v1/tasks', payload);
  },
  
  update: (id: number, data: any) => 
    api.put(`/api/v1/tasks/${id}`, data),
  
  delete: (id: number) => 
    api.delete(`/api/v1/tasks/${id}`),
  
  updateStatus: (id: number, status: string) => 
    api.patch(`/api/v1/tasks/${id}/status`, { status }),
};

// Analytics API endpoints
// export const analyticsAPI = {
//   getAdminDashboard: () => api.get('/api/v1/dashboard/admin'),
// };

// src/lib/api.ts - Add analytics API

export const analyticsAPI = {
  getAdminDashboard: async () => {
    const token = localStorage.getItem('access_token');
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const response = await fetch(`${baseURL}/api/v1/analytics/admin`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  }
};


// Notifications API endpoints
export const notificationsAPI = {
  getAll: () => api.get('/api/v1/notifications'),
  markAsRead: (id: number) => api.patch(`/api/v1/notifications/${id}/read`),
  delete: (id: number) => api.delete(`/api/v1/notifications/${id}`),
};

export default api;


