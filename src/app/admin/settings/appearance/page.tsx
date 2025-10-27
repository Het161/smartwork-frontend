"use client";

import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function AppearanceSettingsPage() {
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [loading, setLoading] = useState(false);

  const themes = [
    { 
      id: 'light', 
      name: 'Light', 
      colors: [
        { bg: 'bg-white', label: 'Primary' },
        { bg: 'bg-blue-100', label: 'Secondary' },
        { bg: 'bg-purple-100', label: 'Accent' }
      ]
    },
    { 
      id: 'dark', 
      name: 'Dark', 
      colors: [
        { bg: 'bg-gray-900', label: 'Primary' },
        { bg: 'bg-gray-700', label: 'Secondary' },
        { bg: 'bg-gray-800', label: 'Accent' }
      ]
    },
    { 
      id: 'blue', 
      name: 'Ocean Blue', 
      colors: [
        { bg: 'bg-blue-600', label: 'Primary' },
        { bg: 'bg-blue-500', label: 'Secondary' },
        { bg: 'bg-cyan-500', label: 'Accent' }
      ]
    },
    { 
      id: 'purple', 
      name: 'Purple Dream', 
      colors: [
        { bg: 'bg-purple-600', label: 'Primary' },
        { bg: 'bg-purple-400', label: 'Secondary' },
        { bg: 'bg-pink-500', label: 'Accent' }
      ]
    },
  ];

  const handleApplyTheme = async () => {
    setLoading(true);
    
    // Simulate theme application
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Store theme preference in localStorage
    localStorage.setItem('theme', selectedTheme);
    
    toast.success(`${themes.find(t => t.id === selectedTheme)?.name} theme applied successfully!`);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Settings</span>
        </button>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-8"
        >
          Appearance
        </motion.h1>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Choose Theme</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {themes.map((theme) => (
              <motion.div
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative cursor-pointer rounded-xl p-6 border-2 transition-all ${
                  selectedTheme === theme.id
                    ? 'border-blue-600 shadow-lg bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                {selectedTheme === theme.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                )}
                
                <div className="flex gap-2 mb-4">
                  {theme.colors.map((color, idx) => (
                    <div
                      key={idx}
                      className={`w-12 h-12 rounded-lg ${color.bg} shadow-md border border-gray-200`}
                      title={color.label}
                    />
                  ))}
                </div>
                
                <p className={`font-semibold text-lg ${
                  selectedTheme === theme.id ? 'text-blue-600' : 'text-gray-900'
                }`}>
                  {theme.name}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={handleApplyTheme}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Applying Theme...
              </span>
            ) : (
              'Apply Theme'
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
