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
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-auto lg:h-screen overflow-hidden lg:overflow-hidden z-20 bg-background transition-colors duration-500 py-16 lg:py-0 px-6 lg:px-0"
    >
      <div className="max-w-7xl mx-auto lg:max-w-none h-full relative flex flex-col lg:block">
        {/* Left Image Card */}
        <div
          ref={imageRef}
          className="relative lg:absolute rounded-2xl overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.10)] mb-8 lg:mb-0"
          style={{
            left: 'var(--lg-left, auto)',
            top: 'var(--lg-top, auto)',
            width: 'var(--lg-width, 100%)',
            height: 'var(--lg-height, 50vh)',
          }}
        >
          <style>{`
            @media (min-width: 1024px) {
              .lg\\:absolute:first-child {
                --lg-left: 6vw;
                --lg-top: 14vh;
                --lg-width: 54vw;
                --lg-height: 72vh;
              }
            }
          `}</style>
          <img
            src="/images/philosophy_bride_portrait.jpg"
            alt="Bridal portrait"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Text Card */}
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
              .card-elegant {
                --lg-text-left: 62vw;
                --lg-text-top: 26vh;
                --lg-text-width: 32vw;
                --lg-text-min-width: 320px;
              }
            }
          `}</style>
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
      </div>
    </section>
  );
}