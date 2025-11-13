"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import chatbotAPI from '@/lib/api';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your SmartWork AI assistant. I can help you with tasks, productivity insights, and answer questions about your work. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Simulate AI response (replace with actual API call)
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          text: getAIResponse(input),
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
        setLoading(false);
      }, 1000);

      // Uncomment when backend is ready:
      // const response = await chatbotAPI.sendMessage(input);
      // const aiResponse: Message = {
      //   id: messages.length + 2,
      //   text: response.data.response,
      //   isUser: false,
      //   timestamp: new Date(),
      // };
      // setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: 'Sorry, something went wrong. Please try again.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Simulated AI responses (replace with actual API)
  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('productivity') || input.includes('score')) {
      return "Your productivity score this week is 87%, which is 6.8% higher than last week! You've completed 18 tasks and have 5 pending. Keep up the great work! 📈";
    } else if (input.includes('task') || input.includes('todo')) {
      return "You have 12 active tasks. Your highest priority task is 'Complete Q4 Report' due today at 5:00 PM. Would you like me to show you all your tasks?";
    } else if (input.includes('team') || input.includes('colleagues')) {
      return "Your team has 24 members with an overall productivity rate of 84%. Team sentiment is currently positive at 65%. Would you like more details about specific team members?";
    } else if (input.includes('help') || input.includes('what can you do')) {
      return "I can help you with:\n• Checking your tasks and deadlines\n• Viewing productivity metrics\n• Team performance insights\n• Creating new tasks\n• Scheduling reminders\n• Answering questions about your work\n\nWhat would you like to know?";
    } else if (input.includes('deadline') || input.includes('due')) {
      return "You have 3 tasks due today and 2 tasks due tomorrow. Your most urgent task is 'Complete Q4 Report' due in 3 hours. Would you like me to send you a reminder?";
    } else {
      return "I understand you're asking about: '" + userInput + "'. While I'm still learning, I can help you with tasks, productivity metrics, and team insights. Could you rephrase your question?";
    }
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col z-50 border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-5 rounded-t-3xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(255, 255, 255, 0.4)',
                      '0 0 0 10px rgba(255, 255, 255, 0)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Bot className="w-6 h-6 text-purple-600" />
                </motion.div>
                <div>
                  <h3 className="text-white font-bold flex items-center gap-1">
                    SmartWork AI
                    <Sparkles className="w-4 h-4" />
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-white/80">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>Online</span>
                  </div>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-gray-50 to-white">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} items-end gap-2`}
                >
                  {!msg.isUser && (
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-[75%] ${msg.isUser ? 'order-1' : 'order-2'}`}>
                    <div
                      className={`p-4 rounded-2xl ${
                        msg.isUser
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none'
                          : 'bg-white text-gray-900 shadow-md border border-gray-100 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{msg.text}</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 px-2">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {msg.isUser && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 order-2">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start items-end gap-2"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-md border border-gray-100">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white rounded-b-3xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors text-sm"
                  disabled={loading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <MessageCircle className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification Badge */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold"
          >
            3
          </motion.div>
        )}

        {/* Pulse Animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.button>
    </>
  );
};
