import React from 'react'
import { Minus } from 'lucide-react'

const CartTotal = ({ originalPrice, discountedPrice, currency }) => {

  return (
    <div className="border border-white/10 rounded-lg p-5 bg-white/5">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="flex justify-between mb-2 text-gray-300">
        <span>Original Price:</span>
        <span>
          {currency}
          {originalPrice}
        </span>
      </div>

      <div className="flex justify-between mb-2 text-gray-300">
        <span>Discount:</span>
        <span className=" flex items-center gap-1">
          <Minus size={16} />
          {originalPrice - discountedPrice}
        </span>
      </div>

      <div className="flex justify-between mb-2 text-gray-300">
        <span>Shipping:</span>
        <span>
          {discountedPrice > 500 ? "Free" : `${currency} 50`}
        </span>
      </div>

      <div className="flex justify-between mb-2 text-gray-300">
        <span>Tax:</span>
        <span>
          {currency}
          {Math.round(0.01 * discountedPrice)}
        </span>
      </div>

      <div className="flex justify-between mb-2 text-gray-300">
        <span>Discounted Price:</span>
        <span>
          {currency}
          {discountedPrice}
        </span>
      </div>

      <div className="flex justify-between font-bold text-lg border-t border-white/20 pt-3">
        <span>Total:</span>
        <span>
          {currency}
          {discountedPrice > 500
            ? discountedPrice + Math.round(0.01 * discountedPrice)
            : discountedPrice + 50 + Math.round(0.01 * discountedPrice)}
        </span>
      </div>

    </div>
  )
}

export default CartTotal