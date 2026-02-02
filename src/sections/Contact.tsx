import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Clock, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left text animation
      gsap.fromTo(
        leftRef.current,
        { x: -24, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1,
          },
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { x: 24, opacity: 0, scale: 0.99 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Thank you! We\'ll be in touch within 48 hours.');
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-90 bg-background py-24 lg:py-32 px-6 lg:px-12 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Text */}
          <div ref={leftRef}>
            <h2
              className="font-serif font-medium text-foreground mb-6"
              style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', lineHeight: 1.1 }}
            >
              Let&apos;s create something beautiful.
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-10">
              Tell us about your shoot requirements. We&apos;ll reply within 48 hours
              with availability and next steps.
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-muted-foreground/50 text-sm mb-1">Email</p>
                  <a
                    href="mailto:dsrphotosvideos@gmail.com"
                    className="text-foreground hover:text-gold transition-colors"
                  >
                    dsrphotosvideos@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-muted-foreground/50 text-sm mb-1">Location</p>
                  <p className="text-foreground">
                    No 2 First Floor, K.K Pudur, Back to Kannan Department Store,<br />
                    Manian Velappar 6th Street, Saibaba Colony,<br />
                    Coimbatore-641011, Tamil Nadu
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-muted-foreground/50 text-sm mb-1">Response time</p>
                  <p className="text-foreground">1–2 business days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div ref={formRef}>
            <form
              onSubmit={handleSubmit}
              className="card-elegant p-8 lg:p-10"
            >
              <div className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    className="bg-card border-border focus:border-gold focus:ring-gold text-foreground"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="bg-card border-border focus:border-gold focus:ring-gold text-foreground"
                  />
                </div>

                {/* Event Date */}
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-foreground">
                    Event Date
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    className="bg-card border-border focus:border-gold focus:ring-gold text-foreground"
                  />
                </div>

                {/* Event Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-foreground">
                    Event Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="City, State / Country"
                    className="bg-card border-border focus:border-gold focus:ring-gold text-foreground"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground">
                    Tell us about your shoot
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Share your vision, shoot type (fashion/wedding/portrait), or any questions..."
                    rows={4}
                    className="bg-card border-border focus:border-gold focus:ring-gold resize-none text-foreground"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-pill bg-gold text-white hover:bg-gold-dark flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Request availability
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}