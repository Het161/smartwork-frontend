'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mail, Phone } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: Date;
}

interface TeamChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: {
    name: string;
    role: string;
    avatar: string;
    email: string;
    phone: string;
  };
}

export function TeamChatModal({ isOpen, onClose, member }: TeamChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! I'm ${member.name}. How can I help you?`,
      sender: 'them',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'me',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! I'll get back to you soon.",
        sender: 'them',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
    }, 1500);
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
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl w-full max-w-md h-[600px] flex flex-col overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold">
                {member.avatar}
              </div>
              <div>
                <h3 className="text-white font-semibold">{member.name}</h3>
                <p className="text-white/80 text-sm">{member.role}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  window.location.href = `mailto:${member.email}`;
                  toast.success('Opening email...');
                }}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center"
              >
                <Mail className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => {
                  window.location.href = `tel:${member.phone}`;
                  toast.success('Calling...');
                }}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center"
              >
                <Phone className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                    message.sender === 'me'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={handleSend}
                className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center hover:shadow-lg transition-shadow"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
