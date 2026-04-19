import React from 'react';
import { X, ChevronRight } from 'lucide-react';

const FilterSidebar = ({ onClose, toggleCategory, toggleSubcategory }) => {
  return (
    <div className="h-full flex flex-col bg-[#050505] text-white p-8 border-r border-white/5">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-16">
        <div>
          <span className="text-[#D4AF37] text-[10px] tracking-[0.5em] uppercase mb-1 block">Refine</span>
          <h3 className="text-3xl font-heading font-bold tracking-tighter">FILTERS</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={24} strokeWidth={1} />
          </button>
        )}
      </div>

      <div className="space-y-16 flex-1 overflow-y-auto scrollbar-hide">
        
        {/* Category Filter */}
        <section>
          <div className="flex items-center gap-4 mb-8">
             <div className="w-8 h-[1px] bg-[#D4AF37]"></div>
             <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-500">Departments</p>
          </div>
          
          <div className="flex flex-col gap-6">
            {["Men", "Women", "Unisex", "Heritage", "Accessories"].map((cat, idx) => (
              <label
                key={idx}
                className="group flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <input
                    value={cat}
                    onChange={toggleCategory}
                    type="checkbox"
                    className="appearance-none w-2 h-2 rounded-full border border-zinc-700 checked:bg-[#D4AF37] checked:border-[#D4AF37] transition-all duration-300"
                  />
                  <span className="text-xl font-light tracking-wide text-zinc-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-500">
                    {cat}
                  </span>
                </div>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 text-[#D4AF37] transition-all duration-500" />
              </label>
            ))}
          </div>
        </section>

        {/* Subcategory Filter */}
        <section>
          <div className="flex items-center gap-4 mb-8">
             <div className="w-8 h-[1px] bg-[#D4AF37]"></div>
             <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-500">Classification</p>
          </div>
          
          <div className="flex flex-col gap-6">
            {["Automatic", "Chronograph", "Quartz", "Limited Run", "Mechanical"].map((sub) => (
              <label
                key={sub}
                className="group flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <input
                    value={sub}
                    onChange={toggleSubcategory}
                    type="checkbox"
                    className="appearance-none w-2 h-2 rounded-full border border-zinc-700 checked:bg-[#D4AF37] checked:border-[#D4AF37] transition-all duration-300"
                  />
                  <span className="text-xl font-light tracking-wide text-zinc-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-500">
                    {sub}
                  </span>
                </div>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 text-[#D4AF37] transition-all duration-500" />
              </label>
            ))}
          </div>
        </section>

      </div>

      {/* Action Area */}
      {onClose && (
        <div className="pt-10 border-t border-white/5">
           <button
             className="w-full py-4 bg-white text-black text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-[#D4AF37] hover:text-white transition-all duration-500"
             onClick={onClose}
           >
             Apply Selection
           </button>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;