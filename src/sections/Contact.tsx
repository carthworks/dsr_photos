import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Clock, Send, Navigation, DollarSign } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import DatePicker from '@/components/DatePicker';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
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
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Format selected dates for email
    const datesText = selectedDates.length > 0
      ? selectedDates.map(d => new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })).join(', ')
      : 'Not specified';

    // Construct Mailto Body
    const subject = `Inquiry: ${data.eventType || 'New Project'} - ${data.name}`;
    const body = `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Event Date(s): ${datesText}
Location: ${data.location}
Event Type: ${data.eventType}
Budget Range: ${data.budget}
Referral: ${data.referral}

Message:
${data.message}
    `;

    // Simulate network delay for UX
    await new Promise(resolve => setTimeout(resolve, 800));

    // Open Mail Client
    window.open(`mailto:tkarthikeyan@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);

    toast.success('Opening your email client to send the inquiry!');
    setIsSubmitting(false);
    setSelectedDates([]);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-90 bg-background py-24 lg:py-32 px-6 lg:px-12 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column - Text */}
          <div ref={leftRef}>
            <span className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-4 block">
              Get in touch
            </span>
            <h2
              className="font-serif font-medium text-foreground mb-6"
              style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', lineHeight: 1.1 }}
            >
              Let&apos;s create something beautiful.
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-10 max-w-md">
              Whether it's a destination wedding, an editorial shoot, or a portrait session,
              we'd love to hear your story. Fill out the form, and we'll be in touch within 24 hours.
            </p>

            {/* Contact Details */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-gold" />
                </div>
                <div>
                  <p className="text-muted-foreground/50 text-xs uppercase tracking-wider mb-1">Email directly</p>
                  <a
                    href="mailto:tkarthikeyan@gmail.com"
                    className="text-foreground text-lg hover:text-gold transition-colors font-serif"
                  >
                    tkarthikeyan@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-gold" />
                </div>
                <div>
                  <p className="text-muted-foreground/50 text-xs uppercase tracking-wider mb-1">Studio</p>
                  <p className="text-foreground leading-relaxed">
                    No 2 First Floor, K.K Pudur,<br />
                    Manian Velappar 6th Street, Saibaba Colony,<br />
                    Coimbatore-641011, Tamil Nadu
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={20} className="text-gold" />
                </div>
                <div>
                  <p className="text-muted-foreground/50 text-xs uppercase tracking-wider mb-1">Office Hours</p>
                  <p className="text-foreground">Mon – Fri: 9am – 6pm<br />Sat: By appointment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div ref={formRef}>
            <form
              onSubmit={handleSubmit}
              className="card-elegant p-8 lg:p-10 border border-gold/20 shadow-2xl bg-card/50 backdrop-blur-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground text-xs uppercase tracking-wider">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    required
                    className="bg-background border-border focus:border-gold focus:ring-gold h-11"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground text-xs uppercase tracking-wider">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="hello@example.com"
                    required
                    className="bg-background border-border focus:border-gold focus:ring-gold h-11"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground text-xs uppercase tracking-wider">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91..."
                    className="bg-background border-border focus:border-gold focus:ring-gold h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventType" className="text-foreground text-xs uppercase tracking-wider">
                    Shoot Type *
                  </Label>
                  <select
                    id="eventType"
                    name="eventType"
                    required
                    defaultValue=""
                    className="flex h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Fashion Editorial">Fashion Editorial</option>
                    <option value="Portrait Session">Portrait Session</option>
                    <option value="Event Coverage">Event Coverage</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Date */}
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-foreground text-xs uppercase tracking-wider">
                    Event Date(s)
                  </Label>
                  <DatePicker
                    selectedDates={selectedDates}
                    onDatesChange={setSelectedDates}
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-foreground text-xs uppercase tracking-wider">
                    Venue / Location
                  </Label>
                  <div className="relative">
                    <Navigation size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="location"
                      name="location"
                      placeholder="City or Venue"
                      className="bg-background border-border focus:border-gold focus:ring-gold pl-10 h-11"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Budget */}
                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-foreground text-xs uppercase tracking-wider">
                    Budget Range
                  </Label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="budget"
                      name="budget"
                      placeholder="Estimated budget"
                      className="bg-background border-border focus:border-gold focus:ring-gold pl-10 h-11"
                    />
                  </div>
                </div>

                {/* Referral */}
                <div className="space-y-2">
                  <Label htmlFor="referral" className="text-foreground text-xs uppercase tracking-wider">
                    How did you find us?
                  </Label>
                  <Input
                    id="referral"
                    name="referral"
                    placeholder="Google, Instagram, Referral..."
                    className="bg-background border-border focus:border-gold focus:ring-gold h-11"
                  />
                </div>
              </div>


              {/* Message */}
              <div className="space-y-2 mb-8">
                <Label htmlFor="message" className="text-foreground text-xs uppercase tracking-wider">
                  Tell us your story *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Share your vision, any specific requests, or what you love most about our work..."
                  rows={4}
                  required
                  className="bg-background border-border focus:border-gold focus:ring-gold resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-pill bg-gold text-white hover:bg-gold-dark flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed h-12 text-sm font-medium tracking-wide"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Preparing...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Check Availability
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}