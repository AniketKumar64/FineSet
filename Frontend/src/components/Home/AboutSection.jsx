import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const heritageRef = useRef(null);

    useGSAP(() => {
        // Heritage Watermark Parallax
        gsap.to(heritageRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            },
            y: -100,
            opacity: 0.03
        });

        // Split word animation
        const text = textRef.current;
        const words = text.innerText.split(' ');
        text.innerHTML = words.map(word => `<span class="inline-block opacity-0 translate-y-10 blur-sm">${word}</span>`).join(' ');

        const spans = text.querySelectorAll('span');

        gsap.to(spans, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "bottom 30%",
                scrub: 1,
            },
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.1,
            ease: "power2.out"
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="w-full min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center py-32 px-6 md:px-20 relative overflow-hidden">
            
            {/* Museum Watermark */}
            <div ref={heritageRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-playfair font-black text-white pointer-events-none z-0 select-none opacity-0">
                HERITAGE
            </div>

            {/* Grain & Grid Layers */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center z-20">
                
                {/* Left Side: Editorial Quote/Detail */}
                <div className="lg:col-span-4 space-y-12">
                    <div className="relative pl-8 border-l border-[#D4AF37]/30">
                        <span className="absolute -left-1 top-0 w-2 h-2 rounded-full bg-[#D4AF37]"></span>
                        <h3 className="text-[#D4AF37] font-[font3] text-sm tracking-[0.3em] uppercase mb-4">Precision Engineering</h3>
                        <p className="text-white/40 text-sm font-[font2] leading-relaxed italic">
                            "Time is the ultimate luxury. We don't just measure it; we honor it through exhaustive manual assembly."
                        </p>
                    </div>
                    
                    <div className="pt-8">
                        <div className="text-[120px] font-playfair font-normal leading-none text-white/5 select-none">
                            1912
                        </div>
                        <p className="text-[10px] text-[#D4AF37] tracking-[0.5em] uppercase font-bold mt-[-20px] pl-2">Est. Foundation</p>
                    </div>
                </div>

                {/* Right Side: Main Narrative */}
                <div className="lg:col-span-8 flex flex-col items-center lg:items-end text-center lg:text-right">
                    <h2 className="text-[#D4AF37] font-[font3] text-xs md:text-sm mb-8 uppercase tracking-[0.5em] opacity-60">
                        The Signature Philosophy
                    </h2>
                    <p ref={textRef} className="text-4xl md:text-6xl lg:text-7xl font-playfair  leading-[1.1] text-white/90 max-w-4xl drop-shadow-2xl">
                        We create <span className="text-white font-normal not-italic">timepieces</span> where <span className="text-white">mechanical</span> soul meets aesthetic <span className="text-[#D4AF37]">perfection</span>. Each heartbeat is a bridge between our <span className="text-white">legacy</span> and your future.
                    </p>
                    
                    <div className="mt-16 flex items-center gap-8 opacity-20 hover:opacity-100 transition-opacity duration-700">
                        <span className="w-24 h-[1px] bg-white"></span>
                        <p className="text-[10px] tracking-[0.4em] uppercase font-[font3]">Scroll To Unveil</p>
                    </div>
                </div>

            </div>

            {/* Background Structural Lines */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/5 -translate-x-[400px]"></div>
                <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/5 translate-x-[400px]"></div>
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#D4AF37]/5"></div>
            </div>
        </section>
    );
};

export default About;
