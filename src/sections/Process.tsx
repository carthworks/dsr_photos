import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Phone, Calendar, Images } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Phone,
    label: '1. Discuss your vision',
    description: 'We start with a detailed consultation to understand your style, preferences, and the story you want to tell.'
  },
  {
    icon: Calendar,
    label: '2. Plan the shoot',
    description: 'From location scouting to outfit coordination, we handle every detail to ensure a seamless experience.'
  },
  {
    icon: Images,
    label: '3. Receive your masterpiece',
    description: 'Our professional editing team crafts each image into a piece of art, delivered in a stunning digital gallery.'
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textCardRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

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
        { x: '40vw', opacity: 0, rotate: -1 },
        { x: 0, opacity: 1, rotate: 0, ease: 'none' },
        0.05
      );

      // Steps animation
      const stepItems = stepsRef.current?.querySelectorAll('.step-item');
      if (stepItems) {
        scrollTl.fromTo(
          stepItems,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, ease: 'none' },
          0.15
        );
      }

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
      id="process"
      className="relative w-full h-auto lg:h-screen overflow-hidden lg:overflow-hidden z-40 bg-background transition-colors duration-500 py-16 lg:py-0 px-6 lg:px-0"
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
              #process .relative.lg\\:absolute:first-child {
                --lg-left: 6vw;
                --lg-top: 14vh;
                --lg-width: 54vw;
                --lg-height: 72vh;
              }
            }
          `}</style>
          <img
            src="/images/process_couple_laughing.jpg"
            alt="Couple laughing"
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
              #process .card-elegant {
                --lg-text-left: 62vw;
                --lg-text-top: 20vh;
                --lg-text-width: 32vw;
                --lg-text-min-width: 320px;
              }
            }
          `}</style>
          {/* Gold Rule */}
          <div className="w-11 h-0.5 bg-gold mb-8" />

          <h2
            className="font-serif font-medium text-foreground mb-6"
            style={{ fontSize: 'clamp(26px, 2.6vw, 40px)', lineHeight: 1.1 }}
          >
            Our Creative Process.
          </h2>

          {/* Body */}
          <p className="text-muted-foreground leading-relaxed mb-8">
            From concept to delivery, we work closely with you to ensure every
            shot exceeds your expectations. Fashion, wedding, or any special moment—we&apos;ve got you covered.
          </p>

          {/* Steps */}
          <div ref={stepsRef} className="space-y-6 mb-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="step-item group flex items-start gap-4 text-foreground"
              >
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  <step.icon size={20} className="text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">{step.label}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Link - Scroll to Contact */}
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-2 text-foreground font-medium hover:text-gold transition-colors"
          >
            <span className="link-underline">Start your project</span>
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