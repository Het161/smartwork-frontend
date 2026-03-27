/**
 * Authentication API Module
 * Handles all authentication-related API calls.
 * Uses OAuth2 form-encoded data for login (matching backend).
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sih-backend-xiz8.onrender.com';

export interface LoginCredentials {
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

export interface UserData {
  id: number;
  email: string;
  full_name: string;
  role: string;
  department?: string;
  is_active: boolean;
  created_at?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: UserData;
}

/**
 * Login user — sends form-encoded data (OAuth2PasswordRequestForm).
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Backend expects OAuth2 form data, NOT JSON
  const formData = new URLSearchParams();
  formData.append('username', credentials.email);
  formData.append('password', credentials.password);

  const response = await fetch(`${API_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || data.error?.message || 'Login failed');
  }

  // Store token and user info
  if (data.access_token) {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  return data;
};

/**
 * Register new user — sends JSON.
 */
export const register = async (userData: RegisterData): Promise<any> => {
  const response = await fetch(`${API_URL}/api/v1/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || data.error?.message || 'Registration failed');
  }

  return data;
};

/**
 * Logout user
 */
export const logout = (): void => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

/**
 * Get current user from localStorage
 */
export const getCurrentUser = (): UserData | null => {
  if (typeof window === 'undefined') return null;

  const userStr = localStorage.getItem('user');
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

/**
 * Get access token
 */
export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

/**
 * Get user profile from backend
 */
export const getUserProfile = async () => {
  const token = getAccessToken();

  if (!token) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(`${API_URL}/api/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
};

export default {
  login,
  register,
  logout,
  getCurrentUser,
  getAccessToken,
  isAuthenticated,
  getUserProfile,
};
