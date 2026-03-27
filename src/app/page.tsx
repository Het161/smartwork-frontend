"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, Zap, Shield, BarChart3, Users, Cpu, Rocket, Globe, Lock, Brain } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    { icon: Zap, title: 'Real-time Tracking', desc: 'Monitor productivity metrics live', gradient: 'from-amber-500 to-orange-500', shadow: 'shadow-amber-500/25' },
    { icon: Shield, title: 'Blockchain Secure', desc: 'Tamper-proof audit trails', gradient: 'from-blue-500 to-cyan-500', shadow: 'shadow-blue-500/25' },
    { icon: Brain, title: 'AI-Powered', desc: 'Smart insights & recommendations', gradient: 'from-purple-500 to-pink-500', shadow: 'shadow-purple-500/25' },
  ];

  const stats = [
    { label: 'Departments', value: '50+', icon: Globe },
    { label: 'Active Users', value: '10K+', icon: Users },
    { label: 'Tasks Completed', value: '1M+', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a1a] relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-[#0a0a1a] to-purple-950/30" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        
        {mounted && (
          <>
            <motion.div
              className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 60%)' }}
              animate={{ x: [0, 100, 0], y: [0, -80, 0] }}
              transition={{ duration: 25, repeat: Infinity, repeatType: 'reverse' }}
            />
            <motion.div
              className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)' }}
              animate={{ x: [0, -100, 0], y: [0, 80, 0] }}
              transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
            />
          </>
        )}
      </div>

      {/* Floating particles */}
      {mounted && [...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <div className="text-center max-w-5xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs text-slate-300 font-medium">Smart India Hackathon 2024</span>
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', damping: 15 }}
            className="inline-block mb-8"
          >
            <div className="w-24 h-24 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl rotate-6 opacity-50 blur-xl" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl p-[2px]">
                <div className="w-full h-full bg-[#0a0a1a] rounded-[20px] flex items-center justify-center">
                  <motion.div animate={{ rotateY: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
                    <Sparkles className="w-11 h-11 text-blue-400" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              SmartWork 360
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Transform Government Productivity with{' '}
            <span className="text-white font-semibold">AI-Powered</span> Intelligence
          </motion.p>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14 max-w-3xl mx-auto"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 cursor-pointer group hover:bg-white/[0.05] transition-all"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg ${feature.shadow} group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-white text-lg mb-1">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3 }}
          >
            <motion.button
              onClick={() => router.push('/login')}
              className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-lg font-bold rounded-2xl shadow-2xl shadow-blue-500/20 overflow-hidden"
              whileHover={{ scale: 1.03, boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.35)' }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <span className="relative z-10 flex items-center gap-3">
                <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-20 flex justify-center gap-12 md:gap-20"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + i * 0.1 }}
                className="text-center group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="inline-flex p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl mb-3 group-hover:bg-white/[0.06] transition-colors">
                  <stat.icon className="w-5 h-5 text-blue-400" />
                </div>
                <motion.div
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.8 + i * 0.1, type: 'spring' }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Powered by */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-16 flex items-center justify-center gap-2 text-[11px] text-slate-600"
          >
            <Lock className="w-3 h-3" />
            <span>Secured with blockchain technology • Government of India initiative</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
