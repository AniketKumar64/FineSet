import React from 'react'
import { Heart, ShoppingBag } from 'lucide-react'

const ProductCard = ({ image, title, price }) => {
  return (
       <div className="relative w-[22rem] h-[420px] rounded-2xl overflow-hidden shadow-md group">
   
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />


      <button className="absolute top-3 right-3 bg-white/70 p-2 rounded-full hover:bg-white transition">
        <Heart className="w-5 h-5 text-gray-700" />
      </button>

     
<div className="absolute bottom-3 left-3 right-3 
        bg-white/20 backdrop-blur-xl border border-white/30 
        rounded-xl px-4 py-3 flex items-center justify-between
        opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0
        transition-all duration-500 shadow-lg">
        <div>
          <p className="text-sm text-white font-medium drop-shadow">{title}</p>
          <p className="text-lg font-bold text-white drop-shadow">{price}</p>
        </div>
        <button className="bg-white/80 p-2 rounded-full shadow hover:bg-white transition">
          <ShoppingBag className="w-5 h-5 text-gray-800" />
        </button>
      </div>
    </div>
  )
}

export default ProductCard