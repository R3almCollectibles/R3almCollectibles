import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Zap,
} from 'lucide-react';

interface StorageItem {
  label: string;
  size: string;
  percentage: number;
  color: string;
}

interface SecurityFeature {
  icon: React.ElementType;
  title: string;
  description: string;
  status: 'active' | 'available';
  color: string;
}

interface Session {
  device: string;
  location: string;
  time: string;
  current: boolean;
}

const StorageSecurity: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'storage' | 'security'>('storage');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Shield className="h-16 w-16 text-gray-400 mx-auto mb-6" aria-hidden="true" />
          <h2 className="text-3xl font-bold text-white mb-3">Sign In Required</h2>
          <p className="text-gray-400 text-lg max-w-md">
            Please sign in to access your storage and security details
          </p>
        </motion.div>
      </div>
    );
  }

  const storageItems: StorageItem[] = [
    { label: 'NFT Images', size: '8.2 GB', percentage: 66, color: 'from-blue-500 to-blue-600' },
    { label: 'Metadata', size: '2.1 GB', percentage: 17, color: 'from-purple-500 to-purple-600' },
    { label: 'Transaction Records', size: '1.8 GB', percentage: 14, color: 'from-emerald-500 to-emerald-600' },
    { label: 'Other Data', size: '0.3 GB', percentage: 3, color: 'from-orange-500 to-orange-600' },
  ];

  const securityFeatures: SecurityFeature[] = [
    {
      icon: ShieldCheck,
      title: 'End-to-End Encryption',
      description: 'All data is encrypted in transit and at rest using AES-256 encryption',
      status: 'active',
      color: 'text-green-400',
    },
    {
      icon: Key,
      title: 'Row Level Security (RLS)',
      description: 'Database policies ensure you can only access your own data',
      status: 'active',
      color: 'text-green-400',
    },
    {
      icon: Fingerprint,
      title: 'Biometric Authentication',
      description: 'Support for fingerprint and face recognition on compatible devices',
      status: 'available',
      color: 'text-blue-400',
    },
    {
      icon: Lock,
      title: 'Secure Session Management',
      description: 'JWT tokens with automatic expiration and refresh mechanisms',
      status: 'active',
      color: 'text-green-400',
    },
  ];

  const sessions: Session[] = [
    { device: 'Chrome on macOS', location: 'San Francisco, CA', time: 'Active now', current: true },
    { device: 'Safari on iPhone', location: 'San Francisco, CA', time: '2 hours ago', current: false },
    { device: 'Firefox on Windows', location: 'New York, NY', time: '1 day ago', current: false },
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Storage & Security</h1>
          <p className="text-gray-400 text-lg max-w-3xl">
            Comprehensive overview of your data storage usage and advanced security protections
          </p>
        </motion.header>

        {/* Tabs */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
          role="tablist"
          aria-label="Storage and Security Tabs"
        >
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-2 inline-flex flex-wrap gap-2">
            {(['storage', 'security'] as const).map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                aria-controls={`${tab}-panel`}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center space-x-3 px-6 py-3.5 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {tab === 'storage' ? <HardDrive className="h-5 w-5" /> : <Shield className="h-5 w-5" />}
                <span>{tab === 'storage' ? 'Storage Details' : 'Security Details'}</span>
              </button>
            ))}
          </div>
        </motion.nav>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            id={`${activeTab}-panel`}
            role="tabpanel"
            aria-labelledby={`${activeTab}-tab`}
          >
            {activeTab === 'storage' && (
              <div className="space-y-8">
                {/* Storage Overview */}
                <section className="bg-gray-800 rounded-2xl border border-gray-700 p-6 md:p-8">
                  <header className="flex items-center space-x-3 mb-8">
                    <Database className="h-7 w-7 text-blue-400" aria-hidden="true" />
                    <h2 className="text-2xl md:text-3xl font-semibold text-white">Storage Overview</h2>
                  </header>

                  {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-700/50 rounded-xl p-6 animate-pulse">
                          <div className="h-6 bg-gray-600 rounded w-32 mb-4"></div>
                          <div className="h-10 bg-gray-600 rounded w-20"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {[
                          { label: 'Total Storage', value: '50 GB', icon: HardDrive, color: 'text-blue-400' },
                          { label: 'Used Storage', value: '12.4 GB', sub: '24.8% utilized', icon: Activity, color: 'text-purple-400' },
                          { label: 'Available', value: '37.6 GB', sub: '75.2% free', icon: Zap, color: 'text-green-400' },
                        ].map((stat, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-gray-700/50 rounded-xl p-6 border border-gray-600/50"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-gray-400 text-sm font-medium">{stat.label}</span>
                              <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <p className="text-3xl font-bold text-white">{stat.value}</p>
                            {stat.sub && <p className="text-sm text-gray-400 mt-1">{stat.sub}</p>}
                          </motion.div>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Storage Usage</span>
                          <span className="text-gray-300 font-medium">24.8%</span>
                        </div>
                        <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '24.8%' }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </section>

                {/* Storage Breakdown */}
                <section className="bg-gray-800 rounded-2xl border border-gray-700 p-6 md:p-8">
                  <header className="flex items-center space-x-3 mb-8">
                    <FileText className="h-7 w-7 text-purple-400" />
                    <h2 className="text-2xl md:text-3xl font-semibold text-white">Storage Breakdown</h2>
                  </header>
                  <div className="space-y-6">
                    {storageItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-medium">{item.label}</span>
                          <span className="text-gray-400 text-sm">{item.size}</span>
                        </div>
                        <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`h-full bg-gradient-to-r ${item.color}`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* Database Information */}
                <section className="bg-gray-800 rounded-2xl border border-gray-700 p-6 md:p-8">
                  <header className="flex items-center space-x-3 mb-8">
                    <Server className="h-7 w-7 text-emerald-400" />
                    <h2 className="text-2xl md:text-3xl font-semibold text-white">Database Information</h2>
                  </header>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {['Supabase Backend', 'Auto Backups', 'High Availability'].map((title, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start space-x-4"
                        >
                          <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="text-white font-semibold mb-1">{title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {title === 'Supabase Backend' && 'Your data is stored securely using Supabase, a reliable PostgreSQL database solution'}
                              {title === 'Auto Backups' && 'Daily automated backups ensure your data is never lost'}
                              {title === 'High Availability' && '99.9% uptime guarantee with redundant infrastructure'}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="space-y-6">
                      <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600/50">
                        <div className="flex items-center space-x-3 mb-3">
                          <Clock className="h-6 w-6 text-blue-400" />
                          <span className="text-white font-semibold">Last Backup</span>
                        </div>
                        <p className="text-gray-300 text-lg">Today at 3:00 AM UTC</p>
                        <p className="text-sm text-gray-400">Next backup in ~21 hours</p>
                      </div>
                      <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600/50">
                        <div className="flex items-center space-x-3 mb-3">
                          <Activity className="h-6 w-6 text-purple-400" />
                          <span className="text-white font-semibold">Database Status</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400 font-semibold">Operational</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">All systems running normally</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8">
                {/* Security Overview */}
                <SecurityOverview />
                {/* Security Features */}
                <SecurityFeatures features={securityFeatures} />
                {/* Security Recommendations */}
                <SecurityRecommendations />
                {/* Active Sessions */}
                <ActiveSessions sessions={sessions} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// Memoized subcomponents for performance
const SecurityOverview = memo(() => (
  <section className="bg-gray-800 rounded-2xl border border-gray-700 p-6 md:p-8">
    <header className="flex items-center space-x-3 mb-8">
      <ShieldCheck className="h-8 w-8 text-green-400" />
      <h2 className="text-2xl md:text-3xl font-semibold text-white">Security Overview</h2>
    </header>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { score: '95/100', label: 'Security Score', icon: CheckCircle, color: 'green' },
        { value: 'Yes', label: '2FA Enabled', icon: Lock, color: 'blue' },
        { value: '3', label: 'Active Sessions', icon: Eye, color: 'purple' },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className={`bg-${item.color}-500/10 border border-${item.color}-500/30 rounded-xl p-6`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-300 text-sm font-medium">{item.label}</span>
            <item.icon className={`h-6 w-6 text-${item.color}-400`} />
          </div>
          <p className={`text-4xl font-bold text-${item.color}-400`}>
            {item.score || item.value}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {item.score ? 'Excellent security' : item.value === 'Yes' ? 'Extra protection active' : 'Devices logged in'}
          </p>
        </motion.div>
      ))}
    </div>
  </section>
));

const SecurityFeatures = memo(({ features }: { features: SecurityFeature[] }) => (
  <section className="bg-gray-800 rounded-2xl border border-gray-700 p-6 md:p-8">
    <header className="flex items-center space-x-3 mb-8">
      <Lock className="h-8 w-8 text-blue-400" />
      <h2 className="text-2xl md:text-3xl font-semibold text-white">Security Features</h2>
    </header>
    <div className="space-y-6">
      {features.map((feature, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/50"
        >
          <div className="flex items-start space-x-5">
            <feature.icon className={`h-8 w-8 ${feature.color} flex-shrink-0 mt-1`} />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    feature.status === 'active'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}
                >
                  {feature.status === 'active' ? 'Active' : 'Available'}
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
));

const SecurityRecommendations = memo(() => (
  <section className="bg-gray-800 rounded-2xl border border-gray-700 p-6 md:p-8">
    <header className="flex items-center space-x-3 mb-8">
      <AlertTriangle className="h-8 w-8 text-yellow-400" />
      <h2 className="text-2xl md:text-3xl font-semibold text-white">Security Recommendations</h2>
    </header>
    <div className="space-y-6">
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <AlertTriangle className="h-7 w-7 text-yellow-400 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-3">Enable Two-Factor Authentication</h3>
            <p className="text-gray-400 mb-5">Add an extra layer of security to your account with 2FA</p>
            <button className="bg-yellow-600 hover:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-500 text-white px-6 py-3 rounded-lg font-medium transition-all">
              Enable 2FA Now
            </button>
          </div>
        </div>
      </div>
      {['Strong Password', 'Verified Email'].map((item, i) => (
        <div key={i} className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/50 flex items-start space-x-4">
          <CheckCircle className="h-7 w-7 text-green-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-semibold text-white">{item}</h3>
            <p className="text-gray-400">
              {item === 'Strong Password' ? 'Your password meets all security requirements' : 'Your email address has been verified'}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
));

const ActiveSessions = memo(({ sessions }: { sessions: Session[] }) => (
  <section className="bg-gray-800 rounded-2xl border border-gray-700 p-6 md:p-8">
    <header className="flex items-center space-x-3 mb-8">
      <Eye className="h-8 w-8 text-purple-400" />
      <h2 className="text-2xl md:text-3xl font-semibold text-white">Active Sessions</h2>
    </header>
    <div className="space-y-5">
      {sessions.map((session, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/50"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-semibold text-white">{session.device}</h3>
                {session.current && (
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
                    Current Session
                  </span>
                )}
              </div>
              <p className="text-gray-400">{session.location}</p>
              <p className="text-sm text-gray-500 mt-1">{session.time}</p>
            </div>
            {!session.current && (
              <button className="text-red-400 hover:text-red-300 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg px-4 py-2">
                Revoke
              </button>
            )}
          </div>
        </motion.div>
      ))}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-6 bg-red-600 hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-500 text-white py-4 rounded-xl font-semibold text-lg transition-all"
      >
        Sign Out All Other Sessions
      </motion.button>
    </div>
  </section>
));

SecurityOverview.displayName = 'SecurityOverview';
SecurityFeatures.displayName = 'SecurityFeatures';
SecurityRecommendations.displayName = 'SecurityRecommendations';
ActiveSessions.displayName = 'ActiveSessions';

export default React.memo(StorageSecurity);