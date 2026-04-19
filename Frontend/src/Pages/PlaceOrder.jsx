import React, { useContext, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { CreditCard, DollarSign, Smartphone, ShieldCheck, MapPin } from "lucide-react";
import { ShopContext } from "../context/ShopContext.jsx";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate, backendUrl, token, cartitems, setCartItems, getCartAmount, products, currency } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", street: "",
    city: "", state: "", zipcode: "", country: "", phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!token) return toast.error("Please login to proceed with your order.");

    try {
      let orderItems = [];
      for (const items in cartitems) {
        for (const item in cartitems[items]) {
          if (cartitems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartitems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = { address: formData, items: orderItems, amount: getCartAmount(), method };

      const path = method === "cod" ? "/api/v1/orders/place" : "/api/v1/orders/place/stripe";
      const response = await axios.post(backendUrl + path, orderData, { headers: { token } });

      if (response.data.success) {
        setCartItems({});
        if (method === "cod") navigate("/orders");
        else window.location.replace(response.data.session_url);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred during checkout.");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-20 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <div className="mb-12 text-center">
        <span className="text-[#D4AF37] text-[10px] tracking-[0.5em] uppercase mb-2 block">Checkout</span>
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter uppercase">Finalize Inquiry</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Left Side: Shipping Information */}
        <div className="flex-1 space-y-12">
          <div className="flex items-center gap-4">
            <MapPin size={18} className="text-[#D4AF37]" />
            <h2 className="text-[10px] tracking-[0.3em] uppercase font-bold">Shipping Address</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            <div className="relative group">
              <input name="firstName" value={formData.firstName} onChange={onChangeHandler} required
                className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-[#D4AF37] transition-all text-sm tracking-widest placeholder:text-zinc-700 uppercase"
                placeholder="FIRST NAME" />
            </div>
            <div className="relative group">
              <input name="lastName" value={formData.lastName} onChange={onChangeHandler} required
                className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-[#D4AF37] transition-all text-sm tracking-widest placeholder:text-zinc-700 uppercase"
                placeholder="LAST NAME" />
            </div>
            <input name="email" type="email" value={formData.email} onChange={onChangeHandler} required
              className="md:col-span-2 w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-[#D4AF37] transition-all text-sm tracking-widest placeholder:text-zinc-700 uppercase"
              placeholder="EMAIL ADDRESS" />
            <input name="phone" type="tel" value={formData.phone} onChange={onChangeHandler} required
              className="md:col-span-2 w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-[#D4AF37] transition-all text-sm tracking-widest placeholder:text-zinc-700 uppercase"
              placeholder="PHONE NUMBER" />
            <input name="street" value={formData.street} onChange={onChangeHandler} required
              className="md:col-span-2 w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-[#D4AF37] transition-all text-sm tracking-widest placeholder:text-zinc-700 uppercase"
              placeholder="STREET ADDRESS" />
            <input name="city" value={formData.city} onChange={onChangeHandler} required
              className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-[#D4AF37] transition-all text-sm tracking-widest placeholder:text-zinc-700 uppercase"
              placeholder="CITY" />
            <input name="state" value={formData.state} onChange={onChangeHandler} required
              className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-[#D4AF37] transition-all text-sm tracking-widest placeholder:text-zinc-700 uppercase"
              placeholder="STATE" />
            <input name="zipcode" value={formData.zipcode} onChange={onChangeHandler} required
              className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-[#D4AF37] transition-all text-sm tracking-widest placeholder:text-zinc-700 uppercase"
              placeholder="ZIP CODE" />
            <input name="country" value={formData.country} onChange={onChangeHandler} required
              className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-[#D4AF37] transition-all text-sm tracking-widest placeholder:text-zinc-700 uppercase"
              placeholder="COUNTRY" />
          </div>
        </div>

        {/* Right Side: Payment & Summary */}
        <div className="lg:w-1/3 space-y-12">
          {/* Payment Method Selection */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <CreditCard size={18} className="text-[#D4AF37]" />
              <h2 className="text-[10px] tracking-[0.3em] uppercase font-bold">Payment Method</h2>
            </div>
            
            <div className="flex flex-col gap-3">
              {[
                { id: "cod", label: "CASH ON DELIVERY", icon: <DollarSign size={14} /> },
                { id: "Stripe", label: "STRIPE / CREDIT CARD", icon: <CreditCard size={14} /> },
                { id: "Razorpay", label: "RAZORPAY / UPI", icon: <Smartphone size={14} /> },
              ].map((opt) => (
                <label key={opt.id} onClick={() => setMethod(opt.id)}
                  className={`flex items-center justify-between px-6 py-4 cursor-pointer border transition-all duration-500 ${
                    method === opt.id ? "border-[#D4AF37] bg-[#D4AF37]/5" : "border-white/5 bg-white/[0.02] hover:border-white/20"
                  }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${method === opt.id ? "bg-[#D4AF37]" : "bg-zinc-800"}`}></div>
                    <span className="text-[10px] tracking-widest uppercase">{opt.label}</span>
                  </div>
                  <div className="text-zinc-500">{opt.icon}</div>
                </label>
              ))}
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="p-8 bg-white/[0.02] border border-white/5 space-y-6">
            <div className="flex justify-between items-baseline">
              <span className="text-zinc-500 text-[10px] tracking-widest uppercase">Total Amount</span>
              <span className="text-2xl font-bold">{currency}{getCartAmount().toLocaleString()}</span>
            </div>
            
            <div className="flex items-center gap-3 text-green-500/80">
              <ShieldCheck size={16} />
              <span className="text-[9px] tracking-widest uppercase font-bold">Insured Global Logistics</span>
            </div>

            <button type="submit"
              className="w-full py-5 bg-white text-black text-[11px] font-bold tracking-[0.4em] uppercase hover:bg-[#D4AF37] hover:text-white transition-all duration-500">
              Complete Order
            </button>
            
            <p className="text-[9px] text-zinc-600 text-center tracking-widest uppercase leading-relaxed">
              By placing this order, you agree to our heritage terms and artisanal delivery conditions.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;