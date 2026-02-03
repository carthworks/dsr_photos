import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    type: 'image',
    src: '/images/slider_fashion.jpg',
    title: 'Fashion Photography',
    subtitle: 'Editorial elegance, captured',
  },
  {
    type: 'video',
    src: 'https://www.youtube.com/watch?v=oMdvMTIQS9g',
    title: 'Cinematic Stories',
    subtitle: 'Motion that moves hearts',
  },
  {
    type: 'image',
    src: '/images/slider_wedding.jpg',
    title: 'Wedding Memories',
    subtitle: 'Your special day, forever',
  },
  {
    type: 'image',
    src: '/images/slider_portrait.jpg',
    title: 'Portrait Artistry',
    subtitle: 'Your essence, revealed',
  },
  {
    type: 'image',
    src: '/images/hero_couple_grass.jpg',
    title: 'Timeless Moments',
    subtitle: 'Love in every frame',
  },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize Embla Carousel with Autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  // Handle slide change
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Scroll to specific slide
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Toggle autoplay
  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay as { play: () => void; stop: () => void } | undefined;
    if (!autoplay) return;

    if (isPlaying) {
      autoplay.stop();
    } else {
      autoplay.play();
    }
    setIsPlaying(!isPlaying);
  }, [emblaApi, isPlaying]);

  // Entrance and Scroll-driven animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // Headline words entrance
    const words = headlineRef.current?.querySelectorAll('.word');
    if (words) {
      tl.fromTo(
        words,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06 },
        0.3
      );
    }

    // CTA entrance
    tl.fromTo(
      ctaRef.current,
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      '-=0.2'
    );

    // Caption entrance
    tl.fromTo(
      captionRef.current,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      '-=0.3'
    );

    // Controls entrance
    tl.fromTo(
      controlsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      '-=0.3'
    );

    // Scroll-driven exit animation
    const section = sectionRef.current;
    if (section) {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            const words = headlineRef.current?.querySelectorAll('.word');
            if (words && words.length > 0) {
              gsap.set(words, { y: 0, opacity: 1 });
            }
            gsap.set(ctaRef.current, { y: 0, opacity: 1 });
            gsap.set(controlsRef.current, { y: 0, opacity: 1 });
          },
        },
      });

      const exitWords = headlineRef.current?.querySelectorAll('.word');

      // Headline exit
      if (exitWords && exitWords.length > 0) {
        scrollTl.fromTo(
          exitWords,
          { y: 0, opacity: 1 },
          { y: '-18vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }

      // CTA exit
      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

      // Controls exit
      scrollTl.fromTo(
        controlsRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

      // Caption exit
      scrollTl.fromTo(
        captionRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.8
      );
    }
  }, { scope: sectionRef });

  const scrollToPortfolio = () => {
    const element = document.querySelector('#portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle video mute toggle
  const toggleMute = () => {
    // Toggle state first
    setIsMuted(prev => !prev);

    // For native video, the state update handles the prop.
    // For YouTube, we need to send a command to avoid iframe reload.
    // The useEffect below will handle the postMessage when isMuted changes.
  };

  // Sync mute state to YouTube
  useEffect(() => {
    const activeSlide = slides[currentSlide];
    if (activeSlide?.type === 'video' && (activeSlide.src.includes('youtube') || activeSlide.src.includes('youtu.be'))) {
      const iframe = document.getElementById(`youtube-player-${currentSlide}`) as HTMLIFrameElement;
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: isMuted ? 'mute' : 'unMute',
          args: []
        }), '*');
      }
    }
  }, [isMuted, currentSlide]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden z-10"
    >
      {/* Carousel Container */}
      <div className="absolute inset-0 w-full h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`flex-[0_0_100%] min-w-0 relative h-full ${slide.type === 'video' ? 'cursor-pointer' : ''}`}
              onClick={() => {
                if (slide.type === 'video') toggleMute();
              }}
            >
              {slide.type === 'video' ? (
                (() => {
                  const isYouTube = slide.src.includes('youtube') || slide.src.includes('youtu.be');
                  const isActive = index === currentSlide;

                  if (isYouTube) {
                    const videoId = slide.src.match(/(?:youtu\.be\/|youtube\.com\/.*v=|embed\/|v\/)([^&?]*)/)?.[1];

                    return (
                      <div className="w-full h-full relative pointer-events-none overflow-hidden">
                        <iframe
                          id={`youtube-player-${index}`}
                          // Initialize with mute=1 for autoplay. We control unmuting via postMessage to avoid reload.
                          src={`https://www.youtube.com/embed/${videoId}?autoplay=${isActive ? 1 : 0}&mute=1&controls=0&disablekb=1&fs=0&loop=1&modestbranding=1&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&playlist=${videoId}&enablejsapi=1`}
                          className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          style={{
                            pointerEvents: 'none',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                    );
                  }
                  return (
                    <video
                      ref={index === currentSlide ? videoRef : null}
                      src={slide.src}
                      autoPlay
                      muted={isMuted}
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  );
                })()
              ) : (
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              )}
              {/* Dark overlay for text readability - Click through for video interaction */}
              <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>


      {/* Vignette */}
      <div className="vignette" />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        {/* Dynamic Headline based on current slide */}
        <div
          ref={headlineRef}
          className="text-center text-white mb-12 flex flex-col items-center justify-center transition-colors duration-500"
        >
          <h1
            className="font-serif font-medium leading-[1.05] tracking-[-0.01em] mb-6 transition-all duration-500 md:mb-4 lg:-mt-[5vh]"
            style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}
          >
            <span className="word inline-block">{slides[currentSlide]?.title.split(' ')[0]}</span>{' '}
            <span className="word inline-block">{slides[currentSlide]?.title.split(' ')[1]}</span>
          </h1>
          <p className="text-white/80 text-base md:text-xl font-light tracking-wide max-w-[90vw]">
            {slides[currentSlide]?.subtitle}
          </p>
        </div>

        {/* CTA Button */}
        <button
          ref={ctaRef}
          onClick={scrollToPortfolio}
          className="btn-pill-primary md:absolute md:bottom-[20vh]"
        >
          View Portfolio
        </button>

        {/* Micro Caption */}
        <p
          ref={captionRef}
          className="hidden md:block absolute text-white/70 text-sm font-light tracking-wide"
          style={{ bottom: '8vh', right: '4vw' }}
        >
          Fashion, Wedding & More - Coimbatore, Tamil Nadu
        </p>

        {/* Carousel Controls */}
        <div
          ref={controlsRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6"
        >
          {/* Prev/Next Buttons */}
          <button
            onClick={scrollPrev}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all border border-white/10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Slide Indicators */}
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-300 ${index === currentSlide ? 'w-8 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentSlide && (
                  <div
                    ref={progressRef}
                    className="absolute inset-0 bg-gold origin-left"
                    style={{
                      animation: isPlaying ? 'progress 5s linear' : 'none',
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={scrollNext}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={toggleAutoplay}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all ml-2"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>

          {/* Video Mute Button (only show when video slide is active) */}
          {slides[currentSlide]?.type === 'video' && (
            <button
              onClick={toggleMute}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          )}
        </div>
      </div>

      {/* Progress Animation CSS */}
      <style>{`
        @keyframes progress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section >
  );
}