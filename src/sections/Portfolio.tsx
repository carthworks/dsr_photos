import { useRef, useState, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Filter, Play } from 'lucide-react';
import ImageLightbox from '@/components/ImageLightbox';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Wedding', 'Fashion', 'Portrait', 'Films', 'Details'];

interface PortfolioItem {
  src: string;
  alt: string;
  category: string;
  type?: 'image' | 'video';
  poster?: string;
  id?: string;
}

const initialImages: PortfolioItem[] = [
  { src: 'https://www.youtube.com/watch?v=DtFWWYPnxjQ', alt: 'Loading...', category: 'Films', type: 'video' },
  { src: '/images/portfolio_ceremony_walk.jpg', alt: 'Wedding ceremony', category: 'Wedding', type: 'image' },
  { src: '/images/slider_fashion.jpg', alt: 'Fashion editorial', category: 'Fashion', type: 'image' },
  { src: '/images/portfolio_dance.jpg', alt: 'First dance', category: 'Wedding', type: 'image' },
  { src: '/images/slider_portrait.jpg', alt: 'Portrait session', category: 'Portrait', type: 'image' },
  { src: '/images/portfolio_vows.jpg', alt: 'Exchanging vows', category: 'Wedding', type: 'image' },
  { src: '/images/details_rings_macro.jpg', alt: 'Wedding rings', category: 'Details', type: 'image' },
  { src: 'https://www.youtube.com/watch?v=2w6yFfs-H90', alt: 'Loading...', category: 'Films', type: 'video' },
  { src: '/images/process_couple_laughing.jpg', alt: 'Couple portrait', category: 'Portrait', type: 'image' },
  { src: '/images/slider_wedding.jpg', alt: 'Traditional wedding', category: 'Wedding', type: 'image' },
  { src: '/images/hero_couple_grass.jpg', alt: 'Golden hour portrait', category: 'Portrait', type: 'image' },
  { src: '/images/philosophy_bride_portrait.jpg', alt: 'Bridal portrait', category: 'Wedding', type: 'image' },
  { src: '/images/journal_1.jpg', alt: 'Getting ready', category: 'Details', type: 'image' },
  { src: '/images/journal_2.jpg', alt: 'Venue setup', category: 'Details', type: 'image' },
  { src: 'https://www.youtube.com/watch?v=_p_YmEtGZmc', alt: 'Loading...', category: 'Films', type: 'video' }
];

