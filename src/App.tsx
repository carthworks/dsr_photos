import { ThemeProvider } from './context/ThemeContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster } from '@/components/ui/sonner';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Philosophy from './sections/Philosophy';
import Portfolio from './sections/Portfolio';
import Process from './sections/Process';
import Details from './sections/Details';
import Packages from './sections/Packages';
import Testimonials from './sections/Testimonials';
import Journal from './sections/Journal';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// New Components
import WhatsAppButton from './components/WhatsAppButton';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import CookieConsent from './components/CookieConsent';
import PageLoader from './components/PageLoader';
import ThemeToggle from './components/ThemeToggle';

import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function App() {

  // Global scroll snap for pinned sections
  useGSAP(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });

    }, 100);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <ThemeProvider>
      <div className="relative">
        {/* Theme Toggle (Custom implementation) */}
        <ThemeToggle />

        {/* Page Loader */}
        <PageLoader />

        {/* Scroll Progress Bar */}
        <ScrollProgress />

        {/* Grain Overlay */}
        <div className="grain-overlay" />

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main className="relative">
          <Hero />
          <Philosophy />
          <Portfolio />
          <Process />
          <Details />
          <Packages />
          <Testimonials />
          <Journal />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* WhatsApp Chat Button */}
        <WhatsAppButton />

        {/* Back to Top Button */}
        <BackToTop />

        {/* Cookie Consent Banner */}
        <CookieConsent />

        {/* Toast notifications */}
        <Toaster position="top-center" richColors />
      </div>
    </ThemeProvider>
  );
}

export default App;