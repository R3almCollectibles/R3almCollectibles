import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase'; // Your Supabase client

export const useDynamicMenuItems = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data } = await supabase
        .from('nfts')
        .select('id, name')
        .eq('featured', true)
        .order('lastmod', { ascending: false })
        .limit(3);
      setLoading(false);
      setItems(data?.map(nft => ({
        name: nft.name,
        href: `/collectible/${nft.id}`,
        priority: 0.7,
      })) || []);
    };
    fetchFeatured();
  }, []);

  return useMemo(() => ({ items, loading }), [items, loading]);
};