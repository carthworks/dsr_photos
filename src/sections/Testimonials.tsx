import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Amazing work! Our wedding photos came out beautifully. Every emotion was captured perfectly.",
    names: 'Arun & Priya',
    location: 'Coimbatore',
  },
  {
    quote:
      'Professional team with great attention to detail. Our fashion shoot exceeded all expectations.',
    names: 'Riya Sharma',
    location: 'Chennai',
  },
  {
    quote:
      'Made us feel so comfortable during the shoot. The final photos were absolutely stunning!',
    names: 'Karthik & Meera',
    location: 'Bangalore',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1,
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.testimonial-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              end: 'top 45%',
              scrub: 1,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-70 bg-background py-24 lg:py-32 px-6 lg:px-12 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <h2
            className="font-serif font-medium text-foreground"
            style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', lineHeight: 1.1 }}
          >
            Words from our clients.
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card card-elegant p-8 lg:p-10 relative"
            >
              {/* Quote Icon */}
              <Quote
                size={32}
                className="text-gold/30 mb-6"
                fill="currentColor"
              />

              {/* Quote Text */}
              <p className="font-serif text-lg lg:text-xl text-foreground leading-relaxed mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="mt-auto">
                <p className="font-medium text-foreground">
                  {testimonial.names}
                </p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}