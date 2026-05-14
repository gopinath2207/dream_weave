// ── Cloudinary URL Builder ────────────────────────────────────
// Replace VITE_CLOUDINARY_CLOUD_NAME in .env.local before deploying!
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo';
const BASE_URL   = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

/**
 * Build a Cloudinary URL with optional transformation string.
 * @param {string} publicId - Cloudinary public_id (e.g. "dreamweave/portfolio/item1")
 * @param {string} transforms - Cloudinary transformation string (e.g. "f_auto,q_auto,w_800")
 * @returns {string} Full Cloudinary URL
 */
export function buildUrl(publicId, transforms = 'f_auto,q_auto') {
  if (!publicId) return '';
  // If the publicId is already a full URL, just add params
  if (publicId.startsWith('http')) {
    try {
      const url = new URL(publicId);
      // Insert transform before the public_id part
      return publicId.replace('/upload/', `/upload/${transforms}/`);
    } catch {
      return publicId;
    }
  }
  return `${BASE_URL}/${transforms}/${publicId}`;
}

/**
 * Generate a srcset string for responsive images.
 * @param {string} publicId
 * @param {number[]} widths - Array of widths in pixels
 * @returns {string} srcset attribute value
 */
export function buildSrcSet(publicId, widths = [400, 800, 1200]) {
  return widths
    .map(w => `${buildUrl(publicId, `f_auto,q_auto,w_${w}`)} ${w}w`)
    .join(', ');
}

/**
 * Get sizes attribute for responsive images.
 */
export function getImageSizes(type = 'portfolio') {
  const sizes = {
    portfolio:  '(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw',
    hero:       '100vw',
    thumbnail:  '(max-width: 768px) 50vw, 25vw',
  };
  return sizes[type] || sizes.portfolio;
}

// ── Demo / Placeholder Cloudinary Images ──────────────────────
// These use Cloudinary's public 'demo' cloud to showcase the layout
// until real images are uploaded.
export const DEMO_IMAGES = [
  { id: 1, publicId: 'samples/landscapes/nature-mountains',    category: 'bridal',      title: 'Bridal Veil Embroidery',      tags: ['bridal', 'gold', 'zari'] },
  { id: 2, publicId: 'samples/food/dessert',                  category: 'casual',      title: 'Floral Casual Kurta',          tags: ['casual', 'floral'] },
  { id: 3, publicId: 'samples/landscapes/girl-urban-view',    category: 'traditional', title: 'Kancheevaram Border Work',    tags: ['traditional', 'silk'] },
  { id: 4, publicId: 'samples/animals/reindeer',              category: 'bridal',      title: 'Bridal Dupatta Zari Work',    tags: ['bridal', 'dupatta'] },
  { id: 5, publicId: 'samples/landscapes/beach-boat',         category: 'casual',      title: 'Peacock Motif Top',            tags: ['casual', 'peacock'] },
  { id: 6, publicId: 'samples/food/spices',                   category: 'traditional', title: 'Temple Border Saree',          tags: ['traditional', 'temple'] },
  { id: 7, publicId: 'samples/landscapes/road-снег',          category: 'bridal',      title: 'Gold Thread Blouse',           tags: ['bridal', 'blouse'] },
  { id: 8, publicId: 'samples/animals/cat',                   category: 'casual',      title: 'Mirror Work Kurti',            tags: ['casual', 'mirror'] },
  { id: 9, publicId: 'samples/people/jazz',                   category: 'traditional', title: 'Phulkari Dupatta',             tags: ['traditional', 'phulkari'] },
];
