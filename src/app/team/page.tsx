"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Send, UserPlus, Search, Mail, Phone } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  status: 'online' | 'offline' | 'away';
  tasksCompleted: number;
  avatar: string;
}

interface Message {
  id: number;
  sender: string;
  message: string;
  timestamp: Date;
  isOwn: boolean;
}

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [teamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: 'John Doe',
      role: 'Senior Developer',
      department: 'Engineering',
      email: 'john@company.com',
      status: 'online',
      tasksCompleted: 145,
      avatar: 'JD',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Product Manager',
      department: 'Product',
      email: 'jane@company.com',
      status: 'online',
      tasksCompleted: 98,
      avatar: 'JS',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Designer',
      department: 'Design',
      email: 'mike@company.com',
      status: 'away',
      tasksCompleted: 67,
      avatar: 'MJ',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      role: 'Marketing Lead',
      department: 'Marketing',
      email: 'sarah@company.com',
      status: 'offline',
      tasksCompleted: 89,
      avatar: 'SW',
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'John Doe',
      message: 'Hey! How\'s the project going?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      isOwn: false,
    },
    {
      id: 2,
      sender: 'You',
      message: 'Great! Just finished the backend API.',
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
      isOwn: true,
    },
    {
      id: 3,
      sender: 'John Doe',
      message: 'Awesome! Let me know when you\'re ready for review.',
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      isOwn: false,
    },
  ]);

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'You',
      message: message,
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    toast.success('Message sent!');

    // Simulate response after 2 seconds
    setTimeout(() => {
      const response: Message = {
        id: messages.length + 2,
        sender: selectedMember?.name || 'Team Member',
        message: 'Thanks! I\'ll check it out.',
        timestamp: new Date(),
        isOwn: false,
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-8"
        >
          Team Collaboration
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Team Members List */}
          <div className="lg:col-span-1 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Team Members</h2>
              <button className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
                <UserPlus className="w-5 h-5 text-blue-600" />
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search members..."
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Members */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredMembers.map((member) => (
                <motion.div
                  key={member.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedMember(member)}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    selectedMember?.id === member.id
                      ? 'bg-gradient-to-r from-blue-100 to-purple-100 ring-2 ring-blue-400'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {member.avatar}
                      </div>
                      <span className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(member.status)} rounded-full border-2 border-white`}></span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Chat/Details Section */}
          <div className="lg:col-span-2">
            {selectedMember ? (
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 flex flex-col h-[700px]">
                {/* Member Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {selectedMember.avatar}
                        </div>
                        <span className={`absolute bottom-0 right-0 w-4 h-4 ${getStatusColor(selectedMember.status)} rounded-full border-2 border-white`}></span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{selectedMember.name}</h3>
                        <p className="text-gray-600">{selectedMember.role} • {selectedMember.department}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {selectedMember.tasksCompleted} tasks completed
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-3 bg-blue-100 rounded-xl hover:bg-blue-200 transition-colors">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </button>
                      <button className="p-3 bg-green-100 rounded-xl hover:bg-green-200 transition-colors">
                        <Phone className="w-5 h-5 text-green-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${msg.isOwn ? 'order-2' : 'order-1'}`}>
                        <div className={`p-4 rounded-2xl ${
                          msg.isOwn
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm font-medium mb-1">{msg.sender}</p>
                          <p>{msg.message}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 px-2">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-6 border-t border-gray-200">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Send
                    </motion.button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-12 text-center h-[700px] flex items-center justify-center">
                <div>
                  <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Select a team member</h3>
                  <p className="text-gray-600">Choose someone from the list to start collaborating</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
