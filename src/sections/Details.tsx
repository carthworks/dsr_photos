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
      className="relative z-50 bg-background py-24 lg:py-32 px-6 lg:px-12 transition-colors duration-500"
    >
      {/* Left Text Card */}
      <div
        ref={textCardRef}
        className="absolute card-elegant p-10 lg:p-12"
        style={{
          left: '6vw',
          top: '26vh',
          width: '32vw',
          minWidth: '300px',
        }}
      >
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
        <p className="text-[#6E6E6E] leading-relaxed mb-8">
          We shoot with precision—perfect lighting, true colors, and professional
          editing that brings out the best in every frame.
        </p>

        {/* CTA Link */}
        <button
          onClick={scrollToPackages}
          className="group flex items-center gap-2 text-[#1A1A1A] font-medium hover:text-gold transition-colors"
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
        className="absolute rounded-2xl overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.10)]"
        style={{
          left: '42vw',
          top: '14vh',
          width: '52vw',
          height: '72vh',
        }}
      >
        <img
          src="/images/details_rings_macro.jpg"
          alt="Wedding rings detail"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}