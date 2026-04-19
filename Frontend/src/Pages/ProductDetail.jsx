import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductDetailsTabs from "../components/ProductDetail/ProductDetailsTabs";
import ProductMaindetail from "../components/ProductDetail/ProductMaindetail";
import RelatedProduct from "../components/ProductDetail/RelatedProduct";
import Footer from "../components/Common/Footer";
import { ShopContext } from "../context/ShopContext.jsx";
import { ShieldCheck, Truck, RefreshCw } from "lucide-react";

const ProductDetail = () => {
  const { productId } = useParams();
  const { products, currency, addTOCart } = useContext(ShopContext);
  const [productdata, setproductdata] = useState(null);
  const [image, setimage] = useState("");
  const [size, setsize] = useState("");
  const navigate = useNavigate();

  const discountPercentage = 20;

  const fetchProductsData = async () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setproductdata(foundProduct);
      setimage(foundProduct.images[0]);
    }
  };

  useEffect(() => {
    fetchProductsData();
    window.scrollTo(0, 0);
  }, [productId, products]);

  if (!productdata) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#050505]">
        <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const originalPrice = Math.round(productdata.price * (1 + discountPercentage / 100));

  return (
    <div className="bg-[#050505] text-white min-h-screen pt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* LEFT SIDE: IMAGE GALLERY */}
          <div className="flex flex-col-reverse md:flex-row gap-6">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-visible pb-4 md:pb-0 scrollbar-hide">
              {productdata.images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setimage(img)}
                  className={`relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 cursor-pointer overflow-hidden border transition-all duration-500 ${
                    image === img ? "border-[#D4AF37]" : "border-white/10 opacity-50 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Main Display */}
            <div className="flex-1 relative aspect-[4/5] bg-white/[0.02] border border-white/5 overflow-hidden group">
              <img
                src={image}
                alt={productdata.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 border border-white/10">
                <span className="text-[10px] tracking-[0.2em] uppercase">Ref. {productdata._id.slice(-6)}</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: PRODUCT DETAILS */}
          <div className="flex flex-col">
            <div className="mb-8">
              <span className="text-[#D4AF37] text-[10px] tracking-[0.5em] uppercase font-bold mb-4 block">
                {productdata.category} / {productdata.subcategory}
              </span>
              <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter mb-6 leading-tight">
                {productdata.name}
              </h1>
              
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-3xl font-light text-white">
                  {currency}{productdata.price.toLocaleString()}
                </span>
                <span className="text-zinc-500 line-through text-lg decoration-1">
                  {currency}{originalPrice.toLocaleString()}
                </span>
                <span className="bg-[#D4AF37]/10 text-[#D4AF37] text-[9px] tracking-widest uppercase px-2 py-1 font-bold">
                  {discountPercentage}% Exclusive Saving
                </span>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed font-light max-w-lg mb-8">
                A masterwork of engineering and aesthetic restraint. Designed for the individual who appreciates 
                the weight of heritage and the precision of the future.
              </p>
            </div>

            {/* Size Selection */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500">Select Dimension</span>
                <button className="text-[9px] tracking-widest uppercase text-zinc-500 hover:text-[#D4AF37] underline transition-colors">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {productdata.sizes.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setsize(item)}
                    className={`min-w-[60px] h-12 flex items-center justify-center text-xs tracking-widest border transition-all duration-300 ${
                      item === size
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-white border-white/10 hover:border-[#D4AF37]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Inventory Status */}
            <div className="flex items-center gap-3 mb-10">
              <div className={`w-1.5 h-1.5 rounded-full ${productdata.stock > 0 ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-400">
                {productdata.stock > 0 ? "Available for immediate dispatch" : "Individually Backordered"}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => addTOCart(productdata._id, size)}
                className="flex-[2] h-16 bg-white text-black text-[11px] font-bold tracking-[0.4em] uppercase hover:bg-[#D4AF37] hover:text-white transition-all duration-500"
              >
                Add to Bag
              </button>
              <button
                onClick={() => addTOCart(productdata._id, size)}
                className="flex-1 h-16 border border-white/20 text-white text-[11px] font-bold tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all duration-500"
              >
                Inquiry
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/5">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck size={16} className="text-[#D4AF37] stroke-1" />
                <span className="text-[8px] tracking-widest uppercase text-zinc-500">Free Express Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck size={16} className="text-[#D4AF37] stroke-1" />
                <span className="text-[8px] tracking-widest uppercase text-zinc-500">2 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RefreshCw size={16} className="text-[#D4AF37] stroke-1" />
                <span className="text-[8px] tracking-widest uppercase text-zinc-500">Certified Authentic</span>
              </div>
            </div>
          </div>
        </div>

        {/* DETAILS TABS & ADDITIONAL INFO */}
        <div className="mt-32">
          <ProductDetailsTabs productdata={productdata} />
          
        </div>

        {/* RELATED PRODUCTS */}
        <div className="py-20">
        
          <RelatedProduct category={productdata.category} subcategory={productdata.subcategory} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;