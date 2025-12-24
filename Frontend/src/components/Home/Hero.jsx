import React, { useEffect } from "react";
import heroImage from "../../../public/hero.jpg";
import { useNavigate } from "react-router-dom";
import gsap from "gsap/all";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const lettersRef = useRef([]);
  const navigate = useNavigate();
  const glowRef = useRef(null);
  const shapesRef = useRef([]);


  useGSAP(
    () => {
        gsap.to(glowRef.current, {
    opacity: 0.1,
    duration: 1.4,
    ease: "power2.out",
  });
      gsap.to(lineRef.current, {
        boxShadow: `
    10px 0 22px rgba(212,175,55,0.5),
    18px 0 48px rgba(212,175,55,0.3)
  `,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
      });

      gsap.from(lettersRef.current, {
        x: 40, // comes from left (yellow line)
        opacity: 0,
        duration: 0.9,
        filter: "blur(2px)",
        stagger: {
          each: 0.08,
          from: "end",
        },
        ease: "power2.out",
      });

      gsap.from(".word", {
        y: -40, // comes from left (yellow line)
        opacity: 0,
        duration: 0.9,
        delay: 0.8,
        filter: "blur(2px)",
        stagger: {
          each: 0.08,
          from: "end",
        },
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

    const onEnter = () => {
    gsap.to(btnRef.current, {
      y: -2,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(glowRef.current, {
      opacity: 1,
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    gsap.to(btnRef.current, {
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(glowRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: "power2.out",
    });
  };


  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center flex-col py-2 overflow-hidden"

    >
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0 pointer-events-none"></div>

  

  
      <div className="  text-center">
         <div className="inline-flex  items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-2">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
        <span className="text-sm text-gray-300 tracking-wide">Essential by Design</span>
    </div>

        <div className="relative flex items-center justify-center text-center px-4">
          
          <span
            ref={lineRef}
            className="mr-4 h-12 md:h-26 w-[2px] bg-[#D4AF37]"
          ></span>
          <h1 className="logo text-6xl md:text-9xl font-playfair font-semibold leading-tight">
            {"Luxurious".split("").map((letter, i) => (
              <span
                key={i}
                ref={(el) => (lettersRef.current[i] = el)}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>
        </div>
        <div className="relative flex items-center justify-center text-center px-4">
          <h1 className="logo text-5xl md:text-9xl whitespace-nowrap font-playfair font-semibold leading-tight">
            {"Executive-Models".split(" ").map((word, i) => (
              <span key={i} className="word inline-block">
                {word}
              </span>
            ))}
          </h1>
        </div>
      </div>

<button
onClick={() => navigate("/products")}
  className="
  cursor-pointer
  hover:scale-105
  mt-10
  relative
  inline-block
    rounded px-10 py-4
    border border-[#D4AF37]/70
    text-[#F5F1E6] uppercase tracking-widest text-sm font-medium
    bg-transparent
    overflow-hidden
    transition-all duration-500
    hover:border-[#F5E6A1]
  "
>
  {/* Gold background glow */}
  <span
    className="
      pointer-events-none
      absolute inset-0
      opacity-0
      bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.35),rgba(212,175,55,0.15),transparent_70%)]
      blur-xl
      transition-opacity duration-500
      group-hover:opacity-100
    "
  />

  <span className="relative z-10">
   All Collections
  </span>
</button>

      <div className="flex justify-center mt-8">
        <p className="text-center tracking-wider font-sans text-[#878787]  text-md">
          Fashion is a form of self expression and <br />
          autonomy for a certain period, fashion describes the expression of{" "}
          <br />
          self and increase self-confidence
        </p>
      </div>
    </section>
  );
};

export default Hero;
