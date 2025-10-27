"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

// Staggered Children Animation
export const StaggerContainer = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Fade Up Item
export const FadeUpItem = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.5 }
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// 3D Card with Tilt Effect
export const Card3D = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      className={`${className} perspective-1000`}
      whileHover={{ 
        scale: 1.02,
        rotateX: 2,
        rotateY: 2,
        z: 50,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
};

// Floating Animation
export const FloatingElement = ({ 
  children, 
  delay = 0,
  className = "" 
}: { 
  children: ReactNode; 
  delay?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

// Pulse Glow Effect
export const PulseGlow = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      className={className}
      animate={{
        boxShadow: [
          "0 0 20px rgba(59, 130, 246, 0.5)",
          "0 0 40px rgba(59, 130, 246, 0.8)",
          "0 0 20px rgba(59, 130, 246, 0.5)",
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    >
      {children}
    </motion.div>
  );
};

// Slide In from Side
export const SlideIn = ({ 
  children, 
  direction = "left",
  delay = 0,
  className = "" 
}: { 
  children: ReactNode; 
  direction?: "left" | "right" | "top" | "bottom";
  delay?: number;
  className?: string;
}) => {
  const variants = {
    left: { x: -100, opacity: 0 },
    right: { x: 100, opacity: 0 },
    top: { y: -100, opacity: 0 },
    bottom: { y: 100, opacity: 0 },
  };

  return (
    <motion.div
      className={className}
      initial={variants[direction]}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.6, type: "spring" }}
    >
      {children}
    </motion.div>
  );
};

// Scale Pop Animation
export const ScalePop = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => {
  return (
    <motion.div
      className={className}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        delay,
        type: "spring",
        stiffness: 260,
        damping: 20 
      }}
    >
      {children}
    </motion.div>
  );
};

// Rotating Border
export const RotatingBorder = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ padding: "2px" }}
      >
        <div className="w-full h-full bg-white rounded-2xl" />
      </motion.div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// Typewriter Effect
export const TypewriterText = ({ 
  text, 
  delay = 0,
  className = "" 
}: { 
  text: string; 
  delay?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + index * 0.05 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Magnetic Button
export const MagneticButton = ({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) => {
  return (
    <motion.button
      className={className}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <motion.div
        whileHover={{ x: [0, -2, 2, -2, 2, 0] }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.button>
  );
};
