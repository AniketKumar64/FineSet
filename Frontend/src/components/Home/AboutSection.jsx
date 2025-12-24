
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        const text = textRef.current;
        const words = text.innerText.split(' ');
        text.innerHTML = words.map(word => `<span class="inline-block opacity-0 translate-y-10">${word}</span>`).join(' ');

        const spans = text.querySelectorAll('span');

        gsap.to(spans, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "bottom 20%",
                scrub: 1,
            },
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: "power2.out"
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="w-full min-h-screen bg-black text-white flex flex-col md:flex-row items-center justify-center py-24 px-6 md:px-20 relative overflow-hidden">
            {/* Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

            <div className="max-w-6xl">
               <h2 className="text-3xl md:text-6xl text-white logo font-bold text-left  md:text-center mb-8 uppercase tracking-widest">About Our Craft</h2>
<p ref={textRef} className="text-2xl text-white/40 md:text-5xl  lg:text-5xl  leading-tight">
 We create timepieces where precision meets purpose. Each watch is
          crafted with meticulous attention to detail, blending refined design
          with enduring craftsmanship. Our collections are made for those who
          value legacy, elegance, and the art of time itself.</p>
            </div>
                 <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-1/4 left-0 w-full h-[1px] bg-white/5"></div>
                <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-white/5"></div>
                <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/5"></div>
                <div className="absolute top-0 right-1/4 w-[1px] h-full bg-white/5"></div>
            </div>
        </section>
    );
};

export default About;
