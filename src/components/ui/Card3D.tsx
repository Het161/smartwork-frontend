"use client";

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

export const Card3D = ({ 
  children, 
  className = "",
  glowColor = "blue"
}: { 
  children: ReactNode; 
  className?: string;
  glowColor?: "blue" | "purple" | "pink" | "teal" | "green";
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const glowColors = {
    blue: "rgba(59, 130, 246, 0.3)",
    purple: "rgba(139, 92, 246, 0.3)",
    pink: "rgba(236, 72, 153, 0.3)",
    teal: "rgba(20, 184, 166, 0.3)",
    green: "rgba(34, 197, 94, 0.3)",
  };

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        setRotateY((x - centerX) / 10);
        setRotateX(-(y - centerY) / 10);
      }}
      onMouseLeave={() => {
        setRotateX(0);
        setRotateY(0);
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0"
        style={{
          background: `radial-gradient(circle at center, ${glowColors[glowColor]}, transparent)`,
          filter: "blur(20px)",
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      {children}
    </motion.div>
  );
};
