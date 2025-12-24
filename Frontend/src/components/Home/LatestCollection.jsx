import React, { useRef, useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import ProductCard from "../Shop/ProductCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LatestCollection = () => {
  const { products, currency, deliveryCharge } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [category, setCategory] = useState("All");
const cardsRef = useRef([]);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const tabsRef = useRef([]);
  const gridRef = useRef(null);

  const categories = ["All", "Clothing", "Electronics", "Accessories"];

  useEffect(() => {
    const sorted = [...products].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setLatestProducts(sorted.slice(0, 3));

  }, [products]);

  const filteredProducts =
    category === "All"
      ? latestProducts
      : latestProducts.filter((p) => p.category === category);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          tabsRef.current,
          {
            opacity: 0,
            y: 10,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          gridRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);
useEffect(() => {
  if (!cardsRef.current.length) return;

  const [left, center, right] = cardsRef.current;

  // Reset state (important for repeat)
  gsap.set([left, right], {
    opacity: 0,
    y: 30,
    scale: 0.96,
  });

  gsap.set(center, {
    opacity: 0,
    y: 30,
    scale: 0.86, // 👈 smaller initially
  });

  const tl = gsap.timeline({ paused: true });

  // 1️⃣ Center card (hero)
  tl.to(center, {
    opacity: 1,
    y: 0,
    scale: 1.1, // 👈 slightly larger
    duration: 1.5,
    ease: "power3.out",
  })

  // 2️⃣ Side cards (supporting)
  .to(
    [left, right],
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.1,
      ease: "power3.out",
      stagger: 0.15,
    },
    "-=0.6"
  );

  ScrollTrigger.create({
    trigger: gridRef.current,
    start: "top 75%",
    end: "bottom 60%",
    onEnter: () => tl.restart(),
    onEnterBack: () => tl.restart(),
  });

  return () => {
    tl.kill();
    ScrollTrigger.getAll().forEach(st => st.kill());
  };
}, [filteredProducts]);


  return (
    <section
      ref={sectionRef}
      className="bg-black py-28 px-6 md:px-16"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2
          ref={headingRef}
          className="text-4xl md:text-6xl font-semibold text-[#F5F1E6] mb-6"
        >
          Latest Collection
        </h2>

        <p className="text-gray-400 max-w-xl text-lg">
          A curated selection of our newest designs — crafted with precision,
          refined for everyday elegance.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center gap-4 mb-16 flex-wrap">
        {categories.map((cat, i) => (
          <button
            key={cat}
            ref={(el) => (tabsRef.current[i] = el)}
            onClick={() => setCategory(cat)}
            className={`
              px-6 py-2 rounded-full text-sm tracking-wide
              border transition-all duration-300
              ${
                category === cat
                  ? "border-[#D4AF37] text-[#D4AF37]"
                  : "border-white/20 text-white/60 hover:text-white"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products */}
<div
  ref={gridRef}
  className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-14"
>
  {filteredProducts.map((product, idx) => (
    <div
      key={product._id}
      ref={(el) => (cardsRef.current[idx] = el)}
    >
      <ProductCard
        product={product}
        currency={currency}
        deliveryCharge={deliveryCharge}
      />
    </div>
  ))}
</div>

    </section>
  );
};

export default LatestCollection;
