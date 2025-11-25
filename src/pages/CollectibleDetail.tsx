import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Shield, 
  TrendingUp, 
  Users, 
  Clock,
  CheckCircle,
  Eye,
  ExternalLink,
  Calendar,
  ArrowRight,
  X,
  FileText,
  Download
} from 'lucide-react';

const CollectibleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [shareAmount, setShareAmount] = useState(1);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);

  // Mock data - dynamically select based on ID
  const collectibles = [
    {
      id: 1,
      name: 'Vintage Gibson Les Paul 1959',
      description: 'An exceptional example of the legendary 1959 Gibson Les Paul Standard in stunning sunburst finish. This guitar represents the pinnacle of Gibson\'s craftsmanship and is highly sought after by collectors and musicians alike.',
      fullDescription: `This 1959 Gibson Les Paul Standard is a true holy grail of electric guitars. Featuring the coveted flame maple cap over mahogany body, this instrument showcases the perfect combination of tonal excellence and visual beauty that made these guitars legendary.

The guitar has been meticulously maintained and shows minimal play wear, with all original hardware intact including the original PAF humbucking pickups, which are renowned for their warm, singing tone. The neck profile is the classic '59 rounded shape that feels incredibly comfortable in the hands.

This particular instrument has an exceptional flame maple top that displays stunning chatoyancy under different lighting conditions. The original sunburst finish has aged beautifully, developing the characteristic checking that vintage enthusiasts prize.`,
      price: '2.5 ETH',
      fractionalPrice: '0.025 ETH',
      fractional: '1/100',
      totalShares: 100,
      availableShares: 47,
      category: 'Music Instruments',
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=800',
      verified: true,
      trending: true,
      likes: 147,
      views: '2.1k',
      owner: '0x742d35Cc6634C0532925a3b8D46DE3C4',
      mintDate: '2024-01-15',
      blockchain: 'Ethereum',
      tokenStandard: 'ERC-721',
      royalties: '2.5%',
      provenance: [
        {
          date: '2024-01-15',
          event: 'Minted on R3alm Collectibles',
          address: '0x742d35Cc6634C0532925a3b8D46DE3C4'
        },
        {
          date: '2023-12-10',
          event: 'Physical verification completed',
          address: 'Certified Appraiser'
        },
        {
          date: '2023-11-28',
          event: 'Acquired from private collection',
          address: 'Previous Owner'
        }
      ],
      attributes: [
        { trait_type: 'Year', value: '1959' },
        { trait_type: 'Brand', value: 'Gibson' },
        { trait_type: 'Model', value: 'Les Paul Standard' },
        { trait_type: 'Finish', value: 'Sunburst' },
        { trait_type: 'Condition', value: 'Excellent' },
        { trait_type: 'Rarity', value: 'Extremely Rare' }
      ],
      storage: {
        location: 'Climate-Controlled Private Vault',
        facility: 'SecureVault Manhattan',
        address: 'New York, NY, USA',
        securityLevel: 'Level 5 - Maximum Security',
        climateControl: 'Temperature: 68-72°F, Humidity: 45-55%',
        accessProtocol: '24/7 Biometric Access Control'
      },
      insurance: {
        provider: 'Lloyd\'s of London',
        policyNumber: 'LLO-2024-MUS-001847',
        coverage: '$150,000 USD',
        type: 'Fine Arts & Collectibles Policy',
        validUntil: '2025-01-15',
        deductible: '$2,500 USD'
      }
    },
    {
      id: 2,
      name: 'Monet Water Lilies Study',
      description: 'Authenticated 1919 oil on canvas, museum quality piece from Claude Monet\'s famous Water Lilies series.',
      fullDescription: `This exquisite Water Lilies study represents one of Claude Monet's most celebrated series, painted during his later years at Giverny. The piece showcases Monet's revolutionary approach to capturing light and atmosphere through his distinctive impressionist technique.

The painting features the characteristic loose brushwork and vibrant color palette that made Monet a master of the Impressionist movement. The interplay of light on water is rendered with exceptional skill, creating a sense of movement and tranquility that has captivated viewers for over a century.

This particular study has been authenticated by leading art historians and has a complete provenance dating back to the artist's studio. The work has been professionally conserved and is in excellent condition for its age.`,
      price: '5.2 ETH',
      fractionalPrice: '0.021 ETH',
      fractional: '1/250',
      totalShares: 250,
      availableShares: 123,
      category: 'Art & Paintings',
      image: 'https://images.pexels.com/photos/1070527/pexels-photo-1070527.jpeg?auto=compress&cs=tinysrgb&w=800',
      verified: true,
      trending: false,
      likes: 523,
      views: '8.7k',
      owner: '0x891a2b3c4d5e6f7g8h9i0j1k2l3m4n5o',
      mintDate: '2024-01-20',
      blockchain: 'Ethereum',
      tokenStandard: 'ERC-721',
      royalties: '3.0%',
      provenance: [
        {
          date: '2024-01-20',
          event: 'Minted on R3alm Collectibles',
          address: '0x891a2b3c4d5e6f7g8h9i0j1k2l3m4n5o'
        },
        {
          date: '2024-01-18',
          event: 'Museum authentication completed',
          address: 'Metropolitan Museum of Art'
        },
        {
          date: '2024-01-10',
          event: 'Acquired from auction house',
          address: 'Sotheby\'s New York'
        }
      ],
      attributes: [
        { trait_type: 'Artist', value: 'Claude Monet' },
        { trait_type: 'Year', value: '1919' },
        { trait_type: 'Medium', value: 'Oil on Canvas' },
        { trait_type: 'Dimensions', value: '73 x 92 cm' },
        { trait_type: 'Condition', value: 'Excellent' },
        { trait_type: 'Provenance', value: 'Complete since 1919' }
      ],
      storage: {
        location: 'Museum-Grade Conservation Facility',
        facility: 'Metropolitan Art Storage',
        address: 'Long Island City, NY, USA',
        securityLevel: 'Museum Standard Security',
        climateControl: 'Temperature: 65-70°F, Humidity: 50-55%, UV Filtered',
        accessProtocol: 'Curator-Supervised Access Only'
      },
      insurance: {
        provider: 'AXA Art Insurance',
        policyNumber: 'AXA-2024-ART-002156',
        coverage: '$650,000 USD',
        type: 'Fine Arts Insurance Policy',
        validUntil: '2025-02-20',
        deductible: '$10,000 USD'
      }
    },
    {
      id: 3,
      name: 'Jordan Game-Worn Jersey 1996',
      description: 'NBA Finals worn jersey from Michael Jordan\'s legendary 1996 championship season with the Chicago Bulls.',
      fullDescription: `This authentic Michael Jordan jersey was worn during the 1996 NBA Finals, one of the most iconic championship series in basketball history. The Bulls defeated the Seattle SuperSonics 4-2, with Jordan earning his fourth NBA Finals MVP award.

The jersey shows authentic game wear including sweat stains, loose threads, and the characteristic wear patterns consistent with Jordan's playing style. It has been authenticated by multiple sports memorabilia experts and comes with a certificate of authenticity from the NBA.

This particular jersey was worn during Game 4 of the Finals, where Jordan scored 26 points and grabbed 9 rebounds in a crucial victory. The jersey represents not just a piece of sports history, but a symbol of excellence and determination that defined Jordan's legendary career.`,
      price: '1.8 ETH',
      fractionalPrice: '0.036 ETH',
      fractional: '1/50',
      totalShares: 50,
      availableShares: 23,
      category: 'Sports Memorabilia',
      image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800',
      verified: true,
      trending: true,
      likes: 891,
      views: '12.3k',
      owner: '0x234b5c6d7e8f9g0h1i2j3k4l5m6n7o8p',
      mintDate: '2024-01-25',
      blockchain: 'Ethereum',
      tokenStandard: 'ERC-721',
      royalties: '2.5%',
      provenance: [
        {
          date: '2024-01-25',
          event: 'Minted on R3alm Collectibles',
          address: '0x234b5c6d7e8f9g0h1i2j3k4l5m6n7o8p'
        },
        {
          date: '2024-01-22',
          event: 'NBA authentication completed',
          address: 'NBA Authentication Program'
        },
        {
          date: '2024-01-15',
          event: 'Acquired from private collector',
          address: 'Sports Memorabilia Specialist'
        }
      ],
      attributes: [
        { trait_type: 'Player', value: 'Michael Jordan' },
        { trait_type: 'Team', value: 'Chicago Bulls' },
        { trait_type: 'Season', value: '1995-96' },
        { trait_type: 'Game', value: 'NBA Finals Game 4' },
        { trait_type: 'Size', value: '44' },
        { trait_type: 'Condition', value: 'Game Worn' }
      ],
      storage: {
        location: 'Sports Memorabilia Vault',
        facility: 'Heritage Sports Vault',
        address: 'Chicago, IL, USA',
        securityLevel: 'High Security Sports Facility',
        climateControl: 'Temperature: 65-70°F, Humidity: 40-50%',
        accessProtocol: 'Authenticated Collector Access'
      },
      insurance: {
        provider: 'Collectibles Insurance Services',
        policyNumber: 'CIS-2024-SPT-003892',
        coverage: '$225,000 USD',
        type: 'Sports Memorabilia Policy',
        validUntil: '2025-01-25',
        deductible: '$5,000 USD'
      }
    }
  ];

  // Find the collectible by ID, fallback to first item if not found
  const collectible = collectibles.find(item => item.id === parseInt(id || '1')) || collectibles[0];

  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'provenance', label: 'Provenance' },
    { id: 'attributes', label: 'Attributes' },
    { id: 'activity', label: 'Activity' }
  ];

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/marketplace"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Marketplace</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-800">
              <img
                src={collectible.image}
                alt={collectible.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex space-x-2">
                {collectible.trending && (
                  <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Trending
                  </div>
                )}
                {collectible.verified && (
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Shield className="h-4 w-4 mr-1" />
                    Verified
                  </div>
                )}
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="bg-gray-900/80 hover:bg-red-600 text-white p-2 rounded-full transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="bg-gray-900/80 hover:bg-gray-700 text-white p-2 rounded-full transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                <div className="text-2xl font-bold text-white">{collectible.likes}</div>
                <div className="text-gray-400 text-sm">Likes</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                <div className="text-2xl font-bold text-white">{collectible.views}</div>
                <div className="text-gray-400 text-sm">Views</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
                <div className="text-2xl font-bold text-white">{collectible.availableShares}</div>
                <div className="text-gray-400 text-sm">Available</div>
              </div>
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-blue-400 text-sm font-medium">{collectible.category}</span>
                {collectible.verified && (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                )}
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">{collectible.name}</h1>
              <p className="text-gray-300 leading-relaxed">{collectible.description}</p>
            </div>

            {/* Pricing */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="text-gray-400 text-sm mb-1">Full Price</div>
                  <div className="text-2xl font-bold text-white">{collectible.price}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Per Share ({collectible.fractional})</div>
                  <div className="text-2xl font-bold text-blue-400">{collectible.fractionalPrice}</div>
                </div>
              </div>

              {/* Share Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-white font-medium">Number of Shares</label>
                  <span className="text-gray-400 text-sm">
                    {collectible.availableShares} of {collectible.totalShares} available
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="1"
                    max={collectible.availableShares}
                    value={shareAmount}
                    onChange={(e) => setShareAmount(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <input
                    type="number"
                    min="1"
                    max={collectible.availableShares}
                    value={shareAmount}
                    onChange={(e) => setShareAmount(parseInt(e.target.value))}
                    className="w-20 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Total */}
              <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Cost</span>
                  <span className="text-2xl font-bold text-white">
                    {(parseFloat(collectible.fractionalPrice) * shareAmount).toFixed(3)} ETH
                  </span>
                </div>
              </div>

              {/* Buy Button */}
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-lg font-semibold transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2">
                <span>Purchase {shareAmount} Share{shareAmount > 1 ? 's' : ''}</span>
              </button>
            </div>

            {/* Blockchain Info */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-white font-semibold mb-4">Blockchain Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Blockchain</span>
                  <span className="text-white">{collectible.blockchain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Token Standard</span>
                  <span className="text-white">{collectible.tokenStandard}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Mint Date</span>
                  <span className="text-white">{collectible.mintDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Creator Royalties</span>
                  <span className="text-white">{collectible.royalties}</span>
                </div>
              </div>
            </div>

            {/* Storage Information */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-white font-semibold mb-4">Storage & Security</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Storage Type</span>
                  <span className="text-white">{collectible.storage.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Facility</span>
                  <span className="text-white">{collectible.storage.facility}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location</span>
                  <span className="text-white">{collectible.storage.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Security Level</span>
                  <span className="text-green-400">{collectible.storage.securityLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Climate Control</span>
                  <span className="text-blue-300 text-sm">{collectible.storage.climateControl}</span>
                </div>
              </div>
            </div>

            {/* Insurance Information */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-white font-semibold mb-4">Insurance Coverage</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Provider</span>
                  <span className="text-white">{collectible.insurance.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Coverage Amount</span>
                  <span className="text-green-400 font-semibold">{collectible.insurance.coverage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Policy Type</span>
                  <span className="text-white">{collectible.insurance.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Valid Until</span>
                  <span className="text-white">{collectible.insurance.validUntil}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Deductible</span>
                  <span className="text-white">{collectible.insurance.deductible}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Policy Number</span>
                  <span className="text-blue-300 font-mono text-sm">{collectible.insurance.policyNumber}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <button 
                  onClick={() => setShowInsuranceModal(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Show Insurance Policy</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          {/* Tab Navigation */}
          <div className="border-b border-gray-700 mb-8">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            {activeTab === 'details' && (
              <div className="prose prose-gray max-w-none">
                <h3 className="text-xl font-semibold text-white mb-4">About This Collectible</h3>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {collectible.fullDescription}
                </div>
              </div>
            )}

            {activeTab === 'provenance' && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">Ownership History</h3>
                <div className="space-y-4">
                  {collectible.provenance.map((item, index) => (
                    <div 
                      key={index} 
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        navigate(`/collectible/${id}/activity/${activity.id}`);
                      }}
                      className="flex items-start space-x-4 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer group"
                    >
                      <div className="bg-blue-600 rounded-full p-2 flex-shrink-0">
                        <Calendar className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-white font-medium group-hover:text-blue-300 transition-colors">{item.event}</h4>
                          <span className="text-gray-400 text-sm">{item.date}</span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">{item.address}</p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'attributes' && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">Collectible Attributes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {collectible.attributes.map((attr, index) => (
                    <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                      <div className="text-gray-400 text-sm mb-1">{attr.trait_type}</div>
                      <div className="text-white font-medium">{attr.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { id: 0, event: 'Listed for Sale', price: '2.5 ETH', user: '0x742d...C532', time: '2 hours ago' },
                    { id: 1, event: 'Share Purchase', price: '0.025 ETH', user: '0x891a...D421', time: '1 day ago' },
                    { id: 2, event: 'Share Purchase', price: '0.025 ETH', user: '0x234b...E892', time: '3 days ago' },
                    { id: 3, event: 'Minted', price: '—', user: '0x742d...C532', time: '1 week ago' }
                  ].map((activity, index) => (
                    <div 
                      key={index} 
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        navigate(`/collectible/${id}/activity/${activity.id}`);
                      }}
                      className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-purple-600 rounded-full p-2">
                          <Clock className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-medium group-hover:text-blue-300 transition-colors">{activity.event}</div>
                          <div className="text-gray-400 text-sm">by {activity.user}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">{activity.price}</div>
                        <div className="text-gray-400 text-sm">{activity.time}</div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                        <ArrowRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Insurance Policy Modal */}
        <AnimatePresence>
          {showInsuranceModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setShowInsuranceModal(false)}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-600/20 rounded-lg p-2">
                      <FileText className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Insurance Policy</h2>
                      <p className="text-gray-400">{collectible.name}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowInsuranceModal(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  <div className="space-y-8">
                    {/* Policy Overview */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                      <h3 className="text-xl font-semibold text-white mb-4">Policy Overview</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="text-gray-400 text-sm">Policy Number</label>
                            <div className="text-white font-mono text-lg">{collectible.insurance.policyNumber}</div>
                          </div>
                          <div>
                            <label className="text-gray-400 text-sm">Insurance Provider</label>
                            <div className="text-white font-semibold text-lg">{collectible.insurance.provider}</div>
                          </div>
                          <div>
                            <label className="text-gray-400 text-sm">Policy Type</label>
                            <div className="text-white">{collectible.insurance.type}</div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="text-gray-400 text-sm">Coverage Amount</label>
                            <div className="text-green-400 font-bold text-2xl">{collectible.insurance.coverage}</div>
                          </div>
                          <div>
                            <label className="text-gray-400 text-sm">Policy Period</label>
                            <div className="text-white">Valid until {collectible.insurance.validUntil}</div>
                          </div>
                          <div>
                            <label className="text-gray-400 text-sm">Deductible</label>
                            <div className="text-white">{collectible.insurance.deductible}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Coverage Details */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                      <h3 className="text-xl font-semibold text-white mb-4">Coverage Details</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-white font-medium mb-2">Covered Perils</h4>
                            <ul className="space-y-1 text-gray-300 text-sm">
                              <li>• Fire and smoke damage</li>
                              <li>• Theft and burglary</li>
                              <li>• Water damage (accidental)</li>
                              <li>• Natural disasters</li>
                              <li>• Transit damage</li>
                              <li>• Vandalism and malicious damage</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-white font-medium mb-2">Additional Benefits</h4>
                            <ul className="space-y-1 text-gray-300 text-sm">
                              <li>• Professional restoration coverage</li>
                              <li>• Emergency conservation services</li>
                              <li>• Worldwide coverage</li>
                              <li>• No depreciation clause</li>
                              <li>• Agreed value coverage</li>
                              <li>• Expert appraisal services</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                      <h3 className="text-xl font-semibold text-white mb-4">Key Terms & Conditions</h3>
                      <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                        <div>
                          <h4 className="text-white font-medium mb-2">1. Insured Property</h4>
                          <p>This policy covers the collectible item "{collectible.name}" as described in the attached appraisal report and photographic documentation.</p>
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-2">2. Valuation Basis</h4>
                          <p>Coverage is provided on an "agreed value" basis as determined by professional appraisal. The insured value reflects current market conditions and comparable sales data.</p>
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-2">3. Storage Requirements</h4>
                          <p>The insured item must be stored in the approved facility: {collectible.storage.facility}, {collectible.storage.address}, with appropriate climate control and security measures.</p>
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-2">4. Claims Process</h4>
                          <p>In the event of a loss, notify the insurer within 48 hours. All claims require professional assessment and documentation of the loss or damage.</p>
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-2">5. Policy Renewal</h4>
                          <p>This policy is subject to annual renewal with updated appraisal values. Premium adjustments may apply based on current market conditions.</p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                      <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-white font-medium mb-2">Claims Department</h4>
                          <div className="space-y-1 text-gray-300 text-sm">
                            <p>Phone: +1 (800) 555-CLAIM</p>
                            <p>Email: claims@{collectible.insurance.provider.toLowerCase().replace(/[^a-z]/g, '')}.com</p>
                            <p>Available 24/7 for emergency claims</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-2">Policy Services</h4>
                          <div className="space-y-1 text-gray-300 text-sm">
                            <p>Phone: +1 (800) 555-POLICY</p>
                            <p>Email: service@{collectible.insurance.provider.toLowerCase().replace(/[^a-z]/g, '')}.com</p>
                            <p>Business hours: Mon-Fri 9AM-6PM EST</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-700">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                      <Download className="h-5 w-5" />
                      <span>Download Policy PDF</span>
                    </button>
                    <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                      Contact Claims Department
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CollectibleDetail;