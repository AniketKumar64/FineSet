import React, { useRef } from "react";
import heroImage from "/luxury-watch.png";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Cinematic Intro
      tl.fromTo(
        imageRef.current,
        { scale: 1.4, filter: "brightness(0%) blur(10px)" },
        {
          scale: 1,
          filter: "brightness(60%) blur(0px)",
          duration: 2.2,
          ease: "expo.out"
        }
      );

      // Text Animation
      tl.from(
        ".reveal-text",
        {
          y: 120,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power4.out"
        },
        "-=1.4"
      );

      // Buttons Animation
  
      // Slow cinematic zoom
      const zoom = gsap.to(imageRef.current, {
        scale: 1.1,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      return () => {
        zoom.kill(); // cleanup
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen  flex items-center justify-center text-center overflow-hidden bg-black"
    >
      {/* IMAGE */}
      <div className="absolute inset-0 z-0">
        <img
          ref={imageRef}
          src={heroImage}
          alt="Luxury Watch"
          loading="eager"
          className="w-full h-full object-cover will-change-transform"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="relative z-20 px-6 md:px-20 max-w-5xl">
        <p className="reveal-text text-[#D4AF37] text-xs tracking-[0.5em] uppercase mb-3">
          New Season Arrival — 2026
        </p>

        <h1 className="reveal-text text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-tight mb-6">
          TIMELESS <br />
          <span className="text-zinc-400">PRECISION.</span>
        </h1>

        <p className="reveal-text text-zinc-300 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          Experience the pinnacle of luxury. Explore master-crafted timepieces.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-wrap justify-center gap-6">
          <button
            onClick={() => navigate("/products")}
            className="cta-btn px-10 py-5 bg-[#D4AF37] text-black font-bold text-[11px] tracking-[0.3em] uppercase 
            hover:bg-white hover:scale-105 transition-all duration-500 shadow-lg shadow-[#D4AF37]/20"
          >
            Shop Collection
          </button>

          <button
            onClick={() => navigate("/limited-edition")}
            className="cta-btn px-10 py-5 border border-white/30 text-white font-bold text-[11px] tracking-[0.3em] uppercase 
            hover:bg-white hover:text-black hover:scale-105 transition-all duration-500"
          >
            View Limited Editions
          </button>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-10 right-10 flex flex-col items-center gap-3">
        <div className="w-[1px] h-14 bg-gradient-to-b from-[#D4AF37] to-transparent animate-pulse"></div>
      </div>
    </section>
  );
};

export default Hero;