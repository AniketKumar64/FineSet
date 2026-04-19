"use client";
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Mail, Instagram, Twitter, Linkedin } from 'lucide-react';

const Contact = () => {
    const containerRef = useRef(null);
    const marqueeRef = useRef(null);

    useGSAP(() => {
        // Infinite Seamless Marquee
        gsap.to(marqueeRef.current, {
            xPercent: -50,
            repeat: -1,
            duration: 30,
            ease: "linear",
        });

        // Entrance animation for content
        gsap.from(".contact-reveal", {
            y: 40,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".contact-reveal",
                start: "top 90%",
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative bg-[#050505] py-32 flex flex-col items-center justify-center overflow-hidden border-t border-white/5">
            
            {/* Background Aesthetic Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[300px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none"></div>

            

            {/* Main Contact Content */}
            <div className="relative z-10 text-center px-8">
                <div className="contact-reveal overflow-hidden mb-4">
                    <span className="text-[#D4AF37] text-[10px] tracking-[0.6em] uppercase">Private Inquiry</span>
                </div>
                
                <h2 className="contact-reveal text-5xl md:text-7xl font-heading font-semibold mb-8 text-white tracking-tighter">
                    Contact Our <span className="italic font-light text-zinc-400">Concierge</span>
                </h2>

                <p className="contact-reveal text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 font-light">
                    Our master horologists and service team are available for bespoke consultations and collection inquiries.
                </p>

                <div className="contact-reveal">
                    <a
                        href="mailto:hello@fineset.com"
                        className="group relative inline-block text-3xl md:text-5xl font-light text-white transition-all duration-500 hover:text-[#D4AF37]"
                    >
                        hello@FineSet.com
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></span>
                    </a>
                </div>

                {/* Social Links Row */}
                <div className="contact-reveal flex items-center justify-center gap-6 mt-20">
                    <SocialLink href="#" icon={<Instagram size={20} />} label="Instagram" />
                    <SocialLink href="#" icon={<Twitter size={20} />} label="Twitter" />
                    <SocialLink href="#" icon={<Linkedin size={20} />} label="LinkedIn" />
                </div>
            </div>

            {/* Custom CSS for the Outline Text in Marquee */}
            <style jsx>{`
                
            `}</style>
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
                x: x * 0.4,
                y: y * 0.4,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                x: 0, y: 0,
                duration: 0.6,
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
            className="w-14 h-14 flex items-center justify-center rounded-full bg-zinc-900 border border-white/5 text-zinc-400 hover:bg-[#D4AF37] hover:text-black transition-colors duration-500"
            aria-label={label}
        >
            {icon}
        </a>
    );
};

export default Contact;