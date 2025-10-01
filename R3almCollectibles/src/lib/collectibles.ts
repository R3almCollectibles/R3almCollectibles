import { supabase } from './supabase';

export interface Collectible {
  id: string;
  name: string;
  description: string;
  category: string;
  price_eth: number;
  fractional_price_eth: number;
  fractional_shares: string;
  image_url: string;
  verified: boolean;
  trending: boolean;
  views: number;
  likes: number;
  owner_id?: string;
  created_at: string;
  updated_at: string;
}

export async function getCollectibles(options?: {
  category?: string;
  search?: string;
  limit?: number;
}): Promise<Collectible[]> {
  let query = supabase
    .from('collectibles')
    .select('*')
    .order('created_at', { ascending: false });

  if (options?.category && options.category !== 'all') {
    query = query.eq('category', options.category);
  }

  if (options?.search) {
    query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching collectibles:', error);
    return [];
  }

  return data || [];
}

export async function getCollectibleById(id: string): Promise<Collectible | null> {
  const { data, error } = await supabase
    .from('collectibles')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching collectible:', error);
    return null;
  }

  return data;
}

export async function incrementViews(id: string): Promise<void> {
  const { error } = await supabase.rpc('increment_views', { collectible_id: id });

  if (error) {
    console.error('Error incrementing views:', error);
  }
}

export async function toggleLike(collectibleId: string, userId: string): Promise<boolean> {
  const { error } = await supabase.rpc('toggle_like', {
    collectible_id: collectibleId,
    user_id: userId
  });

  if (error) {
    console.error('Error toggling like:', error);
    return false;
  }

  return true;
}
