// src/app/settings/appearance/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'react-hot-toast';

type Theme = 'light' | 'dark' | 'ocean-blue' | 'purple-dream';

const themes = [
  {
    id: 'light' as Theme,
    name: 'Light',
    colors: ['#ffffff', '#bfdbfe', '#fae8ff'],
    bgClass: 'bg-gradient-to-r from-gray-50 via-blue-50 to-purple-50'
  },
  {
    id: 'dark' as Theme,
    name: 'Dark',
    colors: ['#1f2937', '#374151', '#4b5563'],
    bgClass: 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600'
  },
  {
    id: 'ocean-blue' as Theme,
    name: 'Ocean Blue',
    colors: ['#1e40af', '#3b82f6', '#06b6d4'],
    bgClass: 'bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500'
  },
  {
    id: 'purple-dream' as Theme,
    name: 'Purple Dream',
    colors: ['#7c3aed', '#a855f7','#ec4899'],
    bgClass: 'bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500'
  },
];

export default function AppearancePage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<Theme>(theme);

  const handleApply = () => {
    setTheme(selectedTheme);
    toast.success(`${themes.find(t => t.id === selectedTheme)?.name} theme applied! 🎨`);
  };

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back to Settings</span>
        </button>

        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8"
          style={{ color: 'var(--text-primary)' }}
        >
          Appearance
        </motion.h1>

        {/* Theme Selection Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8"
          style={{ backgroundColor: 'var(--bg-card)' }}
        >
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Choose Theme
          </h2>

          {/* Theme Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {themes.map((themeOption) => (
              <motion.button
                key={themeOption.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedTheme(themeOption.id)}
                className={`relative p-6 rounded-2xl border-2 transition-all ${
                  selectedTheme === themeOption.id
                    ? 'border-blue-500 shadow-lg'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: selectedTheme === themeOption.id ? '#3b82f6' : 'var(--border-color)'
                }}
              >
                {/* Color Preview */}
                <div className="flex gap-2 mb-4">
                  {themeOption.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-16 h-16 rounded-xl"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                {/* Theme Name */}
                <h3
                  className="text-xl font-bold"
                  style={{
                    color: selectedTheme === themeOption.id ? '#3b82f6' : 'var(--text-primary)'
                  }}
                >
                  {themeOption.name}
                </h3>

                {/* Check Mark */}
                {selectedTheme === themeOption.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Apply Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleApply}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all"
          >
            Apply Theme
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
