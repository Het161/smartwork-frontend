'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  UserPlus, 
  Mail, 
  Phone, 
  MessageCircle,
  MoreVertical,
  X,
  Users
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { TeamChatModal } from '@/components/team/TeamChatModal';
import { AddMemberModal } from '@/components/team/AddMemberModal';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
}

const INITIAL_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Senior Developer',
    email: 'john@smartwork360.com',
    phone: '+1-555-0101',
    avatar: 'JD',
    status: 'online'
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'Product Manager',
    email: 'jane@smartwork360.com',
    phone: '+1-555-0102',
    avatar: 'JS',
    status: 'online'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    role: 'Designer',
    email: 'mike@smartwork360.com',
    phone: '+1-555-0103',
    avatar: 'MJ',
    status: 'away'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    role: 'Marketing Lead',
    email: 'sarah@smartwork360.com',
    phone: '+1-555-0104',
    avatar: 'SW',
    status: 'offline'
  }
];

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showChatModal, setShowChatModal] = useState(false);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEmailClick = (member: TeamMember) => {
    window.location.href = `mailto:${member.email}?subject=Message from SmartWork 360`;
    toast.success(`Opening email to ${member.name}...`);
  };

  const handleCallClick = (member: TeamMember) => {
    window.location.href = `tel:${member.phone}`;
    toast.success(`Calling ${member.name}...`);
  };

  const handleChatClick = (member: TeamMember) => {
    setSelectedMember(member);
    setShowChatModal(true);
  };

  const handleAddMember = (newMember: Partial<TeamMember>) => {
    const member: TeamMember = {
      id: Date.now().toString(),
      name: newMember.name || '',
      role: newMember.role || '',
      email: newMember.email || '',
      phone: newMember.phone || '',
      avatar: newMember.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'NA',
      status: 'offline'
    };
    
    setMembers([...members, member]);
    toast.success(`${member.name} added to team!`);
    setShowAddModal(false);
  };

  const getStatusColor = (status: TeamMember['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Team Collaboration
          </h1>
          <p className="text-gray-600">
            Connect and collaborate with your team members
          </p>
        </motion.div>

        {/* Team Members Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          {/* Header with Search and Add Button */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
            </div>

            {/* Add Member Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-shadow"
            >
              <UserPlus className="w-5 h-5" />
              <span>Add Member</span>
            </motion.button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search members..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Team Members List */}
          <div className="space-y-4">
            <AnimatePresence>
              {filteredMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl hover:shadow-md transition-all"
                >
                  {/* Member Info */}
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        {member.avatar}
                      </div>
                      <div className={`absolute bottom-0 right-0 w-4 h-4 ${getStatusColor(member.status)} border-2 border-white rounded-full`} />
                    </div>

                    {/* Name and Role */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {/* Email Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEmailClick(member)}
                      className="w-12 h-12 bg-blue-100 hover:bg-blue-200 rounded-xl flex items-center justify-center transition-colors"
                      title={`Email ${member.name}`}
                    >
                      <Mail className="w-5 h-5 text-blue-600" />
                    </motion.button>

                    {/* Call Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleCallClick(member)}
                      className="w-12 h-12 bg-green-100 hover:bg-green-200 rounded-xl flex items-center justify-center transition-colors"
                      title={`Call ${member.name}`}
                    >
                      <Phone className="w-5 h-5 text-green-600" />
                    </motion.button>

                    {/* Chat Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleChatClick(member)}
                      className="w-12 h-12 bg-purple-100 hover:bg-purple-200 rounded-xl flex items-center justify-center transition-colors"
                      title={`Chat with ${member.name}`}
                    >
                      <MessageCircle className="w-5 h-5 text-purple-600" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredMembers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No team members found</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Add Member Modal */}
      <AddMemberModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddMember}
      />

      {/* Chat Modal */}
      {selectedMember && (
        <TeamChatModal
          isOpen={showChatModal}
          onClose={() => setShowChatModal(false)}
          member={selectedMember}
        />
      )}
    </div>
  );
}
