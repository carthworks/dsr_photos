import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Calendar, Sparkles, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    icon: Sparkles,
    name: 'Portrait',
    description: 'Individual or couple shoots',
    price: '₹15,000',
    features: [
      '3 hours of shoot time',
      'Professional editing',
      'Online gallery',
      'High-res digital files',
      '2 outfit changes',
    ],
    popular: false,
  },
  {
    icon: Heart,
    name: 'Wedding',
    description: 'Full wedding coverage',
    price: '₹75,000',
    features: [
      'Full-day coverage',
      'Candid & traditional',
      'Online gallery',
      'Album design',
      'Pre-wedding consultation',
      'Cinematic video',
    ],
    popular: true,
  },
  {
    icon: Calendar,
    name: 'Fashion',
    description: 'Editorial & commercial',
    price: '₹25,000',
    features: [
      '4 hours of shoot time',
      'Studio or location',
      'Professional retouching',
      'High-res digital files',
      'Commercial usage rights',
    ],
    popular: false,
  },
];

export default function Packages() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedPackage, setSelectedPackage] = useState<typeof packages[0] | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
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
      const cards = cardsRef.current?.querySelectorAll('.package-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
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
    <>
      <section
        ref={sectionRef}
        id="packages"
        className="relative z-60 bg-background py-24 lg:py-32 px-6 lg:px-12 transition-colors duration-500"
      >
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div ref={headingRef} className="text-center mb-16">
            <h2
              className="font-serif font-medium text-foreground mb-4"
              style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', lineHeight: 1.1 }}
            >
              Choose what fits your day.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All packages include professional editing, high-resolution files, and
              a pre-shoot consultation.
            </p>
          </div>

          {/* Package Cards */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`package-card relative card-elegant p-8 lg:p-10 transition-all duration-300 hover:-translate-y-1.5 ${pkg.popular ? 'ring-2 ring-gold' : ''
                  }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-white text-xs uppercase tracking-[0.18em] rounded-full">
                    Popular
                  </span>
                )}

                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                  <pkg.icon size={22} className="text-gold" />
                </div>

                {/* Name */}
                <h3 className="font-serif text-2xl text-foreground mb-2">
                  {pkg.name}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>

                {/* Price */}
                <div className="font-serif text-3xl text-gold mb-6">
                  {pkg.price}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3 text-sm">
                      <Check size={16} className="text-gold mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => setSelectedPackage(pkg)}
                  className={`w-full btn-pill ${pkg.popular
                      ? 'bg-gold text-white hover:bg-gold-dark'
                      : 'btn-pill-outline'
                    }`}
                >
                  Inquire Now
                </button>
              </div>
            ))}
          </div>

          {/* Custom Quote CTA */}
          <div className="text-center mt-12">
            <button
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-foreground font-medium hover:text-gold transition-colors link-underline"
            >
              Request a custom quote
            </button>
          </div>
        </div>
      </section>

      {/* Inquiry Dialog */}
      <Dialog open={!!selectedPackage} onOpenChange={() => setSelectedPackage(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              Inquire about {selectedPackage?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <p className="text-muted-foreground">
              Interested in the {selectedPackage?.name} package starting at {selectedPackage?.price}?
            </p>
            <p className="text-sm text-muted-foreground">
              Fill out the contact form and we&apos;ll get back to you within 48 hours with availability and next steps.
            </p>
            <button
              onClick={() => {
                setSelectedPackage(null);
                const element = document.querySelector('#contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full btn-pill bg-gold text-white hover:bg-gold-dark"
            >
              Go to Contact Form
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}