import React from 'react'
import { Eye, Heart, LucideEye, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
     <Link to={`/product/${product._id}`} className="hover:scale-[1.02] transition group relative">
        <div  className="relative h-[420px] rounded-md overflow-hidden shadow-md group">
   
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />


      <button className="absolute top-3 right-3 bg-white/70 p-2 rounded-full hover:bg-white transition">
        <Heart className="w-5 h-5 text-gray-700" />
      </button>
      <div className="absolute md:hidden w-full  bottom-0 text-black
        bg-white/10 backdrop-blur-xl border border-white/10 
        rounded-b-sm px-4 py-3 flex flex-col 
        opacity-100 translate-y-0
        transition-all duration-500  gap-2 shadow-lg">
        <p className="text-lg text-white/80 font-medium drop-shadow">{product.name}</p>
        <p className="text-xl font-bold text-white drop-shadow">₹{product.price.toLocaleString() } <span className='line-through px-2 text-lg text-red-500'>₹ {(product.price * 1.2).toLocaleString()}</span> </p>
        
      </div>

     
<div className="absolute hidden md:flex bottom-3 left-3 right-3 
        bg-black/70 backdrop-blur-xl border border-white/30 
        rounded-xl px-4 py-3  items-center justify-between
        opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0
        transition-all duration-500 shadow-lg">
        <div>
          <p className="text-sm text-white font-medium drop-shadow">{product.name}</p>
          <p className="text-lg font-bold text-white drop-shadow">₹{product.price.toLocaleString() }</p>
        </div>
        <button className="bg-white/80 p-2 rounded-full shadow hover:bg-white transition">
          <LucideEye className="w-5 h-5 text-gray-800" />
        </button>
      </div>
    </div>
    </Link>
  )
}

export default ProductCard