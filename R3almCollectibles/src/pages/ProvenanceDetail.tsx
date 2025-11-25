import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  User, 
  Shield, 
  ExternalLink,
  CheckCircle,
  Clock,
  FileText,
  Camera,
  Award
} from 'lucide-react';

const ProvenanceDetail = () => {
  const { id, eventId } = useParams();

  // Mock data - in real app, fetch based on eventId
  const provenanceEvent = {
    id: eventId,
    collectibleId: id,
    collectibleName: 'Vintage Gibson Les Paul 1959',
    collectibleImage: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-01-15',
    time: '14:32:18 UTC',
    event: 'Minted on R3alm Collectibles',
    eventType: 'mint',
    address: '0x742d35Cc6634C0532925a3b8D46DE3C4',
    transactionHash: '0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
    blockNumber: '18,945,672',
    gasUsed: '284,592',
    gasFee: '0.0045 ETH',
    location: 'New York, NY, USA',
    verificationMethod: 'Blockchain Authentication',
    certificationBody: 'R3alm Verification Network',
    description: 'Initial minting of the collectible NFT on the Ethereum blockchain. This event marks the creation of the digital certificate of authenticity and the beginning of the item\'s blockchain-recorded ownership history.',
    additionalDetails: {
      authenticator: 'Dr. Sarah Mitchell',
      authenticatorCredentials: 'Certified Musical Instrument Appraiser, 15+ years experience',
      appraisalValue: '$125,000 USD',
      condition: 'Excellent - Original finish with minimal wear',
      serialNumber: 'GLP-1959-0847',
      manufacturingDetails: 'Gibson USA, Kalamazoo Factory, 1959',
      previousOwner: 'Private Collector (Anonymous)',
      acquisitionMethod: 'Estate Sale Purchase'
    },
    documents: [
      { name: 'Certificate of Authenticity', type: 'PDF', verified: true },
      { name: 'Professional Appraisal Report', type: 'PDF', verified: true },
      { name: 'High-Resolution Photos', type: 'Images', verified: true },
      { name: 'Serial Number Verification', type: 'Document', verified: true }
    ],
    verificationSteps: [
      { step: 'Physical Inspection', status: 'completed', date: '2023-12-08' },
      { step: 'Serial Number Verification', status: 'completed', date: '2023-12-09' },
      { step: 'Expert Authentication', status: 'completed', date: '2023-12-10' },
      { step: 'Blockchain Recording', status: 'completed', date: '2024-01-15' }
    ]
  };

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'mint': return <Award className="h-6 w-6 text-purple-400" />;
      case 'sale': return <ExternalLink className="h-6 w-6 text-blue-400" />;
      case 'transfer': return <User className="h-6 w-6 text-green-400" />;
      case 'verification': return <Shield className="h-6 w-6 text-orange-400" />;
      default: return <Clock className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to={`/collectible/${id}`}
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Collectible</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start space-x-6">
            <img
              src={provenanceEvent.collectibleImage}
              alt={provenanceEvent.collectibleName}
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">Provenance Event Details</h1>
              <p className="text-gray-400 text-lg mb-4">{provenanceEvent.collectibleName}</p>
              <div className="flex items-center space-x-4">
                <div className="bg-purple-600/20 rounded-lg p-3">
                  {getEventIcon(provenanceEvent.eventType)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{provenanceEvent.event}</h2>
                  <p className="text-gray-400">{provenanceEvent.date} at {provenanceEvent.time}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Event Description</h3>
              <p className="text-gray-300 leading-relaxed">{provenanceEvent.description}</p>
            </motion.div>

            {/* Blockchain Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Blockchain Transaction Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Transaction Hash</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="text-blue-300 font-mono text-sm break-all">
                        {provenanceEvent.transactionHash}
                      </code>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Block Number</label>
                    <div className="text-white font-medium mt-1">{provenanceEvent.blockNumber}</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Wallet Address</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="text-green-300 font-mono text-sm">
                        {provenanceEvent.address}
                      </code>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Gas Used</label>
                    <div className="text-white font-medium mt-1">{provenanceEvent.gasUsed}</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Gas Fee</label>
                    <div className="text-white font-medium mt-1">{provenanceEvent.gasFee}</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Location</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-white">{provenanceEvent.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Additional Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Additional Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Authenticator</label>
                    <div className="text-white font-medium mt-1">{provenanceEvent.additionalDetails.authenticator}</div>
                    <div className="text-gray-400 text-sm">{provenanceEvent.additionalDetails.authenticatorCredentials}</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Appraisal Value</label>
                    <div className="text-green-400 font-semibold mt-1">{provenanceEvent.additionalDetails.appraisalValue}</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Condition</label>
                    <div className="text-white font-medium mt-1">{provenanceEvent.additionalDetails.condition}</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Serial Number</label>
                    <div className="text-blue-300 font-mono mt-1">{provenanceEvent.additionalDetails.serialNumber}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Manufacturing Details</label>
                    <div className="text-white font-medium mt-1">{provenanceEvent.additionalDetails.manufacturingDetails}</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Previous Owner</label>
                    <div className="text-white font-medium mt-1">{provenanceEvent.additionalDetails.previousOwner}</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Acquisition Method</label>
                    <div className="text-white font-medium mt-1">{provenanceEvent.additionalDetails.acquisitionMethod}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Acquisition Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Acquisition Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Acquisition Method</label>
                    <div className="text-white font-medium mt-1">{provenanceEvent.additionalDetails.acquisitionMethod}</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Previous Owner</label>
                    <div className="text-white font-medium mt-1">{provenanceEvent.additionalDetails.previousOwner}</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Acquisition Date</label>
                    <div className="text-white font-medium mt-1">November 28, 2023</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Purchase Price</label>
                    <div className="text-green-400 font-semibold mt-1">$118,500 USD</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Acquisition Location</label>
                    <div className="text-white font-medium mt-1">Chicago, IL, USA</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Estate Sale Company</label>
                    <div className="text-white font-medium mt-1">Heritage Estate Sales LLC</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Lot Number</label>
                    <div className="text-blue-300 font-mono mt-1">#247-MUS</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Provenance Documentation</label>
                    <div className="text-white font-medium mt-1">Complete ownership records since 1962</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-600/10 border border-blue-600/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-600/20 rounded-full p-2 flex-shrink-0">
                    <FileText className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-blue-400 font-medium mb-1">Acquisition Notes</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      This exceptional 1959 Gibson Les Paul was acquired from a private estate sale in Chicago. 
                      The instrument had been owned by the same family since 1962 and was kept in pristine condition. 
                      All original documentation, including the original sales receipt and case, were included in the acquisition. 
                      The guitar underwent professional authentication and appraisal before being added to our collection.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Verification Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Verification Status</h3>
              <div className="space-y-3">
                {provenanceEvent.verificationSteps.map((step, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className={`h-5 w-5 ${getStatusColor(step.status)}`} />
                      <span className="text-white text-sm">{step.step}</span>
                    </div>
                    <span className="text-gray-400 text-xs">{step.date}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Supporting Documents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Supporting Documents</h3>
              <div className="space-y-3">
                {provenanceEvent.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-blue-400" />
                      <div>
                        <div className="text-white text-sm font-medium">{doc.name}</div>
                        <div className="text-gray-400 text-xs">{doc.type}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {doc.verified && (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      )}
                      <button className="text-blue-400 hover:text-blue-300 transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Verification Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Verification Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-gray-400 text-sm">Method</label>
                  <div className="text-white font-medium">{provenanceEvent.verificationMethod}</div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Certification Body</label>
                  <div className="text-white font-medium">{provenanceEvent.certificationBody}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProvenanceDetail;