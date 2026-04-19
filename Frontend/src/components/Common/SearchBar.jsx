import React, { useContext, useEffect, useRef } from 'react';
import { Search, X } from "lucide-react"; // Using Lucide to match the Navbar
import { ShopContext } from '../../context/ShopContext.jsx';
import gsap from 'gsap';

const SearchBar = () => {
  const { search, setsearch, showSearch, setshowSearch } = useContext(ShopContext);
  const overlayRef = useRef(null);
  const inputRef = useRef(null);

  // GSAP Animation for a premium feel
  useEffect(() => {
    if (showSearch) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "expo.out",
      });
      // Auto-focus the input for better UX
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [showSearch]);

  if (!showSearch) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-start bg-black/95 backdrop-blur-2xl pt-32 px-6 opacity-0 -translate-y-5"
    >
      {/* Close Button */}
      <button 
        onClick={() => setshowSearch(false)}
        className="absolute top-10 right-10 text-white/50 hover:text-[#D4AF37] transition-colors duration-300"
      >
        <X size={32} strokeWidth={1} />
      </button>

      <div className="w-full max-w-4xl">
        {/* Label */}
        <p className="text-[#D4AF37] text-[10px] tracking-[0.5em] uppercase mb-8 text-center opacity-70">
          What are you looking for?
        </p>

        {/* Search Input Group */}
        <div className="relative flex items-center border-b border-white/10 pb-4 group focus-within:border-[#D4AF37] transition-colors duration-500">
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            type="text"
            className="w-full bg-transparent text-white text-3xl md:text-5xl font-light outline-none placeholder:text-white/10"
            placeholder="Search our collection..."
          />
          <Search 
            size={32} 
            strokeWidth={1} 
            className="text-white/20 group-focus-within:text-[#D4AF37] transition-colors duration-500" 
          />
        </div>

        {/* Quick Links / Suggestions */}
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {['Limited Edition', 'Gold Series', 'New Arrivals', 'Accessories'].map((tag) => (
            <button
              key={tag}
              onClick={() => setsearch(tag)}
              className="text-[10px] tracking-widest uppercase text-white/40 hover:text-white transition-all border border-white/5 px-4 py-2 hover:border-[#D4AF37]/50"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Aesthetic Background Detail */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/5 font-heading text-[15vw] pointer-events-none select-none">
        FINESET
      </div>
    </div>
  );
};

export default SearchBar;