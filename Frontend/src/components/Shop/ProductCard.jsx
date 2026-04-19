import React, { useRef } from "react";
import { Plus, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ProductCard = ({ product }) => {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from(container.current, {
      y: 60,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 90%",
      },
    });
  }, { scope: container });

  return (
    <div ref={container} className="relative w-full group mb-20">
      <Link to={`/product/${product._id}`} className="block relative">
        
        {/* LARGE ASYMMETRIC IMAGE */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#0a0a0a]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110 group-hover:opacity-70"
          />
          
          {/* FLOATING ACTION */}
          <button className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black scale-0 group-hover:scale-100 transition-transform duration-500 z-20">
            <Plus size={20} />
          </button>
        </div>

        {/* DECONSTRUCTED INFO OVERLAY */}
        <div className="absolute -bottom-10 -left-4 z-10 max-w-[80%]">
          <div className="bg-black/40 backdrop-blur-xl p-6 border border-white/5 inline-block">
            <p className="text-[#D4AF37] text-[9px] tracking-[0.5em] uppercase mb-2">
              {product.category || "Limited"}
            </p>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tighter leading-none mb-4">
              {product.name}
            </h3>
            <div className="flex items-center gap-4">
              <span className="text-lg font-light text-zinc-300 tracking-widest">
                ₹{product.price.toLocaleString()}
              </span>
              <div className="w-8 h-[1px] bg-zinc-700"></div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Discover</span>
            </div>
          </div>
        </div>
      </Link>

      {/* FLOATING WISHLIST (TOP RIGHT) */}
      <button className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
        <Heart size={18} className="text-white hover:fill-[#D4AF37] hover:text-[#D4AF37] transition-all" />
      </button>

      {/* DECORATIVE NUMBERING (Optional - for that catalog feel) */}
      <div className="absolute -top-4 -right-2 text-[6rem] font-bold text-white/[0.03] pointer-events-none italic select-none">
        {product._id.slice(-2)}
      </div>
    </div>
  );
};

export default ProductCard;