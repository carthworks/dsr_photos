import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const upcomingTrips = [
    { city: 'Paris, France', date: 'April 2026', availability: '2 slots available' },
    { city: 'Bali, Indonesia', date: 'August 2026', availability: 'Fully booked' },
    { city: 'Santorini, Greece', date: 'September 2026', availability: '1 slot available' },
    { city: 'Jaipur, India', date: 'December 2026', availability: 'Open for booking' },
];

export default function Destinations() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 1024px)", () => {
                gsap.fromTo(
                    containerRef.current,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 60%"
                        }
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="destinations" className="relative z-30 bg-background py-24 lg:py-32 px-6 lg:px-12 overflow-hidden">
            <div ref={containerRef} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Text Side */}
                <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-4 block">
                        Travel Schedule
                    </span>
                    <h2 className="font-serif text-4xl lg:text-6xl text-foreground mb-8">
                        Global Stories.
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-10 max-w-md">
                        We are available worldwide. Check our travel schedule to see if we'll be in your area, or invite us to your dream destination.
                        <br /><br />
                        Planning a wedding in one of these locations? We offer special rates for travel dates.
                    </p>

                    <div className="space-y-6">
                        {upcomingTrips.map((trip, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-4 border border-border/50 rounded-xl hover:bg-secondary/20 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 text-gold">
                                    <MapPin size={20} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-serif text-lg text-foreground">{trip.city}</h4>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar size={14} />
                                        <span>{trip.date}</span>
                                    </div>
                                </div>
                                <div className="hidden sm:block">
                                    <span className={`text-xs px-3 py-1 rounded-full ${trip.availability.includes('Fully') ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                                        {trip.availability}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            const contact = document.getElementById('contact');
                            contact?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="mt-10 group flex items-center gap-2 text-foreground font-medium hover:text-gold transition-colors"
                    >
                        <span className="link-underline">Inquire about a destination</span>
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </button>
                </div>

                {/* Image Side (Conceptual Map) */}
                <div className="relative">
                    {/* We will use the generated artifact image here if it was real, but for now I'll use a placeholder or the generated one's concept */}
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
                        <div className="absolute inset-0 bg-gold/5 mix-blend-overlay z-10 pointer-events-none"></div>
                        {/* Simulated Map or Image */}
                        <img
                            // src="/images/bucket_list_map.png" // User will need to place the image here or I can use a color block
                            src="/images/bucket_list_map_1770112665671.png"
                            alt="World Map Destinations"
                            className="w-full h-full object-cover grayscale-[20%] sepia-[10%]"
                        // Using a placeholder service if the local image isn't moved yet, but assuming user will put it there.
                        // For safety, I'll use a placeholder from unsplash if I can't guarantee the file move, but the prompt implies I can generate assets. 
                        // I'll stick to a local path and tell the user to move the artifact.
                        />

                        {/* Floating Pins Animation (CSS only for simplicity) */}
                        <div className="absolute top-[30%] left-[48%] w-3 h-3 bg-gold rounded-full animate-ping" />
                        <div className="absolute top-[30%] left-[48%] w-3 h-3 bg-gold rounded-full border-2 border-white shadow-lg z-20" />

                        <div className="absolute top-[55%] left-[65%] w-3 h-3 bg-gold rounded-full animate-ping delay-700" />
                        <div className="absolute top-[55%] left-[65%] w-3 h-3 bg-gold rounded-full border-2 border-white shadow-lg z-20" />
                    </div>
                </div>

            </div>
        </section>
    );
}
