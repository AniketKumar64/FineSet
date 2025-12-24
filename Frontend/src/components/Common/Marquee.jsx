
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const Marquee = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        const textElement = textRef.current;
        const totalWidth = textElement.scrollWidth / 2; // Since we duplicate content

        gsap.to(textElement, {
            x: -totalWidth,
            duration: 50,
            ease: "none",
            repeat: -1,
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="w-full bg-black border-y border-white/10 overflow-hidden py-6 relative ">
            <div ref={textRef} className="flex whitespace-nowrap">
                {/* Duplicated content for seamless loop */}
               {[...Array(4)].map((_, i) => (
  <div key={i} className="flex items-center gap-12 px-6">
    
    <span className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 uppercase tracking-tighter opacity-80">
      Heritage
    </span>

    <span className="w-3 h-3 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />

    <span className="text-6xl md:text-8xl font-bold uppercase tracking-tighter text-white/20">
      Craftsmanship
    </span>

    <span className="w-3 h-3 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />

    <span className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 uppercase tracking-tighter opacity-80">
      Precision
    </span>

    <span className="w-3 h-3 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />

    <span className="text-6xl md:text-8xl font-bold uppercase tracking-tighter text-white/20">
      Legacy
    </span>

    <span className="w-3 h-3 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />

  </div>
))}

            </div>
        </div>
    );
};

export default Marquee;
