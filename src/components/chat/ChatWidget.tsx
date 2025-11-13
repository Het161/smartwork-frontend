// src/components/chat/ChatWidget.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Mail, Phone } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';  // ✅ Import ChatInput
import { toast } from 'react-hot-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
  senderName: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! How can I help you today?",
      sender: 'support',
      timestamp: new Date(),
      senderName: 'Support Team'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update simulateSupportResponse in ChatWidget.tsx

const simulateSupportResponse = (userMessage: string) => {
  setIsTyping(true);
  
  setTimeout(() => {
    const responses: { [key: string]: string } = {
      // ✅ Existing responses
      'hi': "Hello! How can I assist you today?",
      'hello': "Hi there! What can I do for you?",
      'help': "I'm here to help! What do you need assistance with?",
      'register': "To register, click the 'Sign Up' button on the homepage.",
      'login': "Having trouble logging in? Try resetting your password.",
      'task': "Tasks can be created from your dashboard. Need more help?",
      'price': "We offer flexible pricing plans. Check our pricing page!",
      'thanks': "You're welcome! Anything else I can help with?",
      'bye': "Goodbye! Have a great day!",
      
      // ✅ NEW: Task Management
      'create task': "To create a task: Go to Dashboard → Click 'New Task' → Fill details → Click 'Create'",
      'assign task': "To assign a task to someone, select the task and choose an assignee from the dropdown.",
      'delete task': "To delete a task, click the task → Click the '...' menu → Select 'Delete Task'",
      'edit task': "To edit a task, click on it and modify the details. Changes are saved automatically.",
      'task status': "You can update task status by clicking the task and selecting: Pending, In Progress, Completed, or Reviewed.",
      'overdue': "Overdue tasks are highlighted in red on your dashboard. Sort by 'Due Date' to see them first.",
      
      // ✅ NEW: User Account
      'forgot password': "Click 'Forgot Password' on the login page. We'll send a reset link to your email.",
      'change password': "Go to Settings → Account → Change Password to update your password.",
      'profile': "Update your profile by going to Settings → Profile → Edit Information.",
      'logout': "Click your profile picture in the top right → Select 'Logout'",
      'delete account': "To delete your account, go to Settings → Account → Delete Account. This is permanent!",
      
      // ✅ NEW: Dashboard & Features
      'dashboard': "Your dashboard shows all tasks, recent activity, and productivity stats. Access it from the home icon.",
      'analytics': "View productivity analytics in the Analytics tab. See charts, completion rates, and trends.",
      'notifications': "Enable notifications in Settings → Notifications to get real-time updates.",
      'gps': "GPS tracking verifies your location when starting tasks. Enable it in your device settings.",
      'evidence': "Upload evidence (photos/docs) by clicking a task → 'Upload Evidence' → Select files.",
      
      // ✅ NEW: Team & Collaboration
      'team': "Invite team members from Settings → Team → 'Invite Members'. They'll receive an email invitation.",
      'manager': "Managers can create tasks, assign work, and review submissions. Contact your admin for manager access.",
      'department': "Update your department in Settings → Profile → Department.",
      
      // ✅ NEW: Technical Support
      'bug': "Found a bug? Please email us at support@smartwork360.com with screenshots and details.",
      'slow': "If the app is slow, try clearing your browser cache or updating to the latest version.",
      'mobile': "SmartWork 360 works on mobile browsers! For the best experience, use Chrome or Safari.",
      'offline': "Some features work offline. Data will sync when you're back online.",
      
      // ✅ NEW: Billing & Pricing
      'free': "We offer a free trial for 14 days! No credit card required.",
      'upgrade': "To upgrade your plan, go to Settings → Billing → Choose Plan → Subscribe.",
      'cancel': "To cancel your subscription, go to Settings → Billing → Cancel Subscription.",
      'payment': "We accept credit cards, debit cards, and UPI payments.",
      
      // ✅ NEW: AI Features
      'ai': "Our AI assistant helps predict task completion times and suggests optimal schedules!",
      'chatbot': "I'm an AI chatbot here to answer your questions 24/7. For complex issues, our team will respond shortly.",
      'smart': "SmartWork 360 uses AI to analyze your productivity patterns and provide personalized insights.",
      
      // ✅ NEW: Reports & Export
      'report': "Generate reports from Analytics → 'Export Report' → Choose format (PDF/Excel).",
      'export': "Export your task data: Dashboard → '...' → 'Export Tasks' → Select format.",
      
      // ✅ NEW: Contact & Support
      'contact': "📧 Email: support@smartwork360.com\n📞 Phone: +91-9825247312\n⏰ Hours: Mon-Fri, 9 AM - 6 PM IST",
      'email': "Email us at support@smartwork360.com. We typically respond within 24 hours.",
      'call': "Call our support team at +91-9825247312 (Mon-Fri, 9 AM - 6 PM IST).",
      'hours': "Our support team is available Monday to Friday, 9 AM to 6 PM IST.",
      
      // ✅ NEW: Getting Started
      'demo': "Want a demo? Book a free demo call: https://smartwork360.com/demo",
      'tutorial': "Watch our video tutorials: Dashboard → Help → Video Tutorials",
      'guide': "Download our Getting Started guide: Settings → Help → User Guide (PDF)",
      
      // ✅ Default response
      'default': "Thanks for your message! Our team will respond shortly. You can also:\n• Email: support@smartwork360.com\n• Call: +91-9825247312"
    };

    const keyword = Object.keys(responses).find(key => 
      userMessage.toLowerCase().includes(key)
    );

    const responseText = keyword ? responses[keyword] : responses['default'];

    const newMessage: Message = {
      id: Date.now().toString(),
      text: responseText,
      sender: 'support',
      timestamp: new Date(),
      senderName: 'Support Bot'
    };

    setMessages(prev => [...prev, newMessage]);
    setIsTyping(false);
  }, 1500);
};


  // Update handleSendMessage in ChatWidget.tsx

