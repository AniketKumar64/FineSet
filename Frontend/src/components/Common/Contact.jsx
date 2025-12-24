"use client";
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Mail, Github, Twitter, Linkedin } from 'lucide-react';

const Contact = () => {
    const marqueeRef = useRef(null);

    useGSAP(() => {
        const marquee = marqueeRef.current;

        gsap.to(marquee, {
            xPercent: -50,
            repeat: -1,
            duration: 20,
            ease: "linear",
        });
    }, { scope: marqueeRef });

    return (
        <section className="bg-zinc-950 text-white py-20 flex flex-col items-center justify-center min-h-[50vh] overflow-hidden">

            {/* Marquee Section */}
            <div className="w-full overflow-hidden mb-16 opacity-50">
                <div ref={marqueeRef} className="flex whitespace-nowrap">
            <h1 className="text-[10vw] font-bold uppercase mr-10">
  Crafted Timepieces —
</h1>
<h1 className="text-[10vw] text-[#D4AF37] font-bold uppercase mr-10">
  Crafted Timepieces —
</h1>
  </div>
            </div>

      <div className="text-center mb-14 px-8">
  <h2 className="text-4xl md:text-6xl font-semibold mb-6 text-[#F5F1E6]">
    Contact Our Concierge
  </h2>

  <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
    Whether you have questions about our collections, craftsmanship, or
    bespoke services, our team is here to assist you with precision and care.
  </p>
</div>

<a
  href="mailto:hello@yourbrand.com"
  className="
    text-2xl md:text-4xl font-medium
    text-[#F5F1E6]
    hover:text-[#D4AF37]
    transition-colors duration-300
    mb-20
  "
>
  hello@FineSet.com
</a>


         

        
        </section>
    );
};

const SocialLink = ({ href, icon, label }) => {
    const ref = useRef(null);

    useGSAP(() => {
        const element = ref.current;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = element.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            gsap.to(element, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, { scope: ref });

    return (
   <a
  ref={ref}
  href={href}
  className="
    p-4 rounded-full
    bg-zinc-900
    text-[#F5F1E6]
    hover:bg-[#D4AF37]
    hover:text-black
    transition-colors duration-300
    inline-block
  "
  aria-label={label}
>
  {icon}
</a>
    );
};

export default Contact;
