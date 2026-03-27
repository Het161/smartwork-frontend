"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
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
  const [mounted, setMounted] = useState(false);

  const dashboardRoutes: Record<string, string> = {
    admin: '/admin',
    manager: '/manager',
    employee: '/employee',
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        router.push(dashboardRoutes[userData.role] || '/admin');
      } catch {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
      }
    }
  }, [router]);

  // Load remembered email
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('remembered_email');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const validateEmail = (value: string): string | undefined => {
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return undefined;
  };

  const validatePassword = (value: string): string | undefined => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return undefined;
  };

  const handleBlur = (field: 'email' | 'password') => {
    setTouched({ ...touched, [field]: true });
    if (field === 'email') {
      setErrors({ ...errors, email: validateEmail(email) });
    } else {
      setErrors({ ...errors, password: validatePassword(password) });
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (touched.email) setErrors({ ...errors, email: validateEmail(value) });
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (touched.password) setErrors({ ...errors, password: validatePassword(value) });
  };

  const validateForm = (): boolean => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrors({ email: emailError, password: passwordError });
    setTouched({ email: true, password: true });
    return !emailError && !passwordError;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.login({ email, password });
      const { access_token, user } = response;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      if (rememberMe) {
        localStorage.setItem('remembered_email', email);
      } else {
        localStorage.removeItem('remembered_email');
      }

      toast.success(`Welcome back, ${user.name || user.full_name || user.email}! 🎉`, {
        duration: 3000,
        icon: '👋',
      });

      await new Promise(resolve => setTimeout(resolve, 500));
      const redirectPath = dashboardRoutes[user.role] || '/admin';
      router.push(redirectPath);
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.response?.status === 401) {
        toast.error('Invalid email or password');
        setPassword('');
      } else if (error.response?.status === 403) {
        toast.error('Account deactivated. Contact support.');
      } else if (error.code === 'ECONNABORTED') {
        toast.error('Connection timeout. Server is waking up — try again in 10s.');
      } else if (error.message === 'Network Error' || !error.response) {
        toast.error('Cannot connect to server.');
      } else {
        const msg = error.response?.data?.detail || error.message || 'Login failed';
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = !errors.email && !errors.password && email && password;

  return (
    <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center p-4 relative overflow-hidden">

      {/* Animated mesh gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-[#0a0a1a] to-purple-950/60" />
        {mounted && (
          <>
            <motion.div
              className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)' }}
              animate={{ x: [0, 80, 0], y: [0, -60, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
            />
            <motion.div
              className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }}
              animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse' }}
            />
            <motion.div
              className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 25, repeat: Infinity, repeatType: 'reverse' }}
            />
          </>
        )}
      </div>

      {/* Floating particles */}
      {mounted && [...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side — Branding */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block"
        >
          <div className="relative">
            {/* Floating geometric shapes */}
            <motion.div
              className="absolute -top-4 -left-4 w-20 h-20 border border-blue-500/20 rounded-2xl"
              animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
            />
            <motion.div
              className="absolute top-20 right-8 w-14 h-14 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full backdrop-blur-sm"
              animate={{ y: [0, 15, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
            />
            <motion.div
              className="absolute bottom-12 left-16 w-10 h-10 border border-purple-500/15 rounded-lg"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />

            <div className="relative z-10 py-16">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: 'spring', damping: 15 }}
                className="inline-block mb-8"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25 p-[2px]">
                  <div className="w-full h-full bg-[#0a0a1a] rounded-[14px] flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-blue-400" />
                  </div>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-5xl font-bold mb-4"
              >
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  SmartWork 360
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-slate-400 text-lg mb-10 leading-relaxed"
              >
                Government Productivity Management System
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="space-y-4"
              >
                {[
                  { emoji: '🚀', text: 'Real-time productivity tracking' },
                  { emoji: '🤖', text: 'AI-powered insights & chatbot' },
                  { emoji: '🔒', text: 'Blockchain-secured audit trails' },
                  { emoji: '📊', text: 'Comprehensive analytics dashboard' },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-lg">{feature.emoji}</span>
                    <span className="text-slate-300 text-sm">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Side — Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white/[0.04] backdrop-blur-2xl rounded-3xl p-8 lg:p-10 relative overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/40">
            
            {/* Animated accent glow */}
            <motion.div
              className="absolute -top-32 -right-32 w-64 h-64 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
            />

            {/* Mobile logo */}
            <div className="lg:hidden text-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/25">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SmartWork 360
              </h1>
            </div>

            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-white mb-1"
              >
                Welcome back
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-slate-400 mb-8 text-sm"
              >
                Sign in to access your dashboard
              </motion.p>

              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      onBlur={() => handleBlur('email')}
                      className={`w-full pl-11 pr-10 py-3 bg-white/[0.04] border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-all text-sm ${
                        errors.email && touched.email
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
                          : 'border-white/[0.08] focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20'
                      }`}
                      placeholder="you@example.com"
                      autoComplete="email"
                      disabled={loading}
                    />
                    {touched.email && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {errors.email ? (
                          <AlertCircle className="w-4 h-4 text-red-400" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                        )}
                      </div>
                    )}
                  </div>
                  <AnimatePresence>
                    {errors.email && touched.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Password */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      onBlur={() => handleBlur('password')}
                      className={`w-full pl-11 pr-10 py-3 bg-white/[0.04] border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-all text-sm ${
                        errors.password && touched.password
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
                          : 'border-white/[0.08] focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20'
                      }`}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <AnimatePresence>
                    {errors.password && touched.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.password}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Remember Me & Forgot */}
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
                      className="w-3.5 h-3.5 rounded border-slate-600 bg-transparent text-blue-500 focus:ring-blue-500/20"
                    />
                    <span className="text-xs text-slate-400">Remember me</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="pt-2"
                >
                  <motion.button
                    type="submit"
                    disabled={!isFormValid || loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full relative overflow-hidden py-3.5 rounded-xl font-semibold text-sm text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/20"
                  >
                    {/* Shimmer effect */}
                    {!loading && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <motion.div
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          />
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.div>

                {/* Register Link */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center text-sm text-slate-400"
                >
                  Don't have an account?{' '}
                  <Link
                    href="/register"
                    className="text-blue-400 font-semibold hover:text-blue-300 transition-colors"
                  >
                    Create Account
                  </Link>
                </motion.p>

                {/* Info box */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="mt-4 p-3 bg-white/[0.03] rounded-xl border border-white/[0.06]"
                >
                  <p className="text-[11px] text-slate-500 text-center">
                    🎯 Create an account with Employee, Manager, or Admin role — then login to access your dashboard.
                  </p>
                </motion.div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
