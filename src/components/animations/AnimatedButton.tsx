"use client";

import { motion } from 'framer-motion';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
}

export const AnimatedButton = ({ 
  children, 
  variant = 'primary', 
  loading = false,
  className = '',
  ...props 
}: AnimatedButtonProps) => {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white',
    secondary: 'bg-gray-200 text-gray-900',
    ghost: 'bg-transparent border-2 border-blue-600 text-blue-600',
  };

  return (
    <motion.button
      className={`
        px-6 py-3 rounded-lg font-semibold
        relative overflow-hidden
        ${variants[variant]}
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      disabled={loading}
      {...props}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      
      <motion.div
        className="absolute inset-0 bg-white opacity-0"
        whileTap={{ scale: 2, opacity: 0.3 }}
        transition={{ duration: 0.4 }}
      />
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        {children}
      </span>
    </motion.button>
  );
};
