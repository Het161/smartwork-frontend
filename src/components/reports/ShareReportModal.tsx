'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Copy, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ShareReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareReportModal({ isOpen, onClose }: ShareReportModalProps) {
  const [copied, setCopied] = useState(false);
  const shareLink = `https://smartwork360.com/reports/share/${Date.now()}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl p-8 max-w-md w-full"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Share Report</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Share Link */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Share Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-shadow"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Share Options */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareLink)}`, '_blank');
                toast.success('Opening Twitter...');
              }}
              className="px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-colors font-semibold"
            >
              Twitter
            </button>
            <button
              onClick={() => {
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareLink)}`, '_blank');
                toast.success('Opening LinkedIn...');
              }}
              className="px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-colors font-semibold"
            >
              LinkedIn
            </button>
            <button
              onClick={() => {
                window.open(`https://wa.me/?text=${encodeURIComponent(shareLink)}`, '_blank');
                toast.success('Opening WhatsApp...');
              }}
              className="px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl transition-colors font-semibold"
            >
              WhatsApp
            </button>
            <button
              onClick={() => {
                window.open(`mailto:?subject=SmartWork 360 Report&body=${encodeURIComponent(shareLink)}`, '_blank');
                toast.success('Opening Email...');
              }}
              className="px-4 py-3 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-xl transition-colors font-semibold"
            >
              Email
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
