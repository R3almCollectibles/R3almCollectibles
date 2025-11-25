// src/pages/admin/AdminTeam.tsx – FULLY FIXED & WORKING
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminSidebar from '../../components/admin/AdminSidebar';
import {
  Shield,
  Users,
  Mail,
  Calendar,
  MoreVertical,
  UserPlus,
  Trash2,
  Edit,
  Lock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Crown,
  Key,
  UserCheck,
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'moderator' | 'viewer';
  status: 'active' | 'invited' | 'suspended';
  joined: string;
  lastActive: string;
  permissions: string[];
}

const AdminTeam: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Alex Chen',
      email: 'alex@capitalrealm.io',
      role: 'owner',
      status: 'active',
      joined: 'Jan 2023',
      lastActive: '2 min ago',
      permissions: ['all'],
    },
    {
      id: '2',
      name: 'Sarah Miller',
      email: 'sarah@capitalrealm.io',
      role: 'admin',
      status: 'active',
      joined: 'Mar 2024',
      lastActive: '1 hour ago',
      permissions: ['collectibles', 'users', 'reports', 'analytics'],
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@capitalrealm.io',
      role: 'moderator',
      status: 'active',
      joined: 'Jun 2024',
      lastActive: '3 hours ago',
      permissions: ['collectibles', 'reports'],
    },
    {
      id: '4',
      name: 'Emma Davis',
      email: 'emma@capitalrealm.io',
      role: 'viewer',
      status: 'invited',
      joined: 'Pending',
      lastActive: '—',
      permissions: ['analytics'],
    },
  ];

  const getRoleBadge = (role: string) => {
    const config: Record<string, { class: string; icon: any; text: string }> = {
      owner: { class: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white', icon: Crown, text: 'Owner' },
      admin: { class: 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white', icon: Shield, text: 'Admin' },
      moderator: { class: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white', icon: Key, text: 'Moderator' },
      viewer: { class: 'bg-gray-600 text-gray-300', icon: UserCheck, text: 'Viewer' },
    };
    const { class: cls, icon: Icon, text } = config[role] || config.viewer;
    return (
      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold ${cls}`}>
        <Icon className="h-4 w-4" />
        {text}
      </span>
    );
  };

  const getStatusIcon = (status: string) => {
    if (status === 'active') return <CheckCircle2 className="h-5 w-5 text-green-400" />;
    if (status === 'invited') return <Mail className="h-5 w-5 text-yellow-400" />;
    if (status === 'suspended') return <XCircle className="h-5 w-5 text-red-400" />;
    return null;
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <AdminSidebar />

      <div className="flex-1 ml-64">
        <div className="pt-16 min-h-screen bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-5xl font-bold text-white flex items-center gap-5">
                    <Shield className="h-14 w-14 text-purple-500" />
                    Team Management
                  </h1>
                  <p className="text-xl text-gray-400 mt-3">Manage admin roles, permissions, and team members</p>
                </div>
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-2xl transition shadow-lg"
                >
                  <UserPlus className="h-6 w-6" />
                  Invite Team Member
                </button>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
                <Users className="h-10 w-10 mb-4" />
                <div className="text-4xl font-bold">4</div>
                <p className="opacity-90">Total Members</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl p-6 text-white">
                <Crown className="h-10 w-10 mb-4" />
                <div className="text-4xl font-bold">1</div>
                <p className="opacity-90">Owner</p>
              </div>
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
                <Key className="h-10 w-10 mb-4" />
                <div className="text-4xl font-bold">1</div>
                <p className="opacity-90">Admin</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-2xl p-6 text-white">
                <Mail className="h-10 w-10 mb-4" />
                <div className="text-4xl font-bold">1</div>
                <p className="opacity-90">Pending Invite</p>
              </div>
            </div>

            {/* Team Table */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Team Members</h2>
                    <input
                      type="text"
                      placeholder="Search team members..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="px-5 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition w-80"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700 text-left text-gray-400 text-sm">
                        <th className="px-6 py-4">Member</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Joined</th>
                        <th className="px-6 py-4">Last Active</th>
                        <th className="px-6 py-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamMembers
                        .filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.email.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((member) => (
                          <tr key={member.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition">
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-4">
                                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-lg">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                  <div className="text-white font-medium">{member.name}</div>
                                  <div className="text-gray-400 text-sm flex items-center gap-2">
                                    <Mail className="h-3.5 w-3.5" />
                                    {member.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5">{getRoleBadge(member.role)}</td>
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-3">
                                {getStatusIcon(member.status)}
                                <span className="text-sm text-gray-300 capitalize">{member.status}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5 text-gray-300">{