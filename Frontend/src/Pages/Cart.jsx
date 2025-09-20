import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';

const Cart = () => {
    const { products, cartitems,getCartAmount, currency, navigate,  updateQuantity } = useContext(ShopContext);

  const [cartdata, setcartdata] = useState([]);
 useEffect(() => {
if(products.length >0){
   
    const tempdata = [];

    for (const items in cartitems) {
      for (const item in cartitems[items]) {
        if (cartitems[items][item] > 0) {
          tempdata.push({
            _id: items,
            size: item,
            quantity: cartitems[items][item]
          });
        }
      }
    }

    setcartdata(tempdata);
  }
}, [cartitems,products]);

  return cartdata.length > 0 ? (
     <div className='min-h-screen  bg-black/50 px-4 py-8'>
        <h1 className='text-4xl font-serif font-bold text-center'>Your Cart</h1>
        {

            cartdata.length > 0 ? (
                <div className='max-w-5xl mx-auto mt-8 flex flex-col gap-6'>
                    {cartdata.map((item)=>{
                        const productdata = products.find((Product)=> Product._id === item._id);
                        return(
                            <div key={item._id+item.size} className='flex flex-col md:flex-row gap-4 md:gap-8 bg-white/10 p-4 rounded-lg'>
                                <img src={productdata.images[0]} alt={productdata.name} className='w-full md:w-48 h-48 object-contain'/>
                                <div className='flex-1 flex flex-col gap-2'>
                                    <h2 className='text-2xl font-bold'>{productdata.name}</h2>
                                    <p className='text-gray-300'>Size: {item.size}</p>
                                    <p className='text-gray-300'>Price: {currency} {productdata.price}</p>
                                    <div className='flex items-center gap-2 mt-2'>
                                        <label className='text-gray-300'>Quantity:</label>
                                        <input type="number" min={1} value={item.quantity} onChange={(e)=> updateQuantity(item._id, item.size, parseInt(e.target.value))} className='w-16 p-1 rounded text-black'/>
                                    </div>
                                </div>
                                <div className='flex items-center'>
                                    <p className='text-xl font-bold'>{currency} {productdata.price * item.quantity}</p>
                                </div>
                            </div>
                        )
                    })}
                    <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total Amount</span><span>{currency}{getCartAmount() === 0 ? 0: getCartAmount() }.00</span></div>
                </div>
            ) : (
                <p className='text-center text-gray-300 mt-8'>Your cart is empty.</p>
            )}
      </div>
  ) : (
    <div className='min-h-screen flex items-center justify-center bg-black/50 px-4'>
        <h1 className='text-4xl font-serif font-bold text-center'>Your cart is empty.</h1>
    </div>
  )
}

          
export default Cart