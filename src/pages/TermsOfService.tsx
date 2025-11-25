import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, AlertTriangle } from 'lucide-react';

const TermsOfService = () => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing and using R3alm Collectibles ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      title: '2. Platform Description',
      content: `R3alm Collectibles is a blockchain-based platform that enables users to mint, buy, sell, and trade authenticated collectibles as Non-Fungible Tokens (NFTs). The platform supports fractional ownership, allowing multiple users to own shares of high-value collectibles.`
    },
    {
      title: '3. User Accounts and Responsibilities',
      content: `Users must provide accurate information when creating accounts. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Users must be at least 18 years old to use the platform.`
    },
    {
      title: '4. NFT Creation and Ownership',
      content: `When you mint an NFT on our platform, you retain ownership rights to the underlying digital asset. However, by minting, you grant R3alm Collectibles a non-exclusive license to display, distribute, and promote your NFT on the platform. You warrant that you own or have the necessary rights to the content you mint.`
    },
    {
      title: '5. Trading and Transactions',
      content: `All transactions on the platform are conducted using cryptocurrency and are recorded on the blockchain. Transactions are irreversible once confirmed. The platform charges a 2.5% fee on all sales. Users are responsible for any applicable taxes on their transactions.`
    },
    {
      title: '6. Fractional Ownership',
      content: `Fractional ownership allows multiple users to own shares of a single NFT. Share ownership is tracked on the blockchain and can be traded independently. Fractional owners have proportional rights to any proceeds from the sale of the underlying NFT.`
    },
    {
      title: '7. Authentication and Verification',
      content: `R3alm Collectibles employs various methods to authenticate collectibles, but we cannot guarantee the authenticity of all items. Verified items have undergone additional authentication processes, but users should conduct their own due diligence before purchasing.`
    },
    {
      title: '8. Prohibited Activities',
      content: `Users may not engage in fraudulent activities, money laundering, copyright infringement, or any illegal activities on the platform. We reserve the right to suspend or terminate accounts that violate these terms.`
    },
    {
      title: '9. Platform Fees',
      content: `The platform charges a 2.5% fee on all successful sales. Additional blockchain gas fees may apply for minting and trading activities. Fee structures may be updated with reasonable notice to users.`
    },
    {
      title: '10. Limitation of Liability',
      content: `R3alm Collectibles is provided "as is" without warranties of any kind. We are not liable for any losses resulting from the use of the platform, including but not limited to financial losses, data loss, or service interruptions.`
    },
    {
      title: '11. Privacy and Data Protection',
      content: `We collect and process user data in accordance with our Privacy Policy. By using the platform, you consent to the collection and use of your information as described in our Privacy Policy.`
    },
    {
      title: '12. Modifications to Terms',
      content: `We reserve the right to modify these terms at any time. Users will be notified of significant changes, and continued use of the platform constitutes acceptance of the modified terms.`
    },
    {
      title: '13. Governing Law',
      content: `These terms are governed by and construed in accordance with the laws of the jurisdiction in which R3alm Collectibles operates. Any disputes will be resolved through binding arbitration.`
    },
    {
      title: '14. Contact Information',
      content: `For questions about these Terms of Service, please contact us at legal@r3alm.com or through our support channels.`
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
            <FileText className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Last updated: January 15, 2025
          </p>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6 mb-8"
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-orange-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-orange-400 font-semibold mb-2">Important Notice</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Please read these Terms of Service carefully before using R3alm Collectibles. 
                By accessing or using our platform, you agree to be bound by these terms. 
                If you disagree with any part of these terms, you may not access the platform.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-gray-800 rounded-xl p-8 border border-gray-700"
            >
              <h2 className="text-xl font-semibold text-white mb-4">{section.title}</h2>
              <p className="text-gray-300 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 bg-gray-800 rounded-xl p-8 border border-gray-700"
        >
          <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Questions about our Terms?</h3>
          <p className="text-gray-400 mb-6">
            If you have any questions about these Terms of Service, please don't hesitate to contact us.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all">
            Contact Legal Team
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;