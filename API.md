# API Documentation

This document provides technical documentation for the R3alm Collectibles platform API. Currently, the platform operates with mock data in the frontend. This documentation outlines the planned API structure for future backend integration.

---

## Overview

### Base URL
```
https://api.r3alm-collectibles.com/v1
```

### Authentication
All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <access_token>
```

### Response Format
All API responses follow this structure:
```json
{
  "success": boolean,
  "data": object | array,
  "error": {
    "code": string,
    "message": string
  },
  "meta": {
    "timestamp": string,
    "pagination": object
  }
}
```

---

## Authentication Endpoints

### Register User
Create a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "username": "collector_name"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "collector_name",
      "created_at": "2025-10-30T00:00:00Z"
    },
    "access_token": "jwt_token",
    "refresh_token": "refresh_token"
  }
}
```

### Login
Authenticate a user and receive access tokens.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "collector_name"
    },
    "access_token": "jwt_token",
    "refresh_token": "refresh_token"
  }
}
```

### Logout
Invalidate the current session.

**Endpoint:** `POST /auth/logout`

**Headers:** `Authorization: Bearer <access_token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Logout successful"
  }
}
```

### Refresh Token
Obtain a new access token using a refresh token.

**Endpoint:** `POST /auth/refresh`

**Request Body:**
```json
{
  "refresh_token": "refresh_token"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "access_token": "new_jwt_token"
  }
}
```

---

## Collectibles Endpoints

### Get All Collectibles
Retrieve a list of all collectibles with filtering and pagination.

**Endpoint:** `GET /collectibles`

**Query Parameters:**
- `category` (optional): Filter by category (art, music, sports, gaming, photography, memorabilia)
- `search` (optional): Search query string
- `sort` (optional): Sort by (trending, price_low, price_high, newest)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)
- `min_price` (optional): Minimum price in ETH
- `max_price` (optional): Maximum price in ETH
- `verified` (optional): Filter verified collectibles (true/false)

**Example Request:**
```
GET /collectibles?category=art&sort=trending&page=1&limit=20
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Vintage Gibson Les Paul 1959",
      "description": "Rare sunburst finish, original case included",
      "price": "2.5",
      "fractional_price": "0.025",
      "fractional_shares": 100,
      "category": "music",
      "image_url": "https://...",
      "thumbnail_url": "https://...",
      "verified": true,
      "trending": true,
      "likes": 147,
      "views": 2100,
      "owner_id": "uuid",
      "created_at": "2025-10-15T00:00:00Z",
      "updated_at": "2025-10-30T00:00:00Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "total_pages": 8
    }
  }
}
```

### Get Collectible by ID
Retrieve detailed information about a specific collectible.

**Endpoint:** `GET /collectibles/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Vintage Gibson Les Paul 1959",
    "description": "Rare sunburst finish, original case included",
    "long_description": "Detailed description...",
    "price": "2.5",
    "fractional_price": "0.025",
    "fractional_shares": 100,
    "available_shares": 65,
    "category": "music",
    "image_urls": ["https://...", "https://..."],
    "verified": true,
    "trending": true,
    "likes": 147,
    "views": 2100,
    "owner": {
      "id": "uuid",
      "username": "collector_name",
      "verified": true
    },
    "provenance": [...],
    "activity": [...],
    "metadata": {
      "token_id": "123",
      "contract_address": "0x...",
      "blockchain": "ethereum",
      "token_standard": "ERC-721"
    },
    "created_at": "2025-10-15T00:00:00Z",
    "updated_at": "2025-10-30T00:00:00Z"
  }
}
```

### Create Collectible (Mint NFT)
Create and mint a new collectible NFT.

**Endpoint:** `POST /collectibles`

**Headers:** `Authorization: Bearer <access_token>`

**Request Body (multipart/form-data):**
```
name: "Collectible Name"
description: "Description text"
category: "art"
price: "2.5"
fractional_price: "0.025"
fractional_shares: 100
image: <file>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Collectible Name",
    "transaction_hash": "0x...",
    "status": "pending"
  }
}
```

### Update Collectible
Update collectible information (owner only).

**Endpoint:** `PATCH /collectibles/:id`

**Headers:** `Authorization: Bearer <access_token>`

**Request Body:**
```json
{
  "description": "Updated description",
  "price": "3.0"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "updated_fields": ["description", "price"],
    "updated_at": "2025-10-30T00:00:00Z"
  }
}
```

### Delete Collectible
Remove a collectible listing (owner only, subject to conditions).

**Endpoint:** `DELETE /collectibles/:id`

**Headers:** `Authorization: Bearer <access_token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Collectible removed successfully"
  }
}
```

---

## Transaction Endpoints

### Purchase Collectible
Purchase a full collectible or fractional share.

**Endpoint:** `POST /transactions/purchase`

**Headers:** `Authorization: Bearer <access_token>`

**Request Body:**
```json
{
  "collectible_id": "uuid",
  "type": "fractional",
  "shares": 10,
  "wallet_address": "0x..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transaction_id": "uuid",
    "collectible_id": "uuid",
    "type": "fractional",
    "shares": 10,
    "total_price": "0.25",
    "transaction_hash": "0x...",
    "status": "pending",
    "created_at": "2025-10-30T00:00:00Z"
  }
}
```

### Get Transaction History
Retrieve user's transaction history.

**Endpoint:** `GET /transactions`

**Headers:** `Authorization: Bearer <access_token>`

**Query Parameters:**
- `type` (optional): Filter by transaction type (purchase, sale, transfer)
- `status` (optional): Filter by status (pending, completed, failed)
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "collectible_id": "uuid",
      "collectible_name": "Vintage Gibson Les Paul 1959",
      "type": "purchase",
      "shares": 10,
      "price": "0.25",
      "status": "completed",
      "transaction_hash": "0x...",
      "created_at": "2025-10-30T00:00:00Z"
    }
  ],
  "meta": {
    "pagination": {...}
  }
}
```

