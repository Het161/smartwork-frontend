"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, User, Eye, EyeOff, Briefcase, Building2, Sparkles, Check, AlertCircle } from 'lucide-react';
import { authAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    role: 'employee',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Password strength calculator
  const getPasswordStrength = (pwd: string): { score: number; label: string; color: string } => {
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    
    if (score <= 1) return { score, label: 'Weak', color: 'bg-red-500' };
    if (score <= 2) return { score, label: 'Fair', color: 'bg-orange-500' };
    if (score <= 3) return { score, label: 'Good', color: 'bg-yellow-500' };
    if (score <= 4) return { score, label: 'Strong', color: 'bg-emerald-500' };
    return { score, label: 'Excellent', color: 'bg-emerald-400' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.full_name.trim()) { toast.error('Name is required'); return; }
    if (!formData.email.trim()) { toast.error('Email is required'); return; }
    if (!formData.password) { toast.error('Password is required'); return; }
    if (formData.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    if (formData.password !== formData.confirmPassword) { toast.error('Passwords do not match'); return; }
    if (!formData.department.trim()) { toast.error('Department is required'); return; }

    setLoading(true);

    try {
      const payload = {
        email: formData.email.trim(),
        password: formData.password,
        full_name: formData.full_name.trim(),
        department: formData.department.trim(),
        role: formData.role,
      };

      await authAPI.register(payload);

      toast.success('Account created! Redirecting to login...', {
        duration: 3000,
        icon: '🎉',
      });

      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (error: any) {
      console.error('Registration error:', error);
      
      if (error.response?.status === 422) {
        const detail = error.response?.data?.detail;
        if (Array.isArray(detail)) {
          const msgs = detail.map((err: any) => err.msg).join(', ');
          toast.error(`Validation error: ${msgs}`);
        } else {
          toast.error('Please check all fields are filled correctly');
        }
      } else if (error.response?.status === 400) {
        const detail = error.response?.data?.detail;
        toast.error(detail === 'Email already registered' 
          ? 'This email is already registered. Please login.' 
          : detail || 'Registration failed.');
      } else if (error.message === 'Network Error') {
        toast.error('Network error. Please check your connection.');
      } else {
        toast.error(error.response?.data?.detail || error.message || 'Registration failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm";
  const selectClasses = "w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm appearance-none cursor-pointer [&>option]:bg-slate-900 [&>option]:text-white";

  return (
    <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center p-4 relative overflow-hidden">

      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/60 via-[#0a0a1a] to-blue-950/60" />
        {mounted && (
          <>
            <motion.div
              className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)' }}
              animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
            />
            <motion.div
              className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)' }}
              animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
              transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse' }}
            />
          </>
        )}
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side — Branding */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block"
        >
          <div className="py-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="inline-block mb-8"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/25 p-[2px]">
                <div className="w-full h-full bg-[#0a0a1a] rounded-[14px] flex items-center justify-center">
                  <Building2 className="w-10 h-10 text-purple-400" />
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Join SmartWork 360
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-slate-400 text-lg mb-10 leading-relaxed"
            >
              Transform your productivity with AI-powered insights
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="space-y-4"
            >
              {[
                { emoji: '🚀', text: 'Real-time productivity tracking' },
                { emoji: '🤖', text: 'AI assistant for daily tasks' },
                { emoji: '📊', text: 'Advanced analytics dashboard' },
                { emoji: '🔒', text: 'Secure audit trails' },
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
        </motion.div>

        {/* Right Side — Register Form */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white/[0.04] backdrop-blur-2xl rounded-3xl p-8 lg:p-10 relative overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/40">
            
            <motion.div
              className="absolute -top-32 -right-32 w-64 h-64 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
            />

            {/* Mobile logo */}
            <div className="lg:hidden text-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Join SmartWork 360
              </h1>
            </div>

            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-white mb-1"
              >
                Create Account
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-slate-400 mb-6 text-sm"
              >
                Sign up to get started with SmartWork 360
              </motion.p>

              <form onSubmit={handleRegister} className="space-y-4">
                
                {/* Full Name */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text" name="full_name" value={formData.full_name} onChange={handleInputChange}
                      className={inputClasses} placeholder="John Doe" required disabled={loading}
                    />
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                  <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email" name="email" value={formData.email} onChange={handleInputChange}
                      className={inputClasses} placeholder="you@example.com" required disabled={loading}
                    />
                  </div>
                </motion.div>

                {/* Department + Role */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                    <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-wider">Department</label>
                    <select name="department" value={formData.department} onChange={handleInputChange} className={selectClasses} required disabled={loading}>
                      <option value="">Select</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="HR">HR</option>
                      <option value="IT">IT</option>
                      <option value="Finance">Finance</option>
                      <option value="Operations">Operations</option>
                    </select>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.65 }}>
                    <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-wider">Role</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none z-10" />
                      <select name="role" value={formData.role} onChange={handleInputChange} className={`${selectClasses} pl-11`} required disabled={loading}>
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </motion.div>
                </div>

                {/* Password */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
                  <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleInputChange}
                      className={`${inputClasses} !pr-10`} placeholder="••••••••" required minLength={6} disabled={loading}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300" tabIndex={-1}>
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {/* Password strength meter */}
                  {formData.password && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div key={level} className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            level <= passwordStrength.score ? passwordStrength.color : 'bg-white/[0.06]'
                          }`} />
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-500">{passwordStrength.label}</p>
                    </motion.div>
                  )}
                </motion.div>

                {/* Confirm Password */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.75 }}>
                  <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-wider">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange}
                      className={`${inputClasses} !pr-10`} placeholder="••••••••" required minLength={6} disabled={loading}
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300" tabIndex={-1}>
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {/* Match indicator */}
                  {formData.confirmPassword && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 mt-1.5">
                      {formData.password === formData.confirmPassword ? (
                        <><Check className="w-3 h-3 text-emerald-400" /><span className="text-[11px] text-emerald-400">Passwords match</span></>
                      ) : (
                        <><AlertCircle className="w-3 h-3 text-red-400" /><span className="text-[11px] text-red-400">Passwords don't match</span></>
                      )}
                    </motion.div>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }} className="pt-2">
                  <motion.button
                    type="submit" disabled={loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full relative overflow-hidden py-3.5 rounded-xl font-semibold text-sm text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-500/20"
                  >
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
                          <motion.div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                          Creating Account...
                        </>
                      ) : (
                        <>Create Account <ArrowRight className="w-4 h-4" /></>
                      )}
                    </span>
                  </motion.button>
                </motion.div>

                {/* Login Link */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.95 }}
                  className="text-center text-sm text-slate-400"
                >
                  Already have an account?{' '}
                  <Link href="/login" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                    Sign In
                  </Link>
                </motion.p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
