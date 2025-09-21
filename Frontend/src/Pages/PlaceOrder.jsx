import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const [method, setmethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartItems,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  //11:12

  const onChangeHandler = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  setFormdata(data => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      console.log(orderItems);
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getcarta() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/v1/orders/place",
            orderData,
            { headers: { token } }
          );

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }

          break;

        default:
      }
    } catch (error) {
      console.log("Error creating order:", error);
    }
  };

  return <div className="">
 <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-around gap-4 pt-5 sm:pt-14  min-h-[80vh] border-t text-white px-6 md:px-16 py-10">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
            <h2 className="font-semibold">BILLING DETAILS</h2>
          </div>

          <div className="flex gap-3">
            <input type="text" onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First Name' />
              <input type="text" onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Last  Name' />
          </div>
          {/* street and email */}

           <input type="text" onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street Address' />
              <input type="text" onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Email Address' />

              <div className="flex gap-3">
                {/* city and state */}
                <input type="text" onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' />
                <input type="text" onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State' />
              </div>

              <div className="flex gap-3">
                {/* zipcode and country */}
                <input type="text" onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Zip Code' />
                <input type="text" onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Country' />
              </div>

              {/* phone number */}
              <input type="text" onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone Number' />
        
        </div>

      <div className="">
        <div className="text-xl sm:text-2xl my-3">
            <h2 className="font-semibold">YOUR ORDER</h2>
          </div>
          </div>


          <div className="mt-12">
        <div className="w-full border-t border-b py-4">
          <div className="flex justify-between mb-3 font-semibold">
            <p>PRODUCT</p>
            <p>TOTAL</p>
          </div>
          <div className="flex gap-3 flex-col md:flex-col lg:flex-row">
            <div onClick={() => { setmethod("cod") }} className="flex items-center  border p-2 px-3 cursor-pointer ">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-black' : 'bg-white'}`}></p>
              <span className='h-5 mx-4 fle items-center justify-center text-center'
              >cash on delivery</span>
            </div>

            <div onClick={() => { setmethod("razorpay") }} className="flex items-center gap-3 border p-2 px-3 cursor-pointer ">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-black' : 'bg-white'}`}></p>
              <img className='h-5 mx-4' src="#" alt="" />
            </div>
            <div onClick={() => setmethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer ">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-black' : 'bg-white'}`}></p>
              <img className='h-5 mx-4' src="#" alt="" />
            </div>
          </div>
          <div className="w-full text-end mt-8">
  <button type='submit' onClick={()=>navigate('/orders')}
    className="flex-1 px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition">
    Place Order
  </button>
</div>
        </div>
      </div>



    </form>

  </div>;
};

export default PlaceOrder;
