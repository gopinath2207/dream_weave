import { buildUrl, buildSrcSet, getImageSizes } from '../../lib/cloudinary';
import { useState } from 'react';

/**
 * Cloudinary-optimized image component.
 * Handles srcset, lazy loading, AVIF/WebP via f_auto, and skeleton loading.
 */
export default function CloudinaryImage({
  publicId,
  alt = '',
  type = 'portfolio',
  className = '',
  wrapperClassName = '',
  onClick,
  eager = false,
  aspectRatio, // e.g. "4/3", "1/1", "16/9"
}) {
  const [loaded,  setLoaded]  = useState(false);
  const [errored, setErrored] = useState(false);

  const src    = buildUrl(publicId, 'f_auto,q_auto,w_800');
  const srcSet = buildSrcSet(publicId);
  const sizes  = getImageSizes(type);

  return (
    <div
      className={`relative overflow-hidden bg-onyx-700 ${wrapperClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
      onClick={onClick}
    >
      {/* Skeleton shimmer */}
      {!loaded && !errored && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-onyx-700 via-onyx-800 to-onyx-700 bg-[length:200%_100%]" />
      )}

      {!errored && (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => { setLoaded(true); setErrored(true); }}
          className={`
            w-full h-full object-cover transition-opacity duration-500
            ${loaded ? 'opacity-100' : 'opacity-0'}
            ${className}
          `}
        />
      )}

      {errored && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-warm-white/30 gap-2 p-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="M21 15l-5-5L5 21"/>
          </svg>
          <span className="text-xs font-inter text-center">Image unavailable</span>
        </div>
      )}
    </div>
  );
}