// Helper to extract YouTube video ID
function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// Helper to get YouTube thumbnail
function getYouTubeThumbnail(url: string) {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : '';
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const textCardRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const [portfolioImages, setPortfolioImages] = useState<PortfolioItem[]>(initialImages);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch YouTube Titles
  useEffect(() => {
    const fetchTitles = async () => {
      const updatedImages = await Promise.all(
        initialImages.map(async (item) => {
          if (item.type === 'video' && item.src.includes('youtube') && item.alt === 'Loading...') {
            try {
              const res = await fetch(`https://noembed.com/embed?url=${item.src}`);
              const data = await res.json();
              if (data.title) {
                return { ...item, alt: data.title };
              }
            } catch (error) {
              console.error('Failed to fetch video title:', error);
            }
          }
          return item;
        })
      );
      setPortfolioImages(updatedImages);
    };

    fetchTitles();
  }, []);

  const filteredImages = activeCategory === 'All'
    ? portfolioImages
    : portfolioImages.filter(img => img.category === activeCategory);

  useGSAP(() => {
    // ... GSAP logic ...
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

      // Left image card entrance
      scrollTl.fromTo(
        leftImageRef.current,
        { x: '-60vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Right image card entrance
      scrollTl.fromTo(
        rightImageRef.current,
        { x: '60vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Left text card entrance
      scrollTl.fromTo(
        textCardRef.current,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // EXIT (70%-100%)
      scrollTl.fromTo(
        [leftImageRef.current, rightImageRef.current],
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


  useGSAP(() => {
    // ... Gallery animation ...
    const gallery = galleryRef.current;
    if (!gallery) return;

    const items = gallery.querySelectorAll('.gallery-item');
    gsap.fromTo(
      items,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gallery,
          start: 'top 80%',
        },
      }
    );
  }, { scope: galleryRef, dependencies: [filteredImages] });

  const openLightbox = useCallback((index: number) => {
    setSelectedImageIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);


  return (
    <>
      <section
        ref={sectionRef}
        id="portfolio"
        className="relative w-full h-auto lg:h-screen overflow-hidden lg:overflow-hidden z-40 bg-background transition-colors duration-500 py-16 lg:py-0 px-6 lg:px-0"
      >
        <div className="max-w-7xl mx-auto lg:max-w-none h-full relative flex flex-col lg:block">
          {/* Left Image Card */}
          <div
            ref={leftImageRef}
            className="relative lg:absolute rounded-2xl overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.10)] mb-8 lg:mb-0"
            style={{
              left: 'var(--lg-left, auto)',
              top: 'var(--lg-top, auto)',
              width: 'var(--lg-width, 100%)',
              height: 'var(--lg-height, 40vh)',
            }}
          >
            {/* Same styles */}
            <style>{`
              @media (min-width: 1024px) {
                #portfolio .relative.lg\\:absolute:first-of-type {
                  --lg-left: 6vw;
                  --lg-top: 14vh;
                  --lg-width: 32vw;
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

          {/* Text Card */}
          <div
            ref={textCardRef}
            className="relative lg:absolute card-elegant p-8 lg:p-12 mb-8 lg:mb-0 z-10"
            style={{
              left: 'var(--lg-text-left, auto)',
              top: 'var(--lg-text-top, auto)',
              width: 'var(--lg-text-width, 100%)',
              minWidth: 'var(--lg-text-min-width, 0)',
            }}
          >
            <style>{`
              @media (min-width: 1024px) {
                #portfolio .card-elegant {
                  --lg-text-left: 42vw;
                  --lg-text-top: 20vh;
                  --lg-text-width: 32vw;
                  --lg-text-min-width: 320px;
                }
              }
            `}</style>
            <span className="inline-block px-4 py-1.5 border border-gold text-gold text-xs uppercase tracking-[0.18em] rounded-full mb-8">
              Selected work
            </span>
            <h2
              className="font-serif font-medium text-foreground mb-6"
              style={{ fontSize: 'clamp(26px, 2.6vw, 40px)', lineHeight: 1.1 }}
            >
              Selected work.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              From fashion editorials to wedding celebrations—each project is unique,
              and the result is always crafted with care.
            </p>
            <button
              onClick={() => {
                const gallery = document.getElementById('gallery-section');
                gallery?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-2 text-foreground font-medium hover:text-gold transition-colors"
            >
              <span className="link-underline">Explore the portfolio</span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* Right Image Card */}
          <div
            ref={rightImageRef}
            className="relative lg:absolute rounded-2xl overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.10)] cursor-pointer image-hover mb-8 lg:mb-0"
            style={{
              left: 'var(--lg-right-left, auto)',
              top: 'var(--lg-right-top, auto)',
              width: 'var(--lg-right-width, 100%)',
              height: 'var(--lg-right-height, 40vh)',
            }}
            onClick={() => openLightbox(0)}
          >
            <style>{`
              @media (min-width: 1024px) {
                #portfolio .relative.lg\\:absolute:last-of-type {
                  --lg-right-left: 78vw;
                  --lg-right-top: 14vh;
                  --lg-right-width: 18vw;
                  --lg-right-height: 72vh;
                }
              }
            `}</style>
            <img
              src="/images/portfolio_ceremony_walk.jpg"
              alt="Wedding ceremony"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Full Portfolio Gallery - Flowing Section */}
      <section id="gallery-section" className="relative z-40 bg-background py-24 px-6 lg:px-12 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          {/* Filter Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-4">
            <h3 className="font-serif text-3xl text-foreground">Our Portfolio</h3>

            {/* Category Filter */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border text-sm hover:border-gold transition-colors text-foreground"
              >
                <Filter size={16} />
                {activeCategory}
              </button>

              {isFilterOpen && (
                <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-xl shadow-lg p-2 min-w-[150px] z-10 transition-colors">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${activeCategory === cat
                        ? 'bg-gold/10 text-gold'
                        : 'hover:bg-muted-foreground/10 text-foreground'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Masonry Grid */}
          <div
            ref={galleryRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filteredImages.map((image, index) => {
              // Determine poster image
              let displaySrc = image.src;
              if (image.type === 'video') {
                if (image.poster) {
                  displaySrc = image.poster;
                } else if (image.src.includes('youtube') || image.src.includes('youtu.be')) {
                  // Auto-fetch YouTube thumbnail if poster is missing
                  displaySrc = getYouTubeThumbnail(image.src);
                }
              }

              return (
                <div
                  key={`${image.src}-${index}`}
                  className={`gallery-item relative rounded-2xl overflow-hidden shadow-lg cursor-pointer image-hover group ${index === 0 ? 'col-span-2 row-span-2' :
                    index === 3 ? 'col-span-2' :
                      index === 7 ? 'row-span-2' : ''
                    }`}
                  style={{
                    height: index === 0 ? '500px' :
                      index === 3 ? '250px' :
                        index === 7 ? '500px' : '250px'
                  }}
                  onClick={() => openLightbox(portfolioImages.findIndex(img => img.src === image.src))}
                >
                  <img
                    src={displaySrc}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Overlay for all items */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="text-xs uppercase tracking-[0.18em] text-gold mb-1 block">
                        {image.category}
                      </span>
                      <h4 className="font-serif text-lg">{image.alt}</h4>
                    </div>
                  </div>

                  {/* Video Play Icon Overlay */}
                  {image.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play size={24} className="text-white fill-white ml-1" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Image Count */}
          <p className="text-center text-muted-foreground text-sm mt-8">
            Showing {filteredImages.length} of {portfolioImages.length} images
          </p>
        </div>
      </section>

      {/* Advanced Image Lightbox */}
      <ImageLightbox
        images={filteredImages}
        currentIndex={selectedImageIndex !== null ? filteredImages.findIndex(img => img.src === portfolioImages[selectedImageIndex].src) : 0}
        isOpen={selectedImageIndex !== null}
        onClose={closeLightbox}
        onNavigate={(index) => {
          const globalIndex = portfolioImages.findIndex(img => img.src === filteredImages[index].src);
          setSelectedImageIndex(globalIndex);
        }}
      />
    </>
  );
}