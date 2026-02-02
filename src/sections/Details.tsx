import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Details() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textCardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Right image card animation
      scrollTl.fromTo(
        imageRef.current,
        { x: '60vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Left text card animation
      scrollTl.fromTo(
        textCardRef.current,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // EXIT (70%-100%)
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        textCardRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  const scrollToPackages = () => {
    const element = document.querySelector('#packages');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="details"
      className="relative z-50 bg-background py-16 lg:py-0 transition-colors duration-500 px-6 lg:px-0"
    >
      <div className="max-w-7xl mx-auto lg:max-w-none h-full relative flex flex-col-reverse lg:block">
        {/* Left Text Card */}
        <div
          ref={textCardRef}
          className="relative lg:absolute card-elegant p-8 lg:p-12 mb-8 lg:mb-0"
          style={{
            left: 'var(--lg-text-left, auto)',
            top: 'var(--lg-text-top, auto)',
            width: 'var(--lg-text-width, 100%)',
            minWidth: 'var(--lg-text-min-width, 0)',
          }}
        >
          <style>{`
            @media (min-width: 1024px) {
              #details .card-elegant {
                --lg-text-left: 6vw;
                --lg-text-top: 26vh;
                --lg-text-width: 32vw;
                --lg-text-min-width: 300px;
              }
            }
          `}</style>
          {/* Gold Rule */}
          <div className="w-11 h-0.5 bg-gold mb-8" />

          {/* Headline */}
          <h2
            className="font-serif font-medium text-foreground mb-6"
            style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', lineHeight: 1.1 }}
          >
            Every detail matters.
          </h2>

          {/* Body */}
          <p className="text-muted-foreground leading-relaxed mb-8">
            We shoot with precision—perfect lighting, true colors, and professional
            editing that brings out the best in every frame.
          </p>

          {/* CTA Link */}
          <button
            onClick={scrollToPackages}
            className="group flex items-center gap-2 text-foreground font-medium hover:text-gold transition-colors"
          >
            <span className="link-underline">View packages</span>
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Right Image Card */}
        <div
          ref={imageRef}
          className="relative lg:absolute rounded-2xl overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.10)] mb-8 lg:mb-0"
          style={{
            left: 'var(--lg-image-left, auto)',
            top: 'var(--lg-image-top, auto)',
            width: 'var(--lg-image-width, 100%)',
            height: 'var(--lg-image-height, 50vh)',
          }}
        >
          <style>{`
            @media (min-width: 1024px) {
              #details .relative.lg\\:absolute:last-child {
                --lg-image-left: 42vw;
                --lg-image-top: 14vh;
                --lg-image-width: 52vw;
                --lg-image-height: 72vh;
              }
            }
          `}</style>
          <img
            src="/images/details_rings_macro.jpg"
            alt="Wedding rings detail"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}