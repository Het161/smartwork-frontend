// src/components/chat/ChatInput.tsx
'use client';

import { useState, useRef } from 'react';
import { Send, Paperclip, Smile, X, File } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface ChatInputProps {
  onSendMessage: (message: string, file?: File) => void;
  disabled?: boolean;
  placeholder?: string;
}

// Common emojis
const EMOJI_LIST = [
  '😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂',
  '😍', '🥰', '😘', '😗', '😙', '😚', '🤗', '🤩', '🤔', '🤨',
  '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯',
  '😪', '😫', '😴', '😌', '😛', '😜', '😝', '🤤', '😒', '😓',
  '😔', '😕', '🙃', '🤑', '😲', '☹️', '🙁', '😖', '😞', '😟',
  '👍', '👎', '👌', '✌️', '🤞', '🤝', '👏', '🙌', '👐', '🤲',
  '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
  '✨', '💫', '⭐', '🌟', '💥', '🔥', '💯', '✅', '❌', '⚠️'
];

export function ChatInput({ 
  onSendMessage, 
  disabled = false,
  placeholder = "Type your message..." 
}: ChatInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if ((!inputValue.trim() && !selectedFile) || disabled) return;
    
    onSendMessage(inputValue, selectedFile || undefined);
    setInputValue('');
    setSelectedFile(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setInputValue(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
      toast.success(`File "${file.name}" attached`);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      {/* File Preview */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-2 p-3 bg-blue-50 rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <File className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-1 hover:bg-blue-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emoji Picker */}
      <AnimatePresence>
        {showEmojiPicker && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-2 p-4 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto"
          >
            <div className="grid grid-cols-10 gap-2">
              {EMOJI_LIST.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleEmojiClick(emoji)}
                  className="text-2xl hover:bg-gray-100 rounded-lg p-2 transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Container */}
      <div 
        className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-all ${
          isFocused 
            ? 'bg-gray-50 ring-2 ring-blue-500' 
            : 'bg-gray-50'
        }`}
      >
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          accept="image/*,application/pdf,.doc,.docx,.txt"
          className="hidden"
        />

        {/* Attachment Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => fileInputRef.current?.click()}
          className="text-gray-400 hover:text-blue-600 transition-colors p-2 hover:bg-gray-200 rounded-full"
          title="Attach file (Max 10MB)"
        >
          <Paperclip className="w-5 h-5" />
        </motion.button>

        {/* Input Field */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 placeholder-gray-400"
          maxLength={500}
        />

        {/* Emoji Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className={`transition-colors p-2 rounded-full ${
            showEmojiPicker 
              ? 'text-blue-600 bg-blue-100' 
              : 'text-gray-400 hover:text-blue-600 hover:bg-gray-200'
          }`}
          title="Add emoji"
        >
          <Smile className="w-5 h-5" />
        </motion.button>

        {/* Send Button */}
        <motion.button
          onClick={handleSend}
          disabled={(!inputValue.trim() && !selectedFile) || disabled}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-3 rounded-xl transition-all ${
            (inputValue.trim() || selectedFile) && !disabled
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Character Counter */}
      {inputValue.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="flex justify-end mt-2"
        >
          <span className={`text-xs ${
            inputValue.length > 450 ? 'text-red-500' : 'text-gray-400'
          }`}>
            {inputValue.length} / 500
          </span>
        </motion.div>
      )}
    </div>
  );
}
