# R3alm Collectibles

A modern NFT marketplace platform for trading authenticated collectibles with blockchain-verified provenance and fractional ownership capabilities.

## Overview

R3alm Collectibles is a production-ready web application that enables users to discover, mint, trade, and manage digital collectibles. The platform supports fractional ownership, allowing users to own shares of high-value items while maintaining liquidity through integrated secondary markets.

## Features

### Core Functionality
- **Marketplace**: Browse and discover authenticated collectibles across multiple categories
- **NFT Minting**: Create and tokenize collectibles with blockchain authentication
- **Portfolio Management**: Track owned collectibles and fractional shares with analytics
- **User Authentication**: Secure account management with protected routes
- **Advanced Search & Filtering**: Find collectibles by category, price, and trending status
- **Collectible Details**: View comprehensive information including provenance history and activity logs

### Key Capabilities
- Blockchain-verified authentication and provenance tracking
- Fractional ownership support for high-value items
- Real-time portfolio analytics and performance tracking
- Secondary market trading for fractional shares
- Interactive demo mode for testing platform features
- Responsive design optimized for all devices

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Linting**: ESLint with TypeScript support

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AuthModal.tsx   # Authentication interface
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   └── PortfolioChart.tsx  # Analytics visualization
├── contexts/           # React context providers
│   └── AuthContext.tsx # Authentication state management
├── pages/             # Route components
│   ├── HomePage.tsx   # Landing page
│   ├── Marketplace.tsx # Collectibles marketplace
│   ├── CollectibleDetail.tsx # Individual item view
│   ├── MintNFT.tsx    # NFT creation interface
│   ├── Portfolio.tsx  # User portfolio dashboard
│   ├── Analytics.tsx  # Portfolio analytics
│   ├── Settings.tsx   # User settings
│   ├── Demo.tsx       # Interactive demo mode
│   └── ...           # Additional pages
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

### Browsing the Marketplace

Navigate to the Marketplace to explore available collectibles. Use the search bar and filters to find specific items by category, price range, or trending status. Toggle between grid and list views for optimal browsing.

### Viewing Collectible Details

Click on any collectible to view detailed information including:
- High-resolution images
- Authentication status and verification
- Pricing for full and fractional ownership
- Complete provenance history
- Recent activity and transaction logs
- Market analytics and trends

### Minting NFTs

Access the Mint NFT page to create new collectibles. Upload images, add metadata, set pricing for full and fractional ownership, and tokenize your items on the blockchain.

### Managing Your Portfolio

The Portfolio page provides:
- Overview of all owned collectibles and shares
- Real-time value tracking and performance metrics
- Detailed analytics with interactive charts
- Transaction history
- Quick access to manage or trade holdings

### Demo Mode

Try the platform risk-free with the interactive demo. Test all features including browsing, minting, and portfolio management without connecting a wallet or making transactions.

## Design Philosophy

R3alm Collectibles features a premium, production-ready design with:
- Modern gradient aesthetics with blue, purple, and emerald accents
- Smooth animations and micro-interactions using Framer Motion
- Responsive layouts optimized for mobile, tablet, and desktop
- High contrast ratios for excellent readability
- Intuitive navigation and user experience
- Professional typography with careful spacing

## Authentication

The platform includes a complete authentication system with:
- User registration and login
- Secure session management via AuthContext
- Protected routes for authenticated features
- Persistent authentication state

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please follow these guidelines:
1. Fork the repository
2. Create a feature branch
3. Make your changes with clear commit messages
4. Submit a pull request

## License

This project is private and proprietary.

## Support

For questions, issues, or feature requests, please contact the development team or open an issue in the repository.
