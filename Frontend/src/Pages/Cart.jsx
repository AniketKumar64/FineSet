import React, { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { Plus, Minus, Trash2 } from "lucide-react"
import { Button } from "../components/ui/button"
import { Truck, BadgeCheck } from "lucide-react";

const Cart = () => {
  const {
    products,
    cartitems,
    getCartAmount,
    currency,
    navigate,
    updateQuantity,
  } = useContext(ShopContext)

  const [cartdata, setcartdata] = useState([])
  const discountPercentage = 20

  // Step 1: Calculate the original total
  const originalPrice = Math.round(
    cartdata.reduce((total, item) => {
      const product = products.find((prod) => prod._id === item._id)
      if (product) {
        return total + product.price * item.quantity
      }
      return total
    }, 0)
  )

  // Step 2: Apply discount
  const discountedPrice = Math.round(
    originalPrice * (1 - discountPercentage / 100)
  )

  useEffect(() => {
    if (products.length > 0) {
      const tempdata = []
      for (const items in cartitems) {
        for (const item in cartitems[items]) {
          if (cartitems[items][item] > 0) {
            tempdata.push({
              _id: items,
              size: item,
              quantity: cartitems[items][item],
            })
          }
        }
      }
      setcartdata(tempdata)
    }
  }, [cartitems, products])

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Cart Items
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side */}
        <div className="md:w-3/5 w-full space-y-4">
          {cartdata.length === 0 ? (
            <p className="text-center text-gray-400">Your cart is empty</p>
          ) : (
            cartdata.map((item, index) => {
              const product = products.find((prod) => prod._id === item._id)
              if (!product) return null

              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row gap-4 border border-white/10 rounded-lg p-4 bg-white/5"
                >
                  {/* Product Image */}
                  <img
                    onClick={() => navigate(`/product/${product._id}`)}
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full sm:w-28 h-28 object-cover rounded cursor-pointer"
                  />

                  {/* Product Info */}
                  <div className="flex flex-col flex-1">
                    <h2 className="font-semibold text-lg">{product.name}</h2>
                    <p className="text-sm text-gray-400">Size: {item.size}</p>

                    <p className="text-lg font-bold mt-1">
                      {currency}
                      {product.price * item.quantity}
                    </p>

                    {/* MRP and Savings */}

                    <p className="text-sm text-gray-500">
                      MRP:{" "}
                      <span className="line-through">
                        {currency}
                        {Math.round(
                          product.price / (1 - discountPercentage / 100)
                        )}
                      </span>
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-green-400 font-light text-sm">
                        Save:{" "}
                        {currency}
                        {Math.round(
                          (discountPercentage / 100) *
                            (product.price /
                              (1 - discountPercentage / 100))
                        )}
                      </p>
                      <p className="text-red-400 text-sm">
                        {discountPercentage}% OFF
                      </p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-row sm:flex-col items-center justify-between sm:items-end gap-3">
                     <Button 
                     onClick={() => updateQuantity(item._id, item.size, 0)}
                     className="p-2 border border-red-500 text-red-500 hover:bg-red-600 hover:text-white transition">
                      <Trash2 size={18} />
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            item.size,
                            item.quantity - 1
                          )
                        }
                        className="p-2 border border-white text-white hover:bg-white hover:text-black transition"
                      >
                        <Minus size={16} />
                      </Button>

                      <span className="px-2 font-semibold">
                        {item.quantity}
                      </span>

                      <Button
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        className="p-2 border border-white text-white hover:bg-white hover:text-black transition"
                      >
                        <Plus size={16} />
                      </Button>
                    </div>

                   
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Right side - Order Summary */}
        <div className="md:w-2/5 w-full">
             <div className="border border-white/10 rounded-lg p-5 bg-white/5">
               <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
         
               <div className="flex justify-between mb-2 text-gray-300">
                 <span>Original Price:</span>
                 <span>
                   {currency}
                   {originalPrice}
                 </span>
               </div>
         
               {/* <div className="flex justify-between mb-2 text-gray-300">
                 <span>Discount:</span>
                 <span className=" flex items-center gap-1">
                   <Minus size={16} />
                   {originalPrice - discountedPrice}
                 </span>
               </div>
          */}
               <div className="flex justify-between mb-2 text-gray-300">
                 <span>Shipping:</span>
                 <span>
                   {discountedPrice > 500 ? "Free" : `${currency} 50`}
                 </span>
               </div>
               {/* shipping free and no extra charges */}
               
         
               <div className="w-full my-10 bg-black text-white py-4 px-6 flex items-center justify-center gap-3 rounded-lg shadow-md">
      <Truck className="w-5 h-5 text-green-400" />
      <span className="text-sm md:text-base font-medium">
        Free Shipping & No Extra Charges
      </span>
      <BadgeCheck className="w-5 h-5 text-green-400" />
    </div>
         
               <div className="flex justify-between font-bold text-lg border-t border-white/20 pt-3">
                 <span>Total:</span>
                 <span>
                   {currency}
                  {originalPrice }
                 </span>
               </div>
         
             </div>
         <div className=" w-full flex justify-end ">
           <Button
            onClick={() => navigate("/place-order")}
            disabled={cartdata.length === 0}
            className=" w-full md:w-1/2  flex items-center justify-center mt-4 py-4 md:px-6 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
          >
            Proceed to Checkout
          </Button>
         </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
