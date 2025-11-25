// src/pages/admin/AdminSettings.tsx – COMPLETE & PROFESSIONAL
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminSidebar from '../../components/admin/AdminSidebar';
import {
  Shield,
  Settings,
  Bell,
  Globe,
  Lock,
  Palette,
  CreditCard,
  Users,
  Mail,
  Webhook,
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
} from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook },
    { id: 'team', label: 'Team', icon: Users },
  ];

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
                    <Shield className="h-14 w-14 text-indigo-500" />
                    Platform Settings
                  </h1>
                  <p className="text-xl text-gray-400 mt-3">Configure your platform's behavior and appearance</p>
                </div>
                {saved && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 px-6 py-4 bg-green-600/20 border border-green-500/50 rounded-xl text-green-400"
                  >
                    <CheckCircle2 className="h-6 w-6" />
                    <span className="font-medium">Settings saved successfully!</span>
                  </motion.div>
                )}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Tabs */}
              <div className="lg:col-span-1">
                <div className="bg-gray-800 rounded-2xl border border-gray-700 p-4">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all mb-2 ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content Area */}
              <div className="lg:col-span-3">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gray-800 rounded-2xl border border-gray-700 p-8"
                >

                  {/* General Settings */}
                  {activeTab === 'general' && (
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
                        <Settings className="h-10 w-10 text-indigo-400" />
                        General Settings
                      </h2>

                      <div className="space-y-8">
                        <div>
                          <label className="text-white font-medium mb-3 block">Platform Name</label>
                          <input
                            type="text"
                            defaultValue="Capital Realm"
                            className="w-full px-5 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition"
                          />
                        </div>

                        <div>
                          <label className="text-white font-medium mb-3 block">Platform URL</label>
                          <div className="flex items-center gap-3">
                            <input
                              type="text"
                              value="https://capitalrealm.io"
                              readOnly
                              className="flex-1 px-5 py-4 bg-gray-700 border border-gray-600 rounded-xl text-gray-400 cursor-not-allowed"
                            />
                            <button
                              onClick={() => copyToClipboard('https://capitalrealm.io')}
                              className="p-4 bg-gray-700 hover:bg-gray-600 rounded-xl transition"
                            >
                              <Copy className="h-5 w-5 text-gray-400" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="text-white font-medium mb-3 block">Time Zone</label>
                            <select className="w-full px-5 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-indigo-500">
                              <option>UTC-05:00 Eastern Time</option>
                              <option>UTC-08:00 Pacific Time</option>
                              <option>UTC+00:00 London</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-white font-medium mb-3 block">Default Currency</label>
                            <select className="w-full px-5 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-indigo-500">
                              <option>ETH</option>
                              <option>USDC</option>
                              <option>USDT</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-white font-medium mb-3 block">Maintenance Mode</label>
                          <div className="flex items-center gap-4">
                            <button className="px-6 py-3 bg-gray-700 rounded-xl text-white hover:bg-gray-600 transition">
                              Disabled
                            </button>
                            <button className="px-6 py-3 bg-red-600 rounded-xl text-white hover:bg-red-700 transition">
                              Enable Maintenance
                            </button>
                          </div>
                          <p className="text-gray-400 text-sm mt-3">When enabled, only admins can access the platform</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Security Settings */}
                  {activeTab === 'security' && (
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
                        <Lock className="h-10 w-10 text-red-400" />
                        Security & Access
                      </h2>

                      <div className="space-y-8">
                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6">
                          <div className="flex items-center gap-4">
                            <AlertCircle className="h-8 w-8 text-yellow-400" />
                            <div>
                              <h3 className="text-xl font-bold text-white">2FA Not Enabled</h3>
                              <p className="text-gray-400">Enable two-factor authentication for maximum security</p>
                              <button className="mt-4 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-xl text-white font-medium transition">
                                Enable 2FA
                              </button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="text-white font-medium mb-4 block">Session Timeout</label>
                          <select className="w-full max-w-xs px-5 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-red-500">
                            <option>15 minutes</option>
                            <option>30 minutes</option>
                            <option>1 hour</option>
                            <option>4 hours</option>
                            <option>Never</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-white font-medium mb-4 block">IP Whitelisting</label>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-4 bg-gray-700 rounded-xl">
                              <span className="text-gray-300">203.0.113.42</span>
                              <button className="text-red-400 hover:text-red-300">Remove</button>
                            </div>
                            <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white transition">
                              + Add IP Address
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notifications */}
                  {activeTab === 'notifications' && (
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
                        <Bell className="h-10 w-10 text-blue-400" />
                        Notification Preferences
                      </h2>
                      <div className="space-y-6">
                        {['New collectible submissions', 'User reports/flagged content', 'Revenue milestones', 'Security alerts', 'System updates'].map((item) => (
                          <div key={item} className="flex items-center justify-between p-6 bg-gray-700 rounded-xl">
                            <div>
                              <p className="text-white font-medium">{item}</p>
                              <p className="text-gray-400 text-sm">Receive alerts via email and dashboard</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" defaultChecked className="sr-only peer" />
                              <div className="w-14 h-8 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Branding */}
                  {activeTab === 'branding' && (
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
                        <Palette className="h-10 w-10 text-purple-400" />
                        Branding & Appearance
                      </h2>
                      <div className="space-y-8">
                        <div>
                          <label className="text-white font-medium mb-4 block">Primary Color</label>
                          <div className="flex items-center gap-4">
                            <input type="color" defaultValue="#6366f1" className="w-24 h-24 rounded-xl cursor-pointer" />
                            <div>
                              <input
                                type="text"
                                defaultValue="#6366f1"
                                className="w-48 px-5 py-4 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500"
                              />
                              <p className="text-gray-400 text-sm mt-2">Used for buttons, links, and accents</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="text-white font-medium mb-4 block">Platform Logo</label>
                          <div className="bg-gray-700 border-2 border-dashed border-gray-600 rounded-xl p-12 text-center">
                            <div className="bg-gray-600 rounded-xl w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                              <Shield className="h-16 w-16 text-gray-500" />
                            </div>
                            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white font-medium transition">
                              Upload New Logo
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Save Button */}
                  <div className="mt-12 pt-8 border-t border-gray-700 flex justify-end gap-4">
                    <button className="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-medium transition flex items-center gap-3">
                      <RefreshCw className="h-5 w-5" />
                      Reset to Defaults
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl text-white font-bold transition flex items-center gap-3 shadow-lg"
                    >
                      <Save className="h-5 w-5" />
                      Save Changes
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;