import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    image: '/images/journal_1.jpg',
    title: 'How to prepare for your photoshoot',
    date: 'January 2026',
    excerpt:
      'Tips and tricks for looking your best and feeling confident in front of the camera.',
  },
  {
    image: '/images/journal_2.jpg',
    title: 'Choosing the perfect location',
    date: 'December 2025',
    excerpt:
      'A guide to selecting the ideal backdrop for your wedding or portrait shoot.',
  },
  {
    image: '/images/journal_3.jpg',
    title: 'Fashion photography essentials',
    date: 'November 2025',
    excerpt:
      'What you need to know before booking a professional fashion photoshoot.',
  },
];

export default function Journal() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1,
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.article-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
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
      id="journal"
      className="relative z-80 bg-background py-24 lg:py-32 px-6 lg:px-12 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <h2
            className="font-serif font-medium text-foreground mb-4 md:mb-0"
            style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', lineHeight: 1.1 }}
          >
            Notes on love, light, and planning.
          </h2>
          <button className="group flex items-center gap-2 text-foreground font-medium hover:text-gold transition-colors flex-shrink-0">
            <span className="link-underline">Read the journal</span>
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Article Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {articles.map((article, index) => (
            <article
              key={index}
              className="article-card group cursor-pointer"
            >
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden mb-6 image-hover" style={{ height: '240px' }}>
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-[0.18em] mb-2 block">
                  {article.date}
                </span>
                <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-gold transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}