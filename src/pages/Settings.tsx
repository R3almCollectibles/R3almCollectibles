import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import {
  User,
  Mail,
  Wallet,
  Shield,
  Bell,
  Eye,
  EyeOff,
  Copy,
  Check,
  Settings as SettingsIcon,
  Camera,
  Save,
  Database,
  ArrowRight
} from 'lucide-react';

const Settings = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showWallet, setShowWallet] = useState(false);
  const [copiedWallet, setCopiedWallet] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    website: '',
    twitter: '',
    discord: ''
  });
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    pushNotifications: true,
    marketingEmails: false,
    priceAlerts: true,
    newFollowers: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    ...(user?.isAdmin ? [{ id: 'admin', label: 'Admin Panel', icon: Shield }] : [])
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const copyWalletAddress = () => {
    if (user?.walletAddress) {
      navigator.clipboard.writeText(user.walletAddress);
      setCopiedWallet(true);
      setTimeout(() => setCopiedWallet(false), 2000);
    }
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving settings:', { formData, notifications });
    alert('Settings saved successfully! (Demo)');
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <SettingsIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Sign In Required</h2>
          <p className="text-gray-400 mb-6">Please sign in to access your settings</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <h1 className="text-4xl font-bold text-white">Settings</h1>
            {user?.isAdmin && (
              <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium border border-yellow-500/30">
                Administrator
              </span>
            )}
            {user?.isDemo && !user?.isAdmin && (
              <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium border border-emerald-500/30">
                Demo Account
              </span>
            )}
          </div>
          <p className="text-gray-400 text-lg">
            Manage your account preferences and platform settings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-8">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-6">Profile Settings</h2>
                  
                  {/* Avatar Section */}
                  <div className="flex items-center space-x-6 mb-8">
                    <div className="relative">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                          <User className="h-10 w-10 text-white" />
                        </div>
                      )}
                      <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors">
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{user?.name}</h3>
                      <p className="text-gray-400 text-sm">Member since {user?.joinDate}</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2">Display Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Bio</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Tell us about yourself..."
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2">Website</label>
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          placeholder="https://yourwebsite.com"
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-medium mb-2">Twitter</label>
                        <input
                          type="text"
                          name="twitter"
                          value={formData.twitter}
                          onChange={handleInputChange}
                          placeholder="@username"
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'wallet' && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-6">Wallet Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-700/50 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold">Connected Wallet</h3>
                        <div className="flex items-center space-x-2 text-green-400">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm">Connected</span>
                        </div>
                      </div>
                      
                      {user?.walletAddress && (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-gray-400 text-sm mb-2">Wallet Address</label>
                            <div className="flex items-center space-x-3">
                              <div className="flex-1 bg-gray-800 rounded-lg p-3 font-mono text-sm">
                                <span className="text-white">
                                  {showWallet ? user.walletAddress : `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}`}
                                </span>
                              </div>
                              <button
                                onClick={() => setShowWallet(!showWallet)}
                                className="text-gray-400 hover:text-white transition-colors p-2"
                              >
                                {showWallet ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                              <button
                                onClick={copyWalletAddress}
                                className="text-gray-400 hover:text-white transition-colors p-2"
                              >
                                {copiedWallet ? <Check className="h-5 w-5 text-green-400" /> : <Copy className="h-5 w-5" />}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-700/50 rounded-lg p-6">
                      <h3 className="text-white font-semibold mb-4">Wallet Actions</h3>
                      <div className="space-y-3">
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
                          Connect New Wallet
                        </button>
                        <button className="w-full bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-lg font-medium transition-colors">
                          Disconnect Wallet
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between py-3">
                        <div>
                          <h3 className="text-white font-medium">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {key === 'emailUpdates' && 'Receive email notifications about your account activity'}
                            {key === 'pushNotifications' && 'Get push notifications on your device'}
                            {key === 'marketingEmails' && 'Receive promotional emails and platform updates'}
                            {key === 'priceAlerts' && 'Get notified when collectible prices change'}
                            {key === 'newFollowers' && 'Notification when someone follows you'}
                          </p>
                        </div>
                        <button
                          onClick={() => handleNotificationChange(key)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            value ? 'bg-blue-600' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-6">Privacy Settings</h2>

                  <div className="space-y-6">
                    <div className="bg-gray-700/50 rounded-lg p-6">
                      <h3 className="text-white font-semibold mb-4">Profile Visibility</h3>
                      <div className="space-y-4">
                        <label className="flex items-center space-x-3">
                          <input type="radio" name="visibility" className="text-blue-600" defaultChecked />
                          <span className="text-white">Public - Anyone can view your profile</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="radio" name="visibility" className="text-blue-600" />
                          <span className="text-white">Private - Only you can view your profile</span>
                        </label>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-600 rounded-lg p-3">
                          <Database className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-2">Storage & Security Details</h3>
                          <p className="text-gray-300 text-sm mb-4">
                            View detailed information about your data storage, security features, and active sessions
                          </p>
                          <Link to="/storage-security">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center space-x-2">
                              <span>View Details</span>
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-700/50 rounded-lg p-6">
                      <h3 className="text-white font-semibold mb-4">Data & Privacy</h3>
                      <div className="space-y-3">
                        <button className="w-full bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-lg font-medium transition-colors text-left px-4">
                          Download My Data
                        </button>
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors text-left px-4">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'admin' && user?.isAdmin && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-6">Admin Panel</h2>

                  <div className="space-y-6">
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
                      <h3 className="text-white font-semibold mb-4">Administrator Controls</h3>
                      <p className="text-gray-300 text-sm mb-6">
                        Welcome back, {user.name}! You have full administrative access to the platform. Use the controls below to manage users, collections, and platform settings.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors text-left">
                          Manage Users & Accounts
                        </button>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors text-left">
                          Verify Collections
                        </button>
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-medium transition-colors text-left">
                          Platform Analytics
                        </button>
                        <button className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-medium transition-colors text-left">
                          Moderate Content
                        </button>
                        <button className="bg-rose-600 hover:bg-rose-700 text-white py-3 px-4 rounded-lg font-medium transition-colors text-left">
                          System Configuration
                        </button>
                        <button className="bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-4 rounded-lg font-medium transition-colors text-left">
                          View Audit Logs
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-700/50 rounded-lg p-6">
                      <h3 className="text-white font-semibold mb-4">Recent Admin Actions</h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 pb-3 border-b border-gray-600">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-white text-sm">Verified 5 new collectible collections</p>
                            <p className="text-gray-400 text-xs">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 pb-3 border-b border-gray-600">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-white text-sm">Moderated 3 flagged listings</p>
                            <p className="text-gray-400 text-xs">5 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-white text-sm">Updated platform security policies</p>
                            <p className="text-gray-400 text-xs">1 day ago</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-700/50 rounded-lg p-6">
                      <h3 className="text-white font-semibold mb-4">Platform Statistics</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Total Users</p>
                          <p className="text-2xl font-bold text-white">12,547</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Active Users</p>
                          <p className="text-2xl font-bold text-green-400">3,821</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Total Collectibles</p>
                          <p className="text-2xl font-bold text-white">8,947</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Total Transactions</p>
                          <p className="text-2xl font-bold text-blue-400">45,234</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2"
                >
                  <Save className="h-5 w-5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;