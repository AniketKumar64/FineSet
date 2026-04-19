import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import ProductCard from "../Shop/ProductCard";

const RelatedProduct = ({ category, subcategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setrelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      // Filter by category and subcategory for high relevance
      let filtered = products.filter(
        (item) => category === item.category && subcategory === item.subcategory
      );

      // If not enough subcategory matches, fall back to just category
      if (filtered.length < 1) {
        filtered = products.filter((item) => category === item.category);
      }

      // Slice to show top 4 cinematic picks
      setrelated(filtered.slice(0, 4));
    }
  }, [products, category, subcategory]); // Added dependencies for reactive updates

  return (
    <section className="bg-[#050505] py-24 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Editorial Header */}
        <div className="flex flex-col mb-16">
          <span className="text-[#D4AF37] text-[10px] tracking-[0.5em] uppercase mb-3 block">
            The Collection
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter text-white">
            COMPLEMENTARY <span className="text-zinc-500 italic font-light">PIECES</span>
          </h2>
        </div>

        {/* Product Gallery Grid */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
        >
          {related.length > 0 ? (
            related.map((item) => (
              <div 
                key={item._id} 
                className="transform transition-transform duration-700 hover:-translate-y-2"
              >
                <ProductCard product={item} />
              </div>
            ))
          ) : (
            // Empty state placeholder to maintain layout height
            [...Array(4)].map((_, i) => (
              <div key={i} className="h-80 bg-white/[0.02] animate-pulse"></div>
            ))
          )}
        </div>

        {/* Cinematic Branding Detail */}
        <div className="mt-20 pt-10 border-t border-white/5 flex justify-between items-center">
            <p className="text-[9px] tracking-[0.3em] text-zinc-600 uppercase">
                Curated for the Fineset 1994 Series
            </p>
            <div className="h-[1px] flex-1 mx-10 bg-gradient-to-r from-white/10 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default RelatedProduct;