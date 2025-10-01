/*
  # Initial R3alm Collectibles Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, references auth.users)
      - `email` (text)
      - `name` (text)
      - `avatar` (text, optional)
      - `wallet_address` (text, optional)
      - `bio` (text, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `collectibles`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `category` (text)
      - `price_eth` (decimal)
      - `fractional_price_eth` (decimal)
      - `fractional_shares` (text, e.g., "1/100")
      - `image_url` (text)
      - `verified` (boolean)
      - `trending` (boolean)
      - `views` (integer)
      - `likes` (integer)
      - `owner_id` (uuid, references profiles)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `transactions`
      - `id` (uuid, primary key)
      - `collectible_id` (uuid, references collectibles)
      - `buyer_id` (uuid, references profiles)
      - `seller_id` (uuid, references profiles, nullable)
      - `amount_eth` (decimal)
      - `transaction_type` (text: 'purchase', 'sale', 'mint')
      - `status` (text: 'pending', 'completed', 'failed')
      - `transaction_hash` (text, optional)
      - `created_at` (timestamptz)
    
    - `portfolio_items`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `collectible_id` (uuid, references collectibles)
      - `shares_owned` (decimal)
      - `purchase_price_eth` (decimal)
      - `acquired_at` (timestamptz)
    
    - `provenance_events`
      - `id` (uuid, primary key)
      - `collectible_id` (uuid, references collectibles)
      - `event_type` (text)
      - `description` (text)
      - `from_user_id` (uuid, references profiles, nullable)
      - `to_user_id` (uuid, references profiles, nullable)
      - `transaction_hash` (text, optional)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public read access to collectibles
    - Add policies for users to view their own transactions and portfolio

  3. Important Notes
    - All tables use UUID primary keys with automatic generation
    - Timestamps use timestamptz with automatic defaults
    - RLS is restrictive by default - data only accessible to authorized users
    - Public can view collectibles but not modify them
    - Users can only modify their own profile and portfolio data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  name text NOT NULL,
  avatar text,
  wallet_address text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create collectibles table
CREATE TABLE IF NOT EXISTS collectibles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  price_eth decimal NOT NULL,
  fractional_price_eth decimal NOT NULL,
  fractional_shares text NOT NULL DEFAULT '1/100',
  image_url text NOT NULL,
  verified boolean DEFAULT false,
  trending boolean DEFAULT false,
  views integer DEFAULT 0,
  likes integer DEFAULT 0,
  owner_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE collectibles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view collectibles"
  ON collectibles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Owners can update their collectibles"
  ON collectibles FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Authenticated users can create collectibles"
  ON collectibles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  collectible_id uuid NOT NULL REFERENCES collectibles(id) ON DELETE CASCADE,
  buyer_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  seller_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  amount_eth decimal NOT NULL,
  transaction_type text NOT NULL CHECK (transaction_type IN ('purchase', 'sale', 'mint')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  transaction_hash text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "Users can create transactions as buyer"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = buyer_id);

-- Create portfolio_items table
CREATE TABLE IF NOT EXISTS portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  collectible_id uuid NOT NULL REFERENCES collectibles(id) ON DELETE CASCADE,
  shares_owned decimal NOT NULL DEFAULT 1.0,
  purchase_price_eth decimal NOT NULL,
  acquired_at timestamptz DEFAULT now(),
  UNIQUE(user_id, collectible_id)
);

ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own portfolio items"
  ON portfolio_items FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own portfolio items"
  ON portfolio_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own portfolio items"
  ON portfolio_items FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own portfolio items"
  ON portfolio_items FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create provenance_events table
CREATE TABLE IF NOT EXISTS provenance_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  collectible_id uuid NOT NULL REFERENCES collectibles(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  description text NOT NULL,
  from_user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  to_user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  transaction_hash text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE provenance_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view provenance events"
  ON provenance_events FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "System can create provenance events"
  ON provenance_events FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_collectibles_category ON collectibles(category);
CREATE INDEX IF NOT EXISTS idx_collectibles_trending ON collectibles(trending);
CREATE INDEX IF NOT EXISTS idx_collectibles_owner ON collectibles(owner_id);
CREATE INDEX IF NOT EXISTS idx_transactions_buyer ON transactions(buyer_id);
CREATE INDEX IF NOT EXISTS idx_transactions_seller ON transactions(seller_id);
CREATE INDEX IF NOT EXISTS idx_transactions_collectible ON transactions(collectible_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_user ON portfolio_items(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_collectible ON portfolio_items(collectible_id);
CREATE INDEX IF NOT EXISTS idx_provenance_collectible ON provenance_events(collectible_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collectibles_updated_at
  BEFORE UPDATE ON collectibles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
