import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Book, 
  Key, 
  Zap,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';

const APIDocumentation = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const endpoints = [
    {
      method: 'GET',
      path: '/api/collectibles',
      description: 'Retrieve all collectibles with optional filtering',
      parameters: [
        { name: 'category', type: 'string', description: 'Filter by category' },
        { name: 'verified', type: 'boolean', description: 'Filter verified items only' },
        { name: 'limit', type: 'number', description: 'Number of items to return' }
      ]
    },
    {
      method: 'GET',
      path: '/api/collectibles/{id}',
      description: 'Get detailed information about a specific collectible',
      parameters: [
        { name: 'id', type: 'string', description: 'Collectible ID', required: true }
      ]
    },
    {
      method: 'POST',
      path: '/api/collectibles',
      description: 'Create a new NFT collectible',
      parameters: [
        { name: 'name', type: 'string', description: 'Collectible name', required: true },
        { name: 'description', type: 'string', description: 'Detailed description', required: true },
        { name: 'price', type: 'number', description: 'Price in ETH', required: true }
      ]
    }
  ];

  const codeExamples = {
    javascript: `// Get all collectibles
const response = await fetch('https://api.r3alm.com/collectibles', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const collectibles = await response.json();
console.log(collectibles);`,

    python: `import requests

# Get all collectibles
headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.r3alm.com/collectibles', headers=headers)
collectibles = response.json()
print(collectibles)`,

    curl: `curl -X GET "https://api.r3alm.com/collectibles" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">API Documentation</h1>
          <p className="text-gray-400 text-lg max-w-3xl">
            Integrate R3alm Collectibles into your applications with our comprehensive REST API. 
            Access collectible data, user information, and trading functionality programmatically.
          </p>
        </motion.div>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Zap className="h-6 w-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Quick Start</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Authentication</h3>
              <p className="text-gray-300 mb-4">
                All API requests require authentication using an API key. Include your API key in the Authorization header:
              </p>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Authorization Header</span>
                  <button
                    onClick={() => copyToClipboard('Authorization: Bearer YOUR_API_KEY', 'auth')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedCode === 'auth' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <code className="text-blue-300">Authorization: Bearer YOUR_API_KEY</code>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Base URL</h3>
              <p className="text-gray-300 mb-4">
                All API endpoints are relative to the base URL:
              </p>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Base URL</span>
                  <button
                    onClick={() => copyToClipboard('https://api.r3alm.com', 'base')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedCode === 'base' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <code className="text-green-300">https://api.r3alm.com</code>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Endpoints */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">API Endpoints</h2>
          <div className="space-y-6">
            {endpoints.map((endpoint, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center space-x-4 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    endpoint.method === 'GET' ? 'bg-green-500/20 text-green-400' :
                    endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="text-white font-mono">{endpoint.path}</code>
                </div>
                
                <p className="text-gray-300 mb-4">{endpoint.description}</p>
                
                {endpoint.parameters && endpoint.parameters.length > 0 && (
                  <div>
                    <h4 className="text-white font-semibold mb-3">Parameters</h4>
                    <div className="space-y-2">
                      {endpoint.parameters.map((param, paramIndex) => (
                        <div key={paramIndex} className="flex items-center space-x-4 text-sm">
                          <code className="text-blue-300 font-mono">{param.name}</code>
                          <span className="text-purple-300">{param.type}</span>
                          {param.required && (
                            <span className="text-red-400 text-xs">required</span>
                          )}
                          <span className="text-gray-400">{param.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Code Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Code Examples</h2>
          <div className="space-y-6">
            {Object.entries(codeExamples).map(([language, code]) => (
              <div key={language} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                  <div className="flex items-center space-x-3">
                    <Code className="h-5 w-5 text-gray-400" />
                    <span className="text-white font-medium capitalize">{language}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(code, language)}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedCode === language ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span className="text-sm">{copiedCode === language ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-6">
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{code}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Get API Key */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl p-8 border border-gray-700 text-center"
        >
          <Key className="h-12 w-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-4">Ready to get started?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get your API key and start building amazing applications with R3alm Collectibles data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all">
              Get API Key
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2">
              <Book className="h-4 w-4" />
              <span>View Full Docs</span>
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default APIDocumentation;