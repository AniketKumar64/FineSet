import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FilterSidebar from "../components/Shop/FilterSidebar.jsx";
import { Filter, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/Shop/ProductCard.jsx";
import Footer from "../components/Common/Footer"; // Ensure Footer is imported

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShopContext } from "../context/ShopContext.jsx";

const Shop = () => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const { products, search } = useContext(ShopContext);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    const value = e.target.value.toLowerCase();
    setCategory((prev) => 
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubcategory = (e) => {
    const value = e.target.value.toLowerCase();
    setSubcategory((prev) => 
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let productsCopy = [...products];

    if (search.trim()) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category.toLowerCase())
      );
    }

    if (subcategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subcategory.includes(item.subCategory?.toLowerCase() || item.subcategory?.toLowerCase())
      );
    }

    setfilteredProducts(productsCopy);
  };

  const sortProducts = () => {
    let fpCopy = [...filteredProducts];
    if (sortType === "1") fpCopy.sort((a, b) => a.price - b.price);
    else if (sortType === "2") fpCopy.sort((a, b) => b.price - a.price);
    setfilteredProducts(fpCopy);
  };

  useEffect(() => { setfilteredProducts(products); }, [products]);
  useEffect(() => { applyFilter(); }, [search, category, subcategory, products]);
  useEffect(() => { sortProducts(); }, [sortType]);

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24">
      <div className="flex max-w-[1440px] mx-auto relative">
        
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden lg:block w-80 sticky top-24 h-[calc(100vh-120px)] overflow-y-auto pr-8 pl-6 border-r border-white/5 scrollbar-hide">
          <FilterSidebar 
            toggleCategory={toggleCategory} 
            toggleSubcategory={toggleSubcategory} 
          />
        </aside>

        {/* MAIN SHOP CONTENT */}
        <main className="flex-1 px-6 md:px-12 pb-20">
          
          {/* EDITORIAL HEADER */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-[#D4AF37]"></div>
              <span className="text-[#D4AF37] text-[10px] tracking-[0.5em] uppercase">The Anthology</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter mb-6">
              ALL <span className="text-zinc-600 italic font-light">PIECES</span>
            </h1>
            <p className="max-w-2xl text-zinc-500 text-sm md:text-base leading-relaxed font-light">
              Explore a curated selection where heritage craftsmanship meets contemporary precision. 
              Each item is a testament to the Fineset standard of mechanical elegance.
            </p>
          </div>

          {/* CONTROLS BAR */}
          <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-8">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-3 bg-white/5 px-5 py-3 border border-white/10 text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-all"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>

            <div className="hidden lg:flex items-center gap-2 text-zinc-500">
              <span className="text-[10px] tracking-widest uppercase">Showing {filteredProducts.length} Results</span>
            </div>

            <Select onValueChange={(value) => setSortType(value)}>
              <SelectTrigger className="w-[200px] bg-transparent border-white/10 text-[10px] tracking-widest uppercase focus:ring-[#D4AF37] h-12 rounded-none">
                <SelectValue placeholder="SORT BY" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 text-white border-white/10 rounded-none">
                <SelectItem value="relevant" className="text-[10px] tracking-widest uppercase">Relevant</SelectItem>
                <SelectItem value="1" className="text-[10px] tracking-widest uppercase">Price: Low to High</SelectItem>
                <SelectItem value="2" className="text-[10px] tracking-widest uppercase">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* PRODUCT GALLERY GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, idx) => (
                <ProductCard key={product._id + idx} product={product} />
              ))
            ) : (
              <div className="col-span-full py-40 text-center">
                <p className="text-zinc-600 tracking-[0.3em] uppercase text-xs">No pieces found in this classification</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* MOBILE FILTER OVERLAY */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 bg-black/95 z-[100] animate-in fade-in duration-500 overflow-y-auto">
          <div className="min-h-screen">
            <FilterSidebar
              toggleCategory={toggleCategory}
              toggleSubcategory={toggleSubcategory}
              onClose={() => setMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Shop;