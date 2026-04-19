import React, { useContext, useEffect, useState } from "react";
import { Plus, Minus, Trash2, Truck, BadgeCheck, ShoppingBag } from "lucide-react";
import { Button } from "../components/ui/button";
import { ShopContext } from "../context/ShopContext.jsx";

const Cart = () => {
  const {
    products,
    cartitems,
    getCartAmount,
    currency,
    navigate,
    updateQuantity,
  } = useContext(ShopContext);

  const [cartdata, setcartdata] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempdata = [];
      for (const items in cartitems) {
        for (const item in cartitems[items]) {
          if (cartitems[items][item] > 0) {
            tempdata.push({
              _id: items,
              size: item,
              quantity: cartitems[items][item],
            });
          }
        }
      }
      setcartdata(tempdata);
    }
  }, [cartitems, products]);

  const subtotal = getCartAmount();

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-20 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <div className="mb-12 text-center lg:text-left">
        <span className="text-[#D4AF37] text-[10px] tracking-[0.5em] uppercase mb-2 block">Your Selection</span>
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter">SHOPPING BAG</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left side - Product List */}
        <div className="lg:w-3/5 w-full space-y-6">
          {cartdata.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 border border-white/5 bg-white/[0.02]">
              <ShoppingBag size={48} className="text-zinc-700 mb-4 stroke-1" />
              <p className="text-zinc-500 tracking-widest uppercase text-xs">Your bag is currently empty</p>
              <Button 
                onClick={() => navigate('/collection')}
                className="mt-6 bg-white text-black text-[10px] tracking-[0.3em] uppercase px-8 py-6 rounded-none hover:bg-[#D4AF37] transition-all"
              >
                Return to Shop
              </Button>
            </div>
          ) : (
            cartdata.map((item, index) => {
              const product = products.find((prod) => prod._id === item._id);
              if (!product) return null;

              return (
                <div
                  key={index}
                  className="group flex flex-col sm:flex-row gap-6 border-b border-white/5 pb-8 transition-all"
                >
                  {/* Product Image */}
                  <div 
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="w-full sm:w-40 aspect-[4/5] bg-zinc-900 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col flex-1 justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <h2 className="font-semibold text-xl tracking-tight mb-1">{product.name}</h2>
                        <button 
                          onClick={() => updateQuantity(item._id, item.size, 0)}
                          className="text-zinc-600 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={18} strokeWidth={1.5} />
                        </button>
                      </div>
                      <p className="text-[10px] tracking-widest text-[#D4AF37] uppercase mb-4">Size: {item.size}</p>
                      
                      <p className="text-xl font-light">
                        {currency}{product.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-6 mt-6 sm:mt-0">
                      <div className="flex items-center border border-white/10 px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                          className="p-2 text-zinc-500 hover:text-white transition"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium leading-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                          className="p-2 text-zinc-500 hover:text-white transition"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <div className="text-right ml-auto">
                        <p className="text-[10px] text-zinc-500 tracking-widest uppercase mb-1">Total</p>
                        <p className="text-lg font-medium">{currency}{(product.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right side - Summary */}
        <div className="lg:w-2/5 w-full">
          <div className="sticky top-32 p-10 bg-white/[0.02] border border-white/5">
            <h2 className="text-[10px] tracking-[0.5em] uppercase text-[#D4AF37] mb-10">Order Summary</h2>
            
            <div className="space-y-4 mb-10">
              <div className="flex justify-between text-sm tracking-wide text-zinc-400">
                <span>Subtotal</span>
                <span className="text-white">{currency}{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm tracking-wide text-zinc-400">
                <span>Shipping</span>
                <span className="text-green-500 uppercase text-[10px] tracking-widest font-bold">Complimentary</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline border-t border-white/10 pt-6 mb-10">
              <span className="text-lg font-medium tracking-tight">Total</span>
              <span className="text-3xl font-bold">{currency}{subtotal.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-4 py-4 px-4 bg-white/[0.03] border border-white/5 mb-8">
              <Truck size={18} className="text-[#D4AF37]" />
              <p className="text-[9px] tracking-[0.2em] text-zinc-400 uppercase">
                Insured worldwide shipping & duty-free delivery
              </p>
            </div>

            <Button
              onClick={() => navigate("/place-order")}
              disabled={cartdata.length === 0}
              className="w-full py-8 bg-white text-black text-[11px] tracking-[0.4em] font-bold uppercase rounded-none hover:bg-[#D4AF37] hover:text-white transition-all duration-500 disabled:opacity-20"
            >
              Secure Checkout
            </Button>

            <div className="mt-6 flex items-center justify-center gap-2 opacity-30">
              <BadgeCheck size={14} />
              <span className="text-[9px] tracking-widest uppercase">Authenticity Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;