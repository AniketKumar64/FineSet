import React, { useRef } from "react";
import { Heart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProductCard = ({ product }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  React.useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      {
        opacity: 0,
        scale: 1.08,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <Link
      to={`/product/${product._id}`}
      ref={cardRef}
      className="group block transition-transform duration-500 hover:-translate-y-1"
    >
      <div className="relative bg-black rounded-2xl overflow-hidden">

        {/* Image */}
        <div className="relative h-[460px] overflow-hidden">
          <img
            ref={imageRef}
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full rounded object-cover"
          />

          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
        </div>

        {/* Wishlist */}
        <button
          className="
            absolute top-4 right-4
            h-10 w-10 rounded-full
            border border-white/20
            flex items-center justify-center
            text-white/70
            hover:border-[#D4AF37] hover:text-[#D4AF37]
            transition-all duration-300
          "
        >
          <Heart className="w-4 h-4" />
        </button>

        {/* Info */}
        <div className="px-5 py-6 text-center">
          <p className="text-sm uppercase tracking-widest text-white/60 mb-2">
            {product.category || "Collection"}
          </p>

          <h3 className="text-lg font-medium text-[#F5F1E6] mb-3">
            {product.name}
          </h3>

          <p className="text-lg font-semibold text-[#D4AF37]">
            ₹{product.price.toLocaleString()}
          </p>
        </div>

        {/* Hover CTA */}
        <div
          className="
            absolute inset-x-0 bottom-0
            flex items-center justify-center
            py-5
            bg-black/80 backdrop-blur-md
            translate-y-full group-hover:translate-y-0
            transition-transform duration-500
          "
        >
          <button
            className="
              flex items-center gap-2
              text-sm uppercase tracking-widest
              text-[#F5F1E6]
              hover:text-[#D4AF37]
              transition-colors
            "
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
