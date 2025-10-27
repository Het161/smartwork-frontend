"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export const GradientButton = ({ 
  children, 
  onClick,
  className = "",
  type = "button"
}: { 
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`relative px-6 py-3 rounded-xl font-semibold text-white overflow-hidden group ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
      />
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};
