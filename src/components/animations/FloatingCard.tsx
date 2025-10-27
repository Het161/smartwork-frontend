"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingCardProps {
  children: ReactNode;
  delay?: number;
}

export const FloatingCard = ({ children, delay = 0 }: FloatingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -10,
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
      }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
    >
      {children}
    </motion.div>
  );
};