---

## Portfolio Endpoints

### Get User Portfolio
Retrieve authenticated user's portfolio.

**Endpoint:** `GET /portfolio`

**Headers:** `Authorization: Bearer <access_token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "total_value": "15.8",
    "total_collectibles": 8,
    "total_shares": 245,
    "collectibles": [
      {
        "id": "uuid",
        "name": "Vintage Gibson Les Paul 1959",
        "image_url": "https://...",
        "ownership_type": "fractional",
        "shares_owned": 25,
        "total_shares": 100,
        "current_value": "2.5",
        "purchase_price": "2.0",
        "profit_loss": "0.5",
        "profit_loss_percentage": 25
      }
    ],
    "recent_activity": [...],
    "analytics": {
      "total_invested": "12.5",
      "current_value": "15.8",
      "total_return": "3.3",
      "return_percentage": 26.4
    }
  }
}
```

### Get Portfolio Analytics
Retrieve detailed analytics for user's portfolio.

**Endpoint:** `GET /portfolio/analytics`

**Headers:** `Authorization: Bearer <access_token>`

**Query Parameters:**
- `period` (optional): Time period (7d, 30d, 90d, 1y, all)

**Response:**
```json
{
  "success": true,
  "data": {
    "performance": [
      {
        "date": "2025-10-01",
        "value": "12.5"
      },
      {
        "date": "2025-10-15",
        "value": "14.2"
      }
    ],
    "top_performers": [...],
    "asset_allocation": {
      "art": 35,
      "music": 25,
      "sports": 20,
      "gaming": 15,
      "photography": 5
    }
  }
}
```

---

## User Endpoints

### Get User Profile
Retrieve user profile information.

**Endpoint:** `GET /users/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "username": "collector_name",
    "email": "user@example.com",
    "avatar_url": "https://...",
    "bio": "Passionate collector",
    "verified": true,
    "joined_at": "2025-01-15T00:00:00Z",
    "stats": {
      "collectibles_owned": 8,
      "total_trades": 42,
      "followers": 156,
      "following": 89
    }
  }
}
```

