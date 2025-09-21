"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EcommerceShowcase = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imagesRef = useRef([]);

  const features = [
    "Free Shipping",
    "Secure Payments",
    "24/7 Customer Support",
    "100+ Products",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text block
      gsap.from(textRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Animate feature tags
      gsap.from(".feature-tag", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      // Animate images
      gsap.from(imagesRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f5f5f5] py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Section */}
        <div ref={textRef} className="flex flex-col gap-6">
         <div className=" ">
             <p className="uppercase text-sm text-gray-600 mb-2">
            Since 2020
          </p>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            Shop the Style You Love
          </h2>
         </div>

          {/* Features */}
          <div className="flex flex-wrap gap-3 mb-6">
            {features.map((feature, idx) => (
              <span
                key={idx}
                className="feature-tag px-4 py-1.5 rounded-full bg-white border border-gray-200 text-sm text-gray-700 shadow-sm"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Customer Reviews */}
          <div className="space-y-4">
            <div className="bg-black text-white p-4 rounded-xl shadow-md">
              <h4 className="font-bold">Alex Johnson</h4>
              <p className="text-sm mt-2 text-gray-300">
                Amazing quality products and super fast delivery! 
                This is my go-to store whenever I need something trendy.
              </p>
            </div>

            <div className="bg-black text-white p-4 rounded-xl shadow-md">
              <h4 className="font-bold">Sophia Lee</h4>
              <p className="text-sm mt-2 text-gray-300">
                I love the customer service here. The team helped me 
                pick the right size, and the checkout was seamless.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Product Category Images */}
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              src: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
              alt: "Shoes",
              span: "col-span-2 h-56",
            },
            {
              src: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
              alt: "Watches",
              span: "h-40",
            },
            {
              src: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
              alt: "Clothes",
              span: "h-40",
            },
            {
              src: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
              alt: "Accessories",
              span: "col-span-2 h-40",
            },
          ].map((img, idx) => (
            <img
              key={idx}
              ref={(el) => (imagesRef.current[idx] = el)}
              src={img.src}
              alt={img.alt}
              className={`rounded-xl w-full object-cover ${img.span}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcommerceShowcase;
