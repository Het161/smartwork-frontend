"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Zap, Shield, BarChart3, Users, Cpu, Rocket } from 'lucide-react';
import { Card3D, FloatingElement, ScalePop, TypewriterText } from '@/components/animations/EnhancedAnimations';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      
      {/* Animated Background Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="text-center max-w-6xl mx-auto">
          
          {/* Logo with 3D Effect */}
          <ScalePop delay={0.2}>
            <FloatingElement delay={0}>
              <motion.div
                className="inline-block mb-8"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl glow-blue transform-3d perspective-1000">
                  <motion.div
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-16 h-16 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            </FloatingElement>
          </ScalePop>

          {/* Title with Gradient Animation */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-7xl md:text-8xl font-bold mb-6"
          >
            <span className="animated-gradient gradient-text">
              SmartWork 360
            </span>
          </motion.h1>

          {/* Typewriter Subtitle */}
          <TypewriterText
            text="Transform Government Productivity with AI"
            delay={0.8}
            className="text-2xl md:text-3xl text-gray-700 mb-12 font-medium"
          />

          {/* Feature Cards with 3D Effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
          >
            {[
              { icon: Zap, title: "Real-time Tracking", color: "from-yellow-500 to-orange-500", delay: 0 },
              { icon: Shield, title: "Blockchain Secure", color: "from-blue-500 to-cyan-500", delay: 0.1 },
              { icon: BarChart3, title: "Smart Analytics", color: "from-purple-500 to-pink-500", delay: 0.2 }
            ].map((feature, index) => (
              <Card3D key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + feature.delay }}
                  className="glass rounded-2xl p-8 hover-lift cursor-pointer group"
                >
                  <FloatingElement delay={index * 0.2}>
                    <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-10 h-10 text-white" />
                    </div>
                  </FloatingElement>
                  <h3 className="font-bold text-xl text-gray-900">{feature.title}</h3>
                </motion.div>
              </Card3D>
            ))}
          </motion.div>

          {/* CTA Button with Advanced Effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8 }}
          >
            <motion.button
              onClick={() => router.push('/login')}
              className="group relative px-12 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-xl font-bold rounded-2xl shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Button Content */}
              <span className="relative z-10 flex items-center gap-3">
                <Rocket className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                Get Started
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 blur-xl opacity-0 group-hover:opacity-50 transition-opacity"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          </motion.div>

          {/* Stats with Counter Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-16 flex justify-center gap-12 text-gray-700"
          >
            {[
              { label: "Departments", value: "50+", icon: Users },
              { label: "Active Users", value: "10K+", icon: Cpu },
              { label: "Tasks Completed", value: "1M+", icon: BarChart3 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 + index * 0.1 }}
                className="text-center"
                whileHover={{ scale: 1.1 }}
              >
                <div className="inline-block p-3 bg-white rounded-xl shadow-lg mb-2">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <motion.div
                  className="text-4xl font-bold gradient-text"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2.4 + index * 0.1, type: "spring" }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
