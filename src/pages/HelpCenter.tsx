import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  HelpCircle, 
  Book, 
  MessageCircle, 
  Shield,
  Wallet,
  Zap,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const categories = [
    {
      title: 'Getting Started',
      icon: Book,
      color: 'from-blue-500 to-cyan-500',
      articles: 12
    },
    {
      title: 'Buying & Selling',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      articles: 8
    },
    {
      title: 'Wallet & Security',
      icon: Shield,
      color: 'from-emerald-500 to-teal-500',
      articles: 6
    },
    {
      title: 'NFT Creation',
      icon: Wallet,
      color: 'from-orange-500 to-red-500',
      articles: 10
    }
  ];

  const faqs = [
    {
      question: 'How do I create my first NFT collectible?',
      answer: 'To create your first NFT, navigate to the "Mint NFT" page, upload your digital asset, fill in the details including name, description, and pricing, then click "Create NFT Collectible". The process typically takes a few minutes and requires a small gas fee.'
    },
    {
      question: 'What is fractional ownership and how does it work?',
      answer: 'Fractional ownership allows multiple people to own shares of a single high-value collectible. When you mint an NFT, you can divide it into multiple shares (e.g., 100 shares). Buyers can then purchase individual shares, making expensive collectibles more accessible.'
    },
    {
      question: 'How are collectibles authenticated on the platform?',
      answer: 'All collectibles undergo a rigorous verification process including provenance research, expert authentication, and blockchain recording. Verified items receive a green checkmark and have their authentication history permanently stored on the blockchain.'
    },
    {
      question: 'What fees are associated with trading?',
      answer: 'Platform fees are 2.5% on all sales. Additionally, there are blockchain gas fees for minting and trading. Creators can set royalties up to 10% for future sales of their NFTs.'
    },
    {
      question: 'How do I connect my wallet?',
      answer: 'Click the "Sign In" button in the header and either create an account or try one of our demo accounts. For production use, you would connect popular wallets like MetaMask, WalletConnect, or Coinbase Wallet.'
    },
    {
      question: 'Can I sell my fractional shares?',
      answer: 'Yes! Fractional shares can be traded on our integrated secondary market. You can list your shares for sale at any time, and other users can purchase them instantly at market prices.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Help Center</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Find answers to common questions and learn how to make the most of R3alm Collectibles
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {categories.map((category, index) => (
            <div
              key={category.title}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">{category.title}</h3>
              <p className="text-gray-400 text-sm">{category.articles} articles</p>
            </div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-700/50 transition-colors"
                >
                  <span className="text-white font-medium">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 bg-gray-800 rounded-xl p-8 border border-gray-700"
        >
          <MessageCircle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Still need help?</h3>
          <p className="text-gray-400 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all">
            Contact Support
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpCenter;