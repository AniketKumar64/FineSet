import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../components/Common/Footer";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Reveal animations for sections
    const sections = gsap.utils.toArray(".about-section");
    sections.forEach((section) => {
      gsap.from(section.querySelectorAll(".reveal"), {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });
    });
    gsap.from(".hero-text", {
      y: 60,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".hero-text",
        start: "top 90%",
      },
    });

    // Image parallax effect
    gsap.to(".parallax-img", {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-img",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-[#050505] text-white overflow-hidden">
      
      {/* HERO SECTION */}
      <section className=" relative h-[100vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
       
        </div>
        <div className="hero-text relative z-20 text-center px-6">
          <span className="text-[#D4AF37] text-[10px] tracking-[0.6em] uppercase mb-4 block">Our Story</span>
          <h1 className="text-6xl md:text-9xl font-heading font-bold tracking-tighter mb-6">
            ESTABLISHED <span className="text-zinc-500 italic font-light">2026</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Fineset was born from a singular vision: to bridge the gap between traditional Swiss horology and modern aesthetic sensibilities. We believe a watch is not merely a tool for time, but a vessel for heritage.
          </p>
        </div>
      </section>
      

      {/* MISSION SECTION */}
      <section className="about-section py-32 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="reveal text-4xl md:text-6xl font-heading font-semibold leading-tight">
              The Pursuit of <br />
              <span className="text-[#D4AF37]">Mechanical Perfection</span>
            </h2>
            <p className="reveal text-zinc-400 text-lg leading-relaxed font-light">
              Fineset was born from a singular vision: to bridge the gap between traditional Swiss horology and modern aesthetic sensibilities. We believe a watch is not merely a tool for time, but a vessel for heritage.
            </p>
            <div className="reveal flex gap-12 pt-6">
              <div>
                <h3 className="text-3xl font-bold text-[#D4AF37]">30+</h3>
                <p className="text-[10px] tracking-widest text-zinc-500 uppercase">Years Excellence</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#D4AF37]">120</h3>
                <p className="text-[10px] tracking-widest text-zinc-500 uppercase">Master Craftsmen</p>
              </div>
            </div>
          </div>
          <div className="reveal relative aspect-[4/5] overflow-hidden">
             <img 
             src="https://images.unsplash.com/photo-1667375565651-b660b574d1a9?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xhc3NpYyUyMHdhdGNofGVufDB8fDB8fHww"
               className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
               alt="Craftsmanship"
             />
          </div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION (IMAGE LEFT) */}
      <section className="about-section py-32 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal order-2 lg:order-1 relative aspect-video lg:aspect-square overflow-hidden">
             <img 
               src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80" 
               className="w-full h-full object-cover"
               alt="Design process"
             />
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <h2 className="reveal text-4xl md:text-6xl font-heading font-semibold">
              The <span className="italic font-light">Art</span> of <br /> Precision
            </h2>
            <p className="reveal text-zinc-400 text-lg leading-relaxed font-light">
              Every gear, spring, and screw in a Fineset timepiece is inspected under 40x magnification. Our design philosophy follows the "Rule of Three": Durability, Elegance, and Legibility. If a design doesn't master all three, it never leaves our workshop.
            </p>
            <button className="reveal group flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase text-white hover:text-[#D4AF37] transition-colors">
              Our Process 
              <span className="w-10 h-[1px] bg-[#D4AF37] group-hover:w-20 transition-all duration-500"></span>
            </button>
          </div>
        </div>
      </section>

      {/* VISION STATEMENT */}
      <section className="about-section py-40 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="reveal text-3xl md:text-5xl font-light italic text-zinc-300 leading-snug">
            "A timepiece is the only piece of jewelry that carries a soul powered by your own movement."
          </h2>
          <div className="reveal w-20 h-[1px] bg-[#D4AF37] mx-auto mt-12"></div>
          <p className="reveal mt-8 text-[10px] tracking-[0.6em] uppercase text-zinc-500">The Fineset Creed</p>
        </div>
      </section>

      <Footer/>

    </div>
  );
};

export default About;