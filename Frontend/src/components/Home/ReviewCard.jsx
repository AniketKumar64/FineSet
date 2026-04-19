import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Star, Quote } from 'lucide-react';

const reviews1 = [
    { name: "Daniel Carter", role: "Verified Buyer", text: "The craftsmanship is exceptional. The weight, finish, and detailing feel truly premium. It’s become my everyday watch." },
    { name: "Arjun Mehta", role: "Watch Enthusiast", text: "I’ve owned several watches, but this one stands out for its precision and elegant design. Worth every penny." },
    { name: "Liam Thompson", role: "Verified Buyer", text: "From packaging to the watch itself, everything felt carefully thought out. The quality exceeded my expectations." },
    { name: "Rohit Sharma", role: "Verified Buyer", text: "Minimal, timeless, and beautifully crafted. I receive compliments every time I wear it." },
];

const reviews2 = [
    { name: "Ethan Brooks", role: "Collector", text: "The attention to detail is impressive. You can feel the quality the moment you put it on your wrist." },
    { name: "Kunal Verma", role: "Verified Buyer", text: "Delivery was smooth and the watch looks even better in person. Elegant without being flashy." },
    { name: "Oliver Hayes", role: "Style Consultant", text: "A perfect balance of modern design and classic watchmaking. This brand understands restraint." },
    { name: "Siddharth Jain", role: "Verified Buyer", text: "Solid build, refined dial, and comfortable fit. Easily one of my best purchases this year." },
];

const ReviewCard = ({ review }) => (
    <div className="w-[450px] p-10 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 backdrop-blur-md mx-6 flex-shrink-0 group hover:border-[#D4AF37]/30 transition-all duration-700">
        <div className="flex justify-between items-start mb-8">
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-[#D4AF37] text-[#D4AF37] opacity-80" />
                ))}
            </div>
            <Quote size={24} className="text-[#D4AF37] opacity-10 group-hover:opacity-30 transition-opacity" />
        </div>
        
        <p className="text-zinc-300 text-lg font-light leading-relaxed mb-8 italic tracking-wide">
            "{review.text}"
        </p>
        
        <div className="flex items-center gap-5">
            <div className="relative">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-sm font-bold text-white bg-zinc-900 group-hover:border-[#D4AF37]/50 transition-colors">
                    {review.name.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#D4AF37] rounded-full border-2 border-black flex items-center justify-center">
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                </div>
            </div>
            <div>
                <h4 className="text-white text-sm font-semibold tracking-widest uppercase">{review.name}</h4>
                <p className="text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase opacity-60">{review.role}</p>
            </div>
        </div>
    </div>
);

const Reviews = () => {
    const containerRef = useRef(null);
    const row1Ref = useRef(null);
    const row2Ref = useRef(null);

    useGSAP(() => {
        // Animation for Row 1
        const row1 = gsap.to(row1Ref.current, {
            x: "-50%",
            duration: 50,
            ease: "none",
            repeat: -1,
        });

        // Animation for Row 2
        const row2 = gsap.fromTo(row2Ref.current,
            { x: "-50%" },
            {
                x: "0%",
                duration: 55,
                ease: "none",
                repeat: -1,
            }
        );

        // Hover effect to slow down/pause
        const addHoverEvents = (ref, animation) => {
            ref.current.addEventListener('mouseenter', () => gsap.to(animation, { timeScale: 0.2, duration: 1 }));
            ref.current.addEventListener('mouseleave', () => gsap.to(animation, { timeScale: 1, duration: 1 }));
        };

        addHoverEvents(row1Ref, row1);
        addHoverEvents(row2Ref, row2);
        
        // Header entrance
        gsap.from(".review-header", {
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
                trigger: ".review-header",
                start: "top 90%",
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="w-full bg-[#050505] py-32 overflow-hidden relative">
            {/* Background Branding Detail */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bold text-white/[0.02] pointer-events-none select-none tracking-tighter">
                VOICES
            </div>

            {/* Gradient Masks (Smoother Edges) */}
            <div className="absolute top-0 left-0 w-64 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>

            <div className="review-header text-center mb-24 px-6 relative z-20">
                <span className="text-[#D4AF37] text-[10px] tracking-[0.5em] uppercase mb-4 block">Testimonials</span>
                <h2 className="text-5xl md:text-8xl font-heading font-bold text-white tracking-tighter">
                    CLIENT <span className="text-zinc-600 italic font-light">REVIEWS</span>
                </h2>
            </div>

            <div className="flex flex-col gap-12 relative z-20">
                {/* Row 1 */}
                <div ref={row1Ref} className="flex w-max cursor-pointer">
                    {[...reviews1, ...reviews1].map((review, i) => (
                        <ReviewCard key={`row1-${i}`} review={review} />
                    ))}
                </div>

                {/* Row 2 */}
                <div ref={row2Ref} className="flex w-max cursor-pointer">
                    {[...reviews2, ...reviews2].map((review, i) => (
                        <ReviewCard key={`row2-${i}`} review={review} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;