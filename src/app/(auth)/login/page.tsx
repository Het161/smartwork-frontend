"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, Sparkles, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { AnimatedButton } from '@/components/animations/AnimatedButton';
import { authAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({ email: false, password: false });
  const [rememberMe, setRememberMe] = useState(false);

  // ✅ FIXED: Updated role mapping
  const dashboardRoutes: Record<string, string> = {
    admin: '/admin',
    manager: '/dashboard',
    employee: '/dashboard',
  };

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        router.push(dashboardRoutes[userData.role] || '/dashboard');
      } catch (error) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
      }
    }
  }, [router]);

  // Wake up backend on page load
  useEffect(() => {
    const wakeUpBackend = async () => {
      try {
        console.log('🔄 Waking up backend...');
        const response = await fetch('https://sih-backend-xiz8.onrender.com/');
        const data = await response.json();
        console.log('✅ Backend awake:', data);
      } catch (error) {
        console.error('❌ Backend wake-up failed:', error);
      }
    };

    wakeUpBackend();
  }, []);

  // Load remembered email
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('remembered_email');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  // Real-time email validation
  const validateEmail = (value: string): string | undefined => {
    if (!value) {
      return 'Email is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    
    return undefined;
  };

  // Real-time password validation
  const validatePassword = (value: string): string | undefined => {
    if (!value) {
      return 'Password is required';
    }
    
    if (value.length < 6) {
      return 'Password must be at least 6 characters';
    }
    
    return undefined;
  };

  // Handle field blur
  const handleBlur = (field: 'email' | 'password') => {
    setTouched({ ...touched, [field]: true });
    
    if (field === 'email') {
      setErrors({ ...errors, email: validateEmail(email) });
    } else {
      setErrors({ ...errors, password: validatePassword(password) });
    }
  };

  // Handle input change with validation
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (touched.email) {
      setErrors({ ...errors, email: validateEmail(value) });
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (touched.password) {
      setErrors({ ...errors, password: validatePassword(value) });
    }
  };

  // Form validation before submission
  const validateForm = (): boolean => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    setErrors({
      email: emailError,
      password: passwordError,
    });
    
    setTouched({ email: true, password: true });
    
    return !emailError && !passwordError;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    setLoading(true);

    try {
      console.log('🔐 Attempting login for:', email);
      
      const response = await authAPI.login({
        email: email,
        password: password,
      });
      
      console.log('✅ Login response:', response);
      
      const { access_token, user } = response;

      // Store token and user info
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      // Remember email if checkbox is checked
      if (rememberMe) {
        localStorage.setItem('remembered_email', email);
      } else {
        localStorage.removeItem('remembered_email');
      }

      // Show success message
      toast.success(`Welcome back, ${user.name || user.email}! 🎉`, {
        duration: 3000,
        icon: '👋',
      });
      
      // Small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // ✅ FIXED: Redirect based on correct roles
      console.log('👤 User role:', user.role);
      const redirectPath = dashboardRoutes[user.role] || '/dashboard';
      console.log('🚀 Redirecting to:', redirectPath);
      router.push(redirectPath);
      
    } catch (error: any) {
      console.error('❌ Login error:', error);
      console.error('❌ Error response:', error.response?.data);
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        toast.error('Invalid email or password. Please try again.', {
          duration: 4000,
          icon: '🔒',
        });
        setPassword('');
        setTouched({ ...touched, password: false });
      } else if (error.response?.status === 403) {
        toast.error('Account is deactivated. Contact support.', {
          duration: 4000,
          icon: '⛔',
        });
      } else if (error.response?.status === 429) {
        toast.error('Too many login attempts. Please try again later.', {
          duration: 5000,
          icon: '⏱️',
        });
      } else if (error.code === 'ECONNABORTED') {
        toast.error('Connection timeout. Backend is waking up, please wait 10 seconds and try again.', {
          duration: 6000,
          icon: '⏳',
        });
      } else if (error.message === 'Network Error' || !error.response) {
        toast.error('Cannot connect to server. Please check your connection.', {
          duration: 4000,
          icon: '📡',
        });
      } else {
        const errorMessage = error.response?.data?.detail || 'Login failed. Please try again.';
        toast.error(errorMessage, {
          duration: 4000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Check if form is valid
  const isFormValid = !errors.email && !errors.password && email && password;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated Background Blobs */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        
        {/* Left Side - Branding & Animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block"
        >
          <div className="relative">
            {/* Floating Elements */}
            <motion.div
              className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute top-20 right-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full"
              animate={{
                y: [0, 20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute bottom-0 left-1/4 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Main Content */}
            <div className="relative z-10 text-center py-20">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="inline-block mb-6"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
              >
                SmartWork 360
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-gray-600 text-xl mb-8"
              >
                Government Productivity Management System
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="space-y-4 text-left max-w-md mx-auto"
              >
                {[
                  "🚀 Track productivity in real-time",
                  "🤖 AI-powered insights & chatbot",
                  "🔒 Blockchain-secured audit trails",
                  "📊 Comprehensive analytics dashboard"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 lg:p-12 relative overflow-hidden border border-white/20">
            
            {/* Animated background gradient */}
            <motion.div
              className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />

            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-gray-900 mb-2"
              >
                Welcome Back
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 mb-8"
              >
                Sign in to access your dashboard
              </motion.p>

              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      onBlur={() => handleBlur('email')}
                      className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-colors bg-white/50 ${
                        errors.email && touched.email
                          ? 'border-red-300 focus:border-red-500'
                          : 'border-gray-200 focus:border-blue-500'
                      }`}
                      placeholder="you@example.com"
                      autoComplete="email"
                      disabled={loading}
                    />
                    {/* Validation Icon */}
                    {touched.email && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        {errors.email ? (
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {/* Error Message */}
                  <AnimatePresence>
                    {errors.email && touched.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-500 text-sm mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      onBlur={() => handleBlur('password')}
                      className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-colors bg-white/50 ${
                        errors.password && touched.password
                          ? 'border-red-300 focus:border-red-500'
                          : 'border-gray-200 focus:border-blue-500'
                      }`}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      disabled={loading}
                    />
                    {/* Show/Hide Password Button */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {/* Error Message */}
                  <AnimatePresence>
                    {errors.password && touched.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-500 text-sm mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.password}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Remember Me & Forgot Password */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-between"
                >
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="pt-4"
                >
                  <AnimatedButton
                    type="submit"
                    loading={loading}
                    disabled={!isFormValid || loading}
                    className="w-full"
                  >
                    <span>{loading ? 'Signing in...' : 'Sign In'}</span>
                    {!loading && <ArrowRight className="w-5 h-5" />}
                  </AnimatedButton>
                </motion.div>

                {/* Register Link */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center text-sm text-gray-600"
                >
                  Don't have an account?{' '}
                  <Link 
                    href="/register"
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </motion.p>

                {/* ✅ FIXED: Updated Demo Credentials */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100"
                >
                  <p className="text-xs text-gray-600 font-medium mb-2">
                    🎯 Test with any registered account
                  </p>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>Roles: Employee, Manager, or Admin</p>
                    <p>Create account → Login → Access dashboard</p>
                  </div>
                </motion.div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
