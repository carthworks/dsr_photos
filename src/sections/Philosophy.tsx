import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

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

    // Left image card animation
    scrollTl.fromTo(
      imageRef.current,
      { x: '-60vw', opacity: 0, scale: 0.96 },
      { x: 0, opacity: 1, scale: 1, ease: 'none' },
      0
    );

    // Right text card animation
    scrollTl.fromTo(
      textCardRef.current,
      { x: '40vw', opacity: 0, rotate: 1 },
      { x: 0, opacity: 1, rotate: 0, ease: 'none' },
      0.05
    );

    // Headline animation
    scrollTl.fromTo(
      headlineRef.current,
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, ease: 'none' },
      0.1
    );

    // Body + CTA animation
    scrollTl.fromTo(
      bodyRef.current,
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, ease: 'none' },
      0.15
    );

    // EXIT (70%-100%)
    scrollTl.fromTo(
      imageRef.current,
      { x: 0, opacity: 1 },
      { x: '-18vw', opacity: 0, ease: 'power2.in' },
      0.7
    );

    scrollTl.fromTo(
      textCardRef.current,
      { x: 0, opacity: 1 },
      { x: '18vw', opacity: 0, ease: 'power2.in' },
      0.7
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden z-20 bg-background transition-colors duration-500"
    >
      {/* Left Image Card */}
      <div
        ref={imageRef}
        className="absolute rounded-2xl overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.10)]"
        style={{
          left: '6vw',
          top: '14vh',
          width: '54vw',
          height: '72vh',
        }}
      >
        <img
          src="/images/philosophy_bride_portrait.jpg"
          alt="Bridal portrait"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Text Card */}
      <div
        ref={textCardRef}
        className="absolute card-elegant p-10 lg:p-12"
        style={{
          left: '62vw',
          top: '26vh',
          width: '32vw',
          minWidth: '320px',
        }}
      >
        {/* Gold Rule */}
        <div className="w-11 h-0.5 bg-gold mb-8" />

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-serif font-medium text-foreground mb-6"
          style={{ fontSize: 'clamp(28px, 2.8vw, 42px)', lineHeight: 1.1 }}
        >
          Artistry in every frame.
        </h2>

        {/* Body */}
        <div ref={bodyRef}>
          <p className="text-muted-foreground leading-relaxed mb-8">
            From fashion editorials to wedding celebrations, we bring a unique
            artistic vision to every shoot. Every image tells a story—your story,
            captured with passion and precision.
          </p>

          {/* CTA Link */}
          <button className="group flex items-center gap-2 text-foreground font-medium hover:text-gold transition-colors">
            <span className="link-underline">Meet the team</span>
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
}