const handleSendMessage = (messageText: string, file?: File) => {
  // Handle file attachment
  if (file) {
    const fileMessage: Message = {
      id: Date.now().toString(),
      text: `📎 Sent file: ${file.name}`,
      sender: 'user',
      timestamp: new Date(),
      senderName: 'You'
    };
    setMessages(prev => [...prev, fileMessage]);
    
    // Simulate file processing
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: "File received! Our team will review it shortly.",
        sender: 'support',
        timestamp: new Date(),
        senderName: 'Support'
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  }

  // Handle text message
  if (messageText.trim()) {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
      senderName: 'You'
    };
    setMessages(prev => [...prev, newMessage]);
    simulateSupportResponse(messageText);
  }
};


  const handleEmailClick = () => {
    window.location.href = 'mailto:support@smartwork360.com?subject=Support Request';
    toast.success('Opening email client...');
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+919825247312';
    toast.success('Initiating call...');
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center z-50 hover:shadow-3xl transition-shadow"
        >
          <MessageCircle className="w-8 h-8 text-white" />
          
          {/* Notification Badge (Optional) */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            1
          </span>
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Support Chat</h3>
                  <p className="text-white/80 text-xs">
                    {isTyping ? 'Typing...' : 'Were here to help!'}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                {/* Email Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleEmailClick}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  title="Send Email"
                >
                  <Mail className="w-5 h-5 text-white" />
                </motion.button>
                
                {/* Call Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCallClick}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  title="Call Support"
                >
                  <Phone className="w-5 h-5 text-white" />
                </motion.button>
                
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="bg-gray-200 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* ✅ Use ChatInput Component */}
            <ChatInput 
              onSendMessage={handleSendMessage}
              disabled={isTyping}
              placeholder="Type your message..."
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
