import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FilterSidebar from "../components/Shop/FilterSidebar.jsx";
import { Filter } from "lucide-react";
import ProductCard from "../components/Shop/ProductCard.jsx";
import { ShopContext } from "../context/ShopContext.jsx";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Shop = () => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const { products, search, showSearch } = useContext(ShopContext);
  const [ShowFilter, setShowFilter] = useState(false);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    const value = e.target.value.toLowerCase(); // normalize
    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  const toggleSubcategory = (e) => {
    const value = e.target.value.toLowerCase(); // normalize
    if (subcategory.includes(value)) {
      setSubcategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubcategory((prev) => [...prev, value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = [...products];

    // 🔎 Search
    if (search.trim()) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category.toLowerCase())
      );
    }

    // 📂 Subcategory Filter
    if (subcategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subcategory.includes(item.subCategory.toLowerCase())
      );
    }

    setfilteredProducts(productsCopy);
  };

  const onClose = () => {
    setMobileFilterOpen(false);
  };

  const sortProducts = () => {
    const fpCopy = filteredProducts.slice();

    switch (sortType) {
      case "1":
        setfilteredProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "2":
        setfilteredProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    setfilteredProducts(products);
  }, []);

  useEffect(() => {
    applyFilter();
  }, [search, category, subcategory, products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  console.log("filteredProducts", filteredProducts);

  return (
 
      <div className=" min-h-screen text-white    flex">
     


       <aside className="hidden md:block w-72 bg-[#171717] p-6 fixed top-16 left-0 h-screen overflow-y-auto">
        <div className="p-4 space-y-4">
          <h3 className="text-xl font-[font1] f mb-4">Filters</h3>

          {/* Category Filter */}
          <div>
            <p className="mb-2 font-medium font-serif text-xl text-gray-50">Categories</p>
            <div className="flex  gap-1 flex-col  md:gap-2 md:overflow-visible">
              {[
                "Men",
                "Women",
                "Kids",
                "Electronics",
                "Clothing",
                "Accessories",
              ].map((cat, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-md shrink-0 md:bg-transparent md:rounded-none"
                >
                  <input
                    value={cat}
                    onChange={toggleCategory}
                    type="checkbox"
                    className="form-checkbox h-4 w-4 accent-gray-300"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* todo: Price Filter */}
       

          {/* Sizes */}
          <div>
            <p className="mb-2 font-medium font-serif text-xl text-gray-50 ">Subcategories</p>
            <div className="flex  text-gray-300 gap-1 flex-col md:gap-2 md:overflow-visible">
              {[
                "Topwear",
                "Bottomwear",
                "Winter",
                "Summer",
                "Footwear",
                "Gadgets",
              ].map((sub) => (
                <label
                  key={sub}
                  className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-md shrink-0 md:bg-transparent md:rounded-none"
                >
                  <input
                    value={sub}
                    onChange={toggleSubcategory}
                    type="checkbox"
                    className="form-checkbox h-4 w-4 accent-gray-300 scale-105"
                  />
                  <span>{sub}</span>
                </label>
              ))}
            </div>
          </div>

          {onClose && (
           <Button
            className="w-full mt-4 bg-red-600 text-white py-2 rounded-lg"
            onClick={onClose}
          >
            Close
          </Button>
        )}
      </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 ml-0 md:ml-72 top-16 overflow-y-auto h-screen">
        <div className=" flex flex-col justify-between gap-2 w-full mb-4">
          <h2 className="text-4xl  font-extrabold font-[font1] tracking-wide mb-2">
              All Products
            </h2>
            <p className="text-lg md:text-lg hidden md:flex text-white/50 font-[font2] font-semibold ">
              Discover the latest trends and unbeatable deals! Shop top brands, exclusive collections, and must-have gadgets. Elevate your style and upgrade your tech—your one-stop shop for everything awesome. Limited time offers, fast delivery, and premium quality guaranteed!
            </p>        </div>
        <div className="flex md:flex-row-reverse items-center py-6 justify-between gap-4 w-full md:max-w-full">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg md:hidden"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
          {/* Sort Dropdown */}
          <Select onValueChange={(value) => setSortType(value)}>
            <SelectTrigger className="w-[180px] bg-black font-[font2] text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevant">Relevant</SelectItem>
              <SelectItem value="1">Low → High</SelectItem>
              <SelectItem value="2">High → Low</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter Button (only mobile) */}
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
          {filteredProducts.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
          {filteredProducts.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
          {filteredProducts.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </main>




      {/* Mobile Filter Overlay */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
          <div className="max-w-md mx-auto mt-10 bg-[#171717] rounded-lg p-6">
            <FilterSidebar
              toggleCategory={toggleCategory}
              toggleSubcategory={toggleSubcategory}
              onClose={onClose}
            />
          </div>
        </div>
      )}
    </div>
  
    
  );
};

export default Shop;
