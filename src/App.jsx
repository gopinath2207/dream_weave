import { lazy, Suspense } from 'react';
import Navbar  from './components/layout/Navbar';
import Footer  from './components/layout/Footer';
import Hero    from './components/sections/Hero';

// Lazy load below-fold sections for better initial performance
const Portfolio        = lazy(() => import('./components/sections/Portfolio'));
const PricingEstimator = lazy(() => import('./components/sections/PricingEstimator'));
const Testimonials     = lazy(() => import('./components/sections/Testimonials'));
const SocialReels      = lazy(() => import('./components/sections/SocialReels'));
const Contact          = lazy(() => import('./components/sections/Contact'));

// Section fallback skeleton
function SectionSkeleton() {
  return (
    <div className="py-24 bg-deep-onyx">
      <div className="section-container">
        <div className="h-8 w-48 bg-onyx-700 animate-pulse rounded mx-auto mb-4" />
        <div className="h-4 w-64 bg-onyx-700 animate-pulse rounded mx-auto" />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-deep-onyx text-warm-white">
      {/* Navigation — always above fold, never lazy */}
      <Navbar />

      {/* Main content */}
      <main>
        {/* Hero — always above fold, not lazy */}
        <Hero />

        {/* Below-fold sections — lazy loaded */}
        <Suspense fallback={<SectionSkeleton />}>
          <Portfolio />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <PricingEstimator />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <SocialReels />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
