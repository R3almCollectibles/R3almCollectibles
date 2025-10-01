import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: 'Information We Collect',
      icon: Database,
      content: `We collect information you provide directly to us, such as when you create an account, mint NFTs, or contact us for support. This includes your email address, username, wallet address, and any content you upload to the platform.`
    },
    {
      title: 'How We Use Your Information',
      icon: Eye,
      content: `We use the information we collect to provide, maintain, and improve our services, process transactions, communicate with you, and ensure platform security. We may also use your information to personalize your experience and provide relevant content.`
    },
    {
      title: 'Information Sharing',
      icon: Shield,
      content: `We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with service providers who assist us in operating our platform, conducting business, or serving users.`
    },
    {
      title: 'Data Security',
      icon: Lock,
      content: `We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`
    }
  ];

  const dataTypes = [
    {
      category: 'Account Information',
      items: ['Email address', 'Username', 'Profile picture', 'Account preferences']
    },
    {
      category: 'Blockchain Data',
      items: ['Wallet addresses', 'Transaction history', 'NFT ownership records', 'Smart contract interactions']
    },
    {
      category: 'Platform Usage',
      items: ['Pages visited', 'Features used', 'Time spent on platform', 'Device information']
    },
    {
      category: 'Communication Data',
      items: ['Support messages', 'Email communications', 'Feedback and reviews', 'Community interactions']
    }
  ];

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="h-8 w-8 text-green-400" />
            <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Last updated: January 15, 2025
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Our Commitment to Privacy</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            At R3alm Collectibles, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
          </p>
          <p className="text-gray-300 leading-relaxed">
            By using R3alm Collectibles, you consent to the data practices described in this policy. 
            We encourage you to review this policy periodically as we may update it from time to time.
          </p>
        </motion.div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-600/20 rounded-lg p-2">
                  <section.icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">{section.title}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Data Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Types of Data We Collect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataTypes.map((dataType, index) => (
              <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">{dataType.category}</h4>
                <ul className="space-y-2">
                  {dataType.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-300 text-sm flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Your Rights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Your Privacy Rights</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h4 className="text-white font-medium mb-1">Access and Portability</h4>
                <p className="text-gray-300 text-sm">You have the right to access and receive a copy of your personal data.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h4 className="text-white font-medium mb-1">Correction</h4>
                <p className="text-gray-300 text-sm">You can update or correct your personal information through your account settings.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h4 className="text-white font-medium mb-1">Deletion</h4>
                <p className="text-gray-300 text-sm">You may request deletion of your personal data, subject to certain limitations.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h4 className="text-white font-medium mb-1">Opt-out</h4>
                <p className="text-gray-300 text-sm">You can opt-out of certain communications and data processing activities.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center bg-gray-800 rounded-xl p-8 border border-gray-700"
        >
          <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Questions About Privacy?</h3>
          <p className="text-gray-400 mb-6">
            If you have any questions about this Privacy Policy or our data practices, please contact us.
          </p>
          <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all">
            Contact Privacy Team
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;