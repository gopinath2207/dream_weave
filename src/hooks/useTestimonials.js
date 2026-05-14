import { useState, useEffect } from 'react';
import { fetchTestimonials } from '../lib/supabase';

const DEMO_TESTIMONIALS = [
  { id: 1, name: 'Priya Venkatesh',    location: 'Chennai',    rating: 5, text: 'Dream Weave transformed my bridal lehenga into a masterpiece. The zari work was so intricate — every guest kept asking who did it. Absolutely stunning!', avatar_url: null },
  { id: 2, name: 'Deepa Krishnaswamy',location: 'Coimbatore', rating: 5, text: 'I gave them my old silk saree and they added the most beautiful Aari floral border. The craftsmanship is museum-quality. Will be a customer for life.', avatar_url: null },
  { id: 3, name: 'Anitha Rajan',       location: 'Bangalore',  rating: 5, text: 'Ordered a custom blouse for my wedding and the goldwork was impeccable. The timeline was on schedule and the communication was excellent throughout.', avatar_url: null },
  { id: 4, name: 'Meera Subramaniam',  location: 'Madurai',    rating: 5, text: 'The peacock motif kurta they made for my daughter is beyond beautiful. Dream Weave truly lives up to its name — it\'s like wearing a dream!', avatar_url: null },
  { id: 5, name: 'Kavitha Balaji',     location: 'Tiruppur',   rating: 5, text: 'Professional, passionate, and precise. The mirror work dupatta is flawless. I showed it to a designer friend and she couldn\'t believe it wasn\'t from a boutique.', avatar_url: null },
];

export function useTestimonials() {
  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchTestimonials();
        if (!cancelled) {
          setItems(data.length > 0 ? data : DEMO_TESTIMONIALS);
        }
      } catch {
        if (!cancelled) setItems(DEMO_TESTIMONIALS);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { items, loading };
}
