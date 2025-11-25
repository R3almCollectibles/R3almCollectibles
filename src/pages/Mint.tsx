import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Image as ImageIcon, 
  Film, 
  Music, 
  FileText,
  Plus,
  X,
  Shield,
  Zap
} from 'lucide-react';

const MintNFT = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    fractionalShares: '',
    royalties: '2.5',
    physicalItem: false
  });
  const [attributes, setAttributes] = useState([{ trait_type: '', value: '' }]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const categories = [
    'Art & Paintings',
    'Music & Audio',
    'Photography',
    'Sports Memorabilia',
    'Gaming Items',
    'Collectible Cards',
    'Vintage Items',
    'Digital Art',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAttributeChange = (index: number, field: string, value: string) => {
    const newAttributes = [...attributes];
    newAttributes[index] = { ...newAttributes[index], [field]: value };
    setAttributes(newAttributes);
  };

  const addAttribute = () => {
    setAttributes([...attributes, { trait_type: '', value: '' }]);
  };

  const removeAttribute = (index: number) => {
    if (attributes.length > 1) {
      const newAttributes = attributes.filter((_, i) => i !== index);
      setAttributes(newAttributes);
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files[0]) {
      setUploadedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle minting logic here
    console.log('Minting NFT:', { formData, attributes, uploadedFile });
    alert('NFT minting process initiated! (Demo)');
  };

  const getFileIcon = (file: File | null) => {
    if (!file) return ImageIcon;
    if (file.type.startsWith('image/')) return ImageIcon;
    if (file.type.startsWith('video/')) return Film;
    if (file.type.startsWith('audio/')) return Music;
    return FileText;
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Create Your NFT</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Transform your collectible into a tokenized asset with blockchain authentication and fractional ownership capabilities
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* File Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-white font-medium mb-4">Upload Asset</label>
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${
                dragOver
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleFileDrop}
            >
              {uploadedFile ? (
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    {React.createElement(getFileIcon(uploadedFile), {
                      className: "h-16 w-16 text-blue-400"
                    })}
                  </div>
                  <p className="text-white font-medium">{uploadedFile.name}</p>
                  <p className="text-gray-400 text-sm">
                    {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  <button
                    type="button"
                    onClick={() => setUploadedFile(null)}
                    className="mt-4 text-red-400 hover:text-red-300 transition-colors"
                  >
                    Remove File
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-white font-medium mb-2">
                    Drag and drop your file here, or click to browse
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    Supports JPG, PNG, GIF, MP4, MP3 (Max 100MB)
                  </p>
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept="image/*,video/*,audio/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Choose File
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-6">Basic Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter collectible name"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your collectible in detail"
                      rows={4}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="physicalItem"
                      name="physicalItem"
                      checked={formData.physicalItem}
                      onChange={handleInputChange}
                      className="rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="physicalItem" className="text-white">
                      This represents a physical collectible
                    </label>
                  </div>
                </div>
              </div>

              {/* Attributes */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Attributes</h3>
                  <button
                    type="button"
                    onClick={addAttribute}
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Attribute</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {attributes.map((attr, index) => (
                    <div key={index} className="flex space-x-4">
                      <input
                        type="text"
                        placeholder="Trait type (e.g., Color)"
                        value={attr.trait_type}
                        onChange={(e) => handleAttributeChange(index, 'trait_type', e.target.value)}
                        className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g., Blue)"
                        value={attr.value}
                        onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                        className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeAttribute(index)}
                        className="text-red-400 hover:text-red-300 transition-colors p-2"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Pricing & Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-6">Pricing & Fractional Ownership</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Total Price (ETH) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="e.g., 2.5"
                      step="0.001"
                      min="0"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Number of Fractional Shares</label>
                    <input
                      type="number"
                      name="fractionalShares"
                      value={formData.fractionalShares}
                      onChange={handleInputChange}
                      placeholder="e.g., 100"
                      min="1"
                      max="10000"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    />
                    <p className="text-gray-400 text-sm mt-2">
                      Leave empty for non-fractional ownership. Each share will cost:{' '}
                      {formData.price && formData.fractionalShares
                        ? `${(parseFloat(formData.price) / parseInt(formData.fractionalShares)).toFixed(4)} ETH`
                        : '—'
                      }
                    </p>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Creator Royalties (%)</label>
                    <input
                      type="number"
                      name="royalties"
                      value={formData.royalties}
                      onChange={handleInputChange}
                      placeholder="2.5"
                      step="0.1"
                      min="0"
                      max="10"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    />
                    <p className="text-gray-400 text-sm mt-2">
                      Percentage you'll earn from future sales (0-10%)
                    </p>
                  </div>
                </div>
              </div>

              {/* Blockchain Features */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-6">Blockchain Features</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <Shield className="h-6 w-6 text-green-400" />
                    <div>
                      <div className="text-white font-medium">Provenance Verification</div>
                      <div className="text-green-300 text-sm">Automatically enabled for all NFTs</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <Zap className="h-6 w-6 text-blue-400" />
                    <div>
                      <div className="text-white font-medium">Smart Contract Integration</div>
                      <div className="text-blue-300 text-sm">ERC-721 standard with fractional capabilities</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                <h4 className="text-white font-medium mb-4">Minting Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Blockchain</span>
                    <span className="text-white">Ethereum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Token Standard</span>
                    <span className="text-white">ERC-721</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gas Fee (estimated)</span>
                    <span className="text-white">~$15-25</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Platform Fee</span>
                    <span className="text-white">2.5%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center pt-6"
          >
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto"
            >
              <Zap className="h-5 w-5" />
              <span>Create NFT Collectible</span>
            </button>
            <p className="text-gray-400 text-sm mt-4">
              By creating an NFT, you agree to our Terms of Service and Creator Guidelines
            </p>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default MintNFT;