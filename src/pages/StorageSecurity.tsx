import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import {
  Database,
  Shield,
  HardDrive,
  Lock,
  Key,
  CheckCircle,
  AlertTriangle,
  FileText,
  Clock,
  Server,
  Eye,
  Fingerprint,
  ShieldCheck,
  Activity,
  Zap
} from 'lucide-react';

const StorageSecurity = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'storage' | 'security'>('storage');

  if (!isAuthenticated) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Sign In Required</h2>
          <p className="text-gray-400 mb-6">Please sign in to access storage and security details</p>
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
          <h1 className="text-4xl font-bold text-white mb-4">Storage & Security</h1>
          <p className="text-gray-400 text-lg">
            Detailed information about your data storage and security measures
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-2 inline-flex">
            <button
              onClick={() => setActiveTab('storage')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'storage'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <HardDrive className="h-5 w-5" />
              <span>Storage Details</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'security'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Shield className="h-5 w-5" />
              <span>Security Details</span>
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {activeTab === 'storage' && (
            <div className="space-y-6">
              {/* Storage Overview */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Database className="h-6 w-6 text-blue-400" />
                  <h2 className="text-2xl font-semibold text-white">Storage Overview</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Total Storage</span>
                      <HardDrive className="h-5 w-5 text-blue-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">50 GB</p>
                    <p className="text-xs text-gray-400 mt-1">Allocated space</p>
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Used Storage</span>
                      <Activity className="h-5 w-5 text-purple-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">12.4 GB</p>
                    <p className="text-xs text-gray-400 mt-1">24.8% utilized</p>
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Available</span>
                      <Zap className="h-5 w-5 text-green-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">37.6 GB</p>
                    <p className="text-xs text-gray-400 mt-1">75.2% free</p>
                  </div>
                </div>

                {/* Storage Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Storage Usage</span>
                    <span className="text-sm text-gray-400">24.8%</span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: '24.8%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Storage Breakdown */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <FileText className="h-6 w-6 text-purple-400" />
                  <h2 className="text-2xl font-semibold text-white">Storage Breakdown</h2>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'NFT Images', size: '8.2 GB', percentage: 66, color: 'from-blue-500 to-blue-600' },
                    { label: 'Metadata', size: '2.1 GB', percentage: 17, color: 'from-purple-500 to-purple-600' },
                    { label: 'Transaction Records', size: '1.8 GB', percentage: 14, color: 'from-emerald-500 to-emerald-600' },
                    { label: 'Other Data', size: '0.3 GB', percentage: 3, color: 'from-orange-500 to-orange-600' }
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{item.label}</span>
                        <span className="text-gray-400">{item.size}</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Database Information */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Server className="h-6 w-6 text-emerald-400" />
                  <h2 className="text-2xl font-semibold text-white">Database Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-white font-medium mb-1">Supabase Backend</h3>
                        <p className="text-gray-400 text-sm">
                          Your data is stored securely using Supabase, a reliable PostgreSQL database solution
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-white font-medium mb-1">Auto Backups</h3>
                        <p className="text-gray-400 text-sm">
                          Daily automated backups ensure your data is never lost
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-white font-medium mb-1">High Availability</h3>
                        <p className="text-gray-400 text-sm">
                          99.9% uptime guarantee with redundant infrastructure
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Clock className="h-5 w-5 text-blue-400" />
                        <span className="text-white font-medium">Last Backup</span>
                      </div>
                      <p className="text-gray-300">Today at 3:00 AM UTC</p>
                      <p className="text-xs text-gray-400 mt-1">Next backup in 21 hours</p>
                    </div>

                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Activity className="h-5 w-5 text-purple-400" />
                        <span className="text-white font-medium">Database Status</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-green-400 font-medium">Operational</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">All systems running normally</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Security Overview */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <ShieldCheck className="h-6 w-6 text-green-400" />
                  <h2 className="text-2xl font-semibold text-white">Security Overview</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300 text-sm">Security Score</span>
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <p className="text-3xl font-bold text-green-400">95/100</p>
                    <p className="text-xs text-gray-400 mt-1">Excellent security</p>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300 text-sm">2FA Enabled</span>
                      <Lock className="h-5 w-5 text-blue-400" />
                    </div>
                    <p className="text-3xl font-bold text-blue-400">Yes</p>
                    <p className="text-xs text-gray-400 mt-1">Extra protection active</p>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300 text-sm">Active Sessions</span>
                      <Eye className="h-5 w-5 text-purple-400" />
                    </div>
                    <p className="text-3xl font-bold text-purple-400">3</p>
                    <p className="text-xs text-gray-400 mt-1">Devices logged in</p>
                  </div>
                </div>
              </div>

              {/* Security Features */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Lock className="h-6 w-6 text-blue-400" />
                  <h2 className="text-2xl font-semibold text-white">Security Features</h2>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      icon: ShieldCheck,
                      title: 'End-to-End Encryption',
                      description: 'All data is encrypted in transit and at rest using AES-256 encryption',
                      status: 'active',
                      color: 'text-green-400'
                    },
                    {
                      icon: Key,
                      title: 'Row Level Security (RLS)',
                      description: 'Database policies ensure you can only access your own data',
                      status: 'active',
                      color: 'text-green-400'
                    },
                    {
                      icon: Fingerprint,
                      title: 'Biometric Authentication',
                      description: 'Support for fingerprint and face recognition on compatible devices',
                      status: 'available',
                      color: 'text-blue-400'
                    },
                    {
                      icon: Lock,
                      title: 'Secure Session Management',
                      description: 'JWT tokens with automatic expiration and refresh mechanisms',
                      status: 'active',
                      color: 'text-green-400'
                    }
                  ].map((feature, index) => (
                    <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-start space-x-4">
                        <feature.icon className={`h-6 w-6 ${feature.color} flex-shrink-0 mt-1`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-white font-semibold">{feature.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              feature.status === 'active'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-blue-500/20 text-blue-400'
                            }`}>
                              {feature.status === 'active' ? 'Active' : 'Available'}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Recommendations */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <AlertTriangle className="h-6 w-6 text-yellow-400" />
                  <h2 className="text-2xl font-semibold text-white">Security Recommendations</h2>
                </div>

                <div className="space-y-4">
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-white font-medium mb-2">Enable Two-Factor Authentication</h3>
                        <p className="text-gray-400 text-sm mb-3">
                          Add an extra layer of security to your account with 2FA
                        </p>
                        <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          Enable 2FA
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-700/30 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-white font-medium mb-1">Strong Password</h3>
                        <p className="text-gray-400 text-sm">
                          Your password meets all security requirements
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-700/30 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-white font-medium mb-1">Verified Email</h3>
                        <p className="text-gray-400 text-sm">
                          Your email address has been verified
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Sessions */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Eye className="h-6 w-6 text-purple-400" />
                  <h2 className="text-2xl font-semibold text-white">Active Sessions</h2>
                </div>

                <div className="space-y-3">
                  {[
                    { device: 'Chrome on macOS', location: 'San Francisco, CA', time: 'Active now', current: true },
                    { device: 'Safari on iPhone', location: 'San Francisco, CA', time: '2 hours ago', current: false },
                    { device: 'Firefox on Windows', location: 'New York, NY', time: '1 day ago', current: false }
                  ].map((session, index) => (
                    <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-white font-medium">{session.device}</h3>
                            {session.current && (
                              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm">{session.location}</p>
                          <p className="text-gray-500 text-xs mt-1">{session.time}</p>
                        </div>
                        {!session.current && (
                          <button className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
                            Revoke
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors">
                  Sign Out All Other Sessions
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default StorageSecurity;
