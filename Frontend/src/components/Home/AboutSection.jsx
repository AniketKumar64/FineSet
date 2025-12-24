import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const headingRef = useRef(null);
  const underlineRef = useRef(null);

  useGSAP(() => {
    const text = textRef.current;
    const words = text.innerText.split(" ");

    // Replace paragraph text with spans
    text.innerHTML = words
      .map(
        (word) =>
          `<span class="inline-block opacity-0 translate-y-4 mr-2">${word}</span>`
      )
      .join("");

    const spans = text.querySelectorAll("span");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    // 1️⃣ Heading appears
    tl.from(headingRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })

      // 2️⃣ Gold underline grows
      .fromTo(
        underlineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left",
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      )

      // 3️⃣ Paragraph words reveal
      .to(
        spans,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
        },
        "+=0.2"
      );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="w-full min-h-screen bg-black text-white flex items-center justify-center py-24 px-6 md:px-20 relative overflow-hidden"
    >
      {/* Grain Overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none z-10"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="max-w-6xl text-center relative z-20">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-4xl md:text-6xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 uppercase tracking-widest"
        >
          About the Craft
        </h2>

        {/* Gold underline */}
        <div className="flex justify-center mt-6 mb-12">
          <span
            ref={underlineRef}
            className="h-[2px] w-24 bg-[#D4AF37] inline-block"
          />
        </div>

        {/* Paragraph */}
        <p
          ref={textRef}
          className="text-xl md:text-4xl max-w-5xl mx-auto font-light text-white/80  leading-12"
        >
          We create timepieces where precision meets purpose. Each watch is
          crafted with meticulous attention to detail, blending refined design
          with enduring craftsmanship. Our collections are made for those who
          value legacy, elegance, and the art of time itself.
        </p>
      </div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-white/5" />
        <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-white/5" />
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/5" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-white/5" />
      </div>
    </section>
  );
};

export default About;