### Update User Profile
Update authenticated user's profile.

**Endpoint:** `PATCH /users/me`

**Headers:** `Authorization: Bearer <access_token>`

**Request Body:**
```json
{
  "username": "new_username",
  "bio": "Updated bio",
  "avatar": "<file>"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "updated_fields": ["username", "bio"],
    "updated_at": "2025-10-30T00:00:00Z"
  }
}
```

---

## Activity & Provenance Endpoints

### Get Collectible Provenance
Retrieve complete provenance history for a collectible.

**Endpoint:** `GET /collectibles/:id/provenance`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "event_type": "minted",
      "from_address": null,
      "to_address": "0x...",
      "transaction_hash": "0x...",
      "timestamp": "2025-01-15T00:00:00Z",
      "details": "NFT minted by creator"
    },
    {
      "id": "uuid",
      "event_type": "transfer",
      "from_address": "0x...",
      "to_address": "0x...",
      "transaction_hash": "0x...",
      "price": "2.5",
      "timestamp": "2025-10-30T00:00:00Z",
      "details": "Sold to collector"
    }
  ]
}
```

### Get Collectible Activity
Retrieve recent activity for a collectible.

**Endpoint:** `GET /collectibles/:id/activity`

**Query Parameters:**
- `type` (optional): Filter by activity type (sale, offer, transfer, listing)
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "type": "sale",
      "from": "0x...",
      "to": "0x...",
      "price": "2.5",
      "shares": 10,
      "timestamp": "2025-10-30T00:00:00Z"
    }
  ],
  "meta": {
    "pagination": {...}
  }
}
```

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| AUTH_001 | 401 | Invalid or expired token |
| AUTH_002 | 403 | Insufficient permissions |
| AUTH_003 | 401 | Invalid credentials |
| USER_001 | 404 | User not found |
| USER_002 | 409 | User already exists |
| COLL_001 | 404 | Collectible not found |
| COLL_002 | 400 | Invalid collectible data |
| COLL_003 | 403 | Not collectible owner |
| TRANS_001 | 400 | Insufficient funds |
| TRANS_002 | 400 | Shares not available |
| TRANS_003 | 500 | Transaction failed |
| API_001 | 400 | Invalid request format |
| API_002 | 429 | Rate limit exceeded |
| API_003 | 500 | Internal server error |

---

## Rate Limiting

API requests are limited to:
- **Authenticated users**: 1000 requests per hour
- **Unauthenticated users**: 100 requests per hour

Rate limit headers are included in all responses:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 950
X-RateLimit-Reset: 1698696000
```

---

## Webhooks

Subscribe to real-time events (planned feature):

### Available Events
- `collectible.created`
- `collectible.purchased`
- `collectible.listed`
- `transaction.completed`
- `transaction.failed`
- `user.followed`

### Webhook Payload
```json
{
  "event": "collectible.purchased",
  "timestamp": "2025-10-30T00:00:00Z",
  "data": {...}
}
```

---

## WebSocket API

Real-time updates via WebSocket connection (planned feature):

**Endpoint:** `wss://api.r3alm-collectibles.com/v1/ws`

**Subscribe to updates:**
```json
{
  "action": "subscribe",
  "channels": ["collectibles", "portfolio"]
}
```

---

## SDK & Libraries

Official SDKs (planned):
- JavaScript/TypeScript
- Python
- Go
- Rust

---

## Support

For API support and questions:
- Email: api-support@r3alm-collectibles.com
- Documentation: https://docs.r3alm-collectibles.com
- Status Page: https://status.r3alm-collectibles.com

---

## Changelog

### v1.0.0 (Planned)
- Initial API release
- Core endpoints for collectibles, transactions, and portfolio
- Authentication with JWT
- Rate limiting implementation

---

**Note:** This API documentation reflects the planned architecture. The current application uses mock data on the frontend. Backend implementation with Supabase is outlined in the ROADMAP.md.
