import React, { useContext, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { CreditCard, DollarSign, Smartphone, Wallet } from "lucide-react"
import { ShopContext } from "../context/ShopContext.jsx";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartitems,
    setCartItems,
    getCartAmount,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
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

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartitems) {
        for (const item in cartitems[items]) {
          if (cartitems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
              
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartitems[items][item];
              orderItems.push(itemInfo);
              console.log(items, products.find(product => product._id === items));
            }
          }
        }
      }
      

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount(),
        method,
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
            toast.error("please login to continue");
          }

          break;

        case "Stripe":
          const stripeResponse = await axios.post(
            backendUrl + "/api/v1/orders/place/stripe",
            orderData,
            { headers: { token } }
          );
          if (stripeResponse.data.success) {
            const {session_url} = stripeResponse.data;
            window.location.replace(session_url);
          } else {

            toast.error("please login to continue");
          }
break;

      

      



     
      }
    } catch (error) {
      console.log("Error creating order:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 md:px-20">
      <h1 className="text-3xl font-bold mb-6 text-center">Place Order</h1>

      <form
        onSubmit={handleSubmit}
        className="min-h-full mx-auto bg-white/5 p-6 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
<div className="flex flex-col md:flex-row gap-8">
  {/* Left Side: Shipping Info */}
  <div className="flex-1 space-y-4">
    {/* Name Fields */}
    <div className="flex flex-col md:flex-row gap-4">
      <input
        name="firstName"
        value={formData.firstName}
        onChange={onChangeHandler}
        placeholder="First Name"
        className="flex-1 px-4 py-2 rounded border border-white/20 bg-black/10 focus:outline-none focus:ring-2 focus:ring-white/50"
        required
      />
      <input
        name="lastName"
        value={formData.lastName}
        onChange={onChangeHandler}
        placeholder="Last Name"
        className="flex-1 px-4 py-2 rounded border border-white/20 bg-black/10 focus:outline-none focus:ring-2 focus:ring-white/50"
        required
      />
    </div>

    <input
      name="email"
      value={formData.email}
      onChange={onChangeHandler}
      placeholder="Email"
      type="email"
      className="w-full px-4 py-2 rounded border border-white/20 bg-black/10 focus:outline-none focus:ring-2 focus:ring-white/50"
      required
    />
    <input
      name="phone"
      value={formData.phone}
      onChange={onChangeHandler}
      placeholder="Phone"
      type="tel"
      className="w-full px-4 py-2 rounded border border-white/20 bg-black/10 focus:outline-none focus:ring-2 focus:ring-white/50"
      required
    />
    <input
      name="street"
      value={formData.street}
      onChange={onChangeHandler}
      placeholder="Street Address"
      className="w-full px-4 py-2 rounded border border-white/20 bg-black/10 focus:outline-none focus:ring-2 focus:ring-white/50"
      required
    />

    {/* City & State */}
    <div className="flex flex-col md:flex-row gap-4">
      <input
        name="city"
        value={formData.city}
        onChange={onChangeHandler}
        placeholder="City"
        className="flex-1 px-4 py-2 rounded border border-white/20 bg-black/10 focus:outline-none focus:ring-2 focus:ring-white/50"
        required
      />
      <input
        name="state"
        value={formData.state}
        onChange={onChangeHandler}
        placeholder="State"
        className="flex-1 px-4 py-2 rounded border border-white/20 bg-black/10 focus:outline-none focus:ring-2 focus:ring-white/50"
        required
      />
    </div>

    {/* Zipcode & Country */}
    <div className="flex flex-col md:flex-row gap-4">
      <input
        name="zipcode"
        value={formData.zipcode}
        onChange={onChangeHandler}
        placeholder="Zip Code"
        className="flex-1 px-4 py-2 rounded border border-white/20 bg-black/10 focus:outline-none focus:ring-2 focus:ring-white/50"
        required
      />
      <input
        name="country"
        value={formData.country}
        onChange={onChangeHandler}
        placeholder="Country"
        className="flex-1 px-4 py-2 rounded border border-white/20 bg-black/10 focus:outline-none focus:ring-2 focus:ring-white/50"
        required
      />
    </div>
  </div>

  {/* Right Side: Payment Methods */}
  <div className="flex-1 mt-4 md:mt-0 space-y-4">
    <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
   {[
    { value: "cod", label: "Cash on Delivery", icon: <DollarSign size={20} /> },
    { value: "Stripe", label: "Stripe Payment", icon: <Smartphone size={20} /> },
    { value: "Razorpay", label: "Razorpay Payment", icon: <Smartphone size={20} /> },
 
  ].map((methodOption) => (
    <label
      key={methodOption.value}
      className={`
        flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-all
        ${method === methodOption.value
          ? "bg-white text-black border-white"
          : "bg-black/10 text-white border-white/20 hover:bg-white/20"}
      `}
    >
      <input
        type="radio"
        name="method"
        value={methodOption.value}
        checked={method === methodOption.value}
        onChange={() => setMethod(methodOption.value)}
        className="hidden"
      />
      {methodOption.icon}
      <span>{methodOption.label}</span>
    </label>
  ))}
</div>

  </div>
</div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-black hover:text-white transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;
