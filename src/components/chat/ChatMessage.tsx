// src/components/chat/ChatMessage.tsx
'use client';

import { motion } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
  senderName: string;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
    >
      {!isUser && (
        <span className="text-xs text-gray-600 mb-1 px-4">
          {message.senderName}
        </span>
      )}
      
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
          isUser
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
            : 'bg-gray-200 text-gray-900'
        }`}
      >
        <p className="text-sm">{message.text}</p>
      </div>
      
      <span className="text-xs text-gray-400 mt-1 px-2">
        {formatTime(message.timestamp)}
      </span>
    </motion.div>
  );
}
