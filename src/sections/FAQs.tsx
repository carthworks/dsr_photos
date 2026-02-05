import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
    {
        question: "What is your photography style?",
        answer: "We blend editorial fashion aesthetics with candid, emotional storytelling. We focus on capturing the in-between moments, the raw emotions, and the stylish details that make your wedding unique. Think of it as 'Vogue meets documentary'."
    },
    {
        question: "Do you travel for weddings?",
        answer: "Absolutely! We love destination weddings. We are based in Chennai but available worldwide. Travel and accommodation fees are customized based on the location."
    },
    {
        question: "How many images will we receive?",
        answer: "For a full wedding day (8-10 hours), you can expect between 500-800 fully edited, high-resolution images. We value quality over quantity, ensuring every image in your gallery is perfect."
    },
    {
        question: "When will we get our photos?",
        answer: "You will receive a sneak peek of 20-30 highlight images within 1 week of your wedding. The full gallery will be delivered within 6-8 weeks, depending on the season."
    },
    {
        question: "Do you offer albums?",
        answer: "Yes, we offer premium, hand-crafted heirloom albums. These are available in various leather and linen covers and are designed to last generations."
    }
];

export default function FAQs() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            // Heading Fade In
            gsap.fromTo(
                headingRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    }
                }
            );

            // List Fade In
            gsap.fromTo(
                listRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    }
                }
            );
        });

        return () => mm.revert();
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="faq" className="relative z-30 bg-background py-24 lg:py-32 px-6 lg:px-12">
            <div className="max-w-4xl mx-auto">
                <div ref={headingRef} className="text-center mb-16">
                    <span className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-4 block">
                        Common Inquiries
                    </span>
                    <h2 className="font-serif text-4xl lg:text-5xl text-foreground">
                        Everything you need to know.
                    </h2>
                </div>

                <div ref={listRef} className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border-b border-border transition-all duration-300 relative ${openIndex === index ? 'bg-secondary/30' : 'bg-transparent'}`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between py-6 text-left group relative z-10 cursor-pointer"
                                aria-expanded={openIndex === index}
                                aria-controls={`faq-answer-${index}`}
                            >
                                <span className={`font-serif text-xl transition-colors duration-300 pr-4 ${openIndex === index ? 'text-gold' : 'text-foreground group-hover:text-gold'}`}>
                                    {faq.question}
                                </span>
                                <span className={`p-2 rounded-full border transition-all duration-300 flex-shrink-0 ${openIndex === index ? 'border-gold text-gold rotate-180' : 'border-muted-foreground text-muted-foreground group-hover:border-gold'}`}>
                                    {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                                </span>
                            </button>

                            <div
                                id={`faq-answer-${index}`}
                                className={`overflow-hidden transition-all duration-500 ease-in-out`}
                                style={{
                                    maxHeight: openIndex === index ? '500px' : '0',
                                    opacity: openIndex === index ? 1 : 0,
                                    paddingBottom: openIndex === index ? '1.5rem' : '0'
                                }}
                            >
                                <p className="text-muted-foreground leading-relaxed pr-8">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
