import React, { useRef } from 'react'
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import ProductCard from '../Shop/ProductCard';
import gsap from "gsap";

const LatestCollection = () => {
        const {products, currency, deliveryCharge } = useContext(ShopContext);
    const [latestProducts, setlatestProducts] = useState([]);
      const [category, setCategory] = useState("All");

   const toggleCategory = (e) => {
    const cat = e.currentTarget.getAttribute("data-value");
    setCategory(cat); // ✅ just set selected category
  };


  const categories = [
    "All",
    "Clothing",
    
    "Electronics",
    
    "Accessories",
  ];

//   animation 
const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const buttonsRef = useRef([]);
  const productsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Category buttons animation (stagger)
      gsap.from(buttonsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Product cards animation (scale + fade)
      gsap.from(productsRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);


    useEffect(()=>{
        const sortedProducts = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setlatestProducts(
  [...sortedProducts].sort(() => Math.random() - 0.1).slice(0, 4)
);

    }, [products])

      const filteredProducts =
    category === "All"
      ? latestProducts
      : latestProducts.filter((p) => p.category === category);

  
  return (
    <section ref={sectionRef} className="bg-black py-16">
      <div className="px-8">
        {/* Heading */}
        <div className="flex items-center flex-col justify-center">
          <h2 ref={headingRef} className="text-5xl font-bold text-white mb-8">
            Latest Collection
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Discover the freshest additions to our menswear lineup. From
            contemporary styles to timeless classics, our latest collection has
            something for every occasion.</p>

          {/* Category Buttons */}
          <div className="grid md:grid-cols-4 grid-cols-2 gap-4 space-x-4 mb-8">
            {categories.map((cat, i) => (
              <button
                key={cat}
                ref={(el) => (buttonsRef.current[i] = el)}
                data-value={cat}
                onClick={toggleCategory}
                className={`px-4 py-2 rounded-full border ${
                  category === cat
                    ? "bg-white text-black border-white"
                    : "text-white border-gray-500 hover:bg-white hover:text-black transition-colors"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <div
              key={idx}
              ref={(el) => (productsRef.current[idx] = el)}
              className="p-4 rounded-lg hover:shadow-lg transition-shadow"
            >
              <ProductCard
                product={product}
                currency={currency}
                deliveryCharge={deliveryCharge}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
   
  )
}

export default LatestCollection