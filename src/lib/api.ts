import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sih-backend-xiz8.onrender.com';

console.log('🔗 Connecting to API:', API_URL);

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 seconds
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('📤 API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.message, error.response?.data);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ========================================
// AUTH API
// ========================================

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  department?: string;
  role?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
    department?: string;
    is_active: boolean;
    created_at?: string;
  };
}

export const authAPI = {
  // ✅ FIXED: Login with form data (OAuth2PasswordRequestForm)
  login: async (data: LoginData): Promise<AuthResponse> => {
    console.log('🔐 Attempting login for:', data.email);
    
    // Create form data (required by OAuth2PasswordRequestForm)
    const formData = new URLSearchParams();
    formData.append('username', data.email); // OAuth2 uses 'username' field
    formData.append('password', data.password);
    
    const response = await axios.post(
      `${API_URL}/api/v1/auth/login`,
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 60000,
      }
    );
    
    console.log('✅ Login response:', response.data);
    
    // Store token and user info
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  // Register (uses JSON - this is correct)
  register: async (data: RegisterData) => {
    console.log('📝 Attempting registration for:', data.email);
    const response = await apiClient.post('/auth/register', data);
    console.log('✅ Registration response:', response.data);
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  // Check if authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('access_token');
  },
};

// ========================================
// TASKS API
// ========================================

export interface Task {
  id?: number;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  due_date?: string;
  assigned_to?: number;
}

export const tasksAPI = {
  getAll: async () => {
    const response = await apiClient.get('/tasks');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get(`/tasks/${id}`);
    return response.data;
  },

  create: async (data: Task) => {
    const response = await apiClient.post('/tasks', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Task>) => {
    const response = await apiClient.put(`/tasks/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
  },
};

// ========================================
// ANALYTICS API
// ========================================

export const analyticsAPI = {
  getDashboard: async () => {
    const response = await apiClient.get('/analytics/dashboard');
    return response.data;
  },

  getAdmin: async () => {
    const response = await apiClient.get('/analytics/admin');
    return response.data;
  },
};

// ========================================
// USERS API
// ========================================

export const usersAPI = {
  getAll: async () => {
    const response = await apiClient.get('/users');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  update: async (id: number, data: any) => {
    const response = await apiClient.put(`/users/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  },
};

export default apiClient;
