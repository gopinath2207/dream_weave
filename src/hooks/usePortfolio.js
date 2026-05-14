import { useState, useEffect } from 'react';
import { fetchPortfolio } from '../lib/supabase';
import { DEMO_IMAGES } from '../lib/cloudinary';

/**
 * Fetches portfolio items from Supabase.
 * Falls back to DEMO_IMAGES if Supabase isn't configured yet.
 */
export function usePortfolio(category = 'all') {
  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const data = await fetchPortfolio(category === 'all' ? null : category);

        if (!cancelled) {
          // If Supabase returns nothing (not configured), use demo images
          if (data.length === 0) {
            const filtered = category === 'all'
              ? DEMO_IMAGES
              : DEMO_IMAGES.filter(img => img.category === category);
            setItems(filtered);
          } else {
            setItems(data);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setItems(DEMO_IMAGES);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [category]);

  return { items, loading, error };
}
