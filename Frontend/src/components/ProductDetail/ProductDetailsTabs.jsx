import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function ProductDetailsTabs({ productdata }) {
  const [activeTab, setActiveTab] = useState("shipping");

const tabs = {
  shipping: {
    label: "01",
    title: "Logistics",
    content: `Estimated arrival: ${productdata.delivery || "3-7 Days"}. Each Fineset timepiece is dispatched via insured express courier. Complimentary worldwide shipping is included with your order, featuring real-time tracking and white-glove handling.`,
  },

  authenticity: {
    label: "02",
    title: "Heritage",
    content:
      "Every creation is accompanied by a serialized Certificate of Authenticity. Our horologists perform a 48-hour calibration and pressure test to ensure your timepiece meets the Fineset 1994 standard of precision.",
  },

  returns: {
    label: "03",
    title: "Returns",
    content:
      "We offer a 7-day return window for unused items in original protective wrapping. Contact our concierge to arrange a secure, insured pickup from your residence. Refunds are processed within 3–5 business days.",
  },

  availability: {
    label: "04",
    title: "Inventory",
    content:
      productdata.stock > 0
        ? `In Stock — A limited run of ${productdata.stock} units is currently available at our workshop.`
        : "Bespoke Order — This piece is currently being crafted. Contact us for priority reservation details.",
  },
    warranty: {
    label: "06",
    title: "Warranty",
    content:
      "Your Fineset watch is protected by a 2-year international warranty covering manufacturing defects. Our global service network ensures seamless maintenance and care wherever you are.",
  }
}



  return (
    <div className="relative w-full  min-h-screen py-24 border-t border-white/5 mt-20 overflow-hidden">
      {/* BACKGROUND WATERMARK */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <h2 className="text-[18vw] font-bold text-white/[0.02] uppercase tracking-tighter leading-none transition-all duration-1000">
          {tabs[activeTab].title}
        </h2>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-24 items-start">
        
        {/* LEFT SIDE: LARGE NAVIGATION */}
        <div className="flex flex-col gap-12">
          {Object.keys(tabs).map((key) => (
            <button
              key={key}
              onMouseEnter={() => setActiveTab(key)}
              onClick={() => setActiveTab(key)}
              className="group flex items-center gap-6 text-left"
            >
              <span className={`text-xs font-mono transition-colors duration-500 ${
                activeTab === key ? "text-[#D4AF37]" : "text-zinc-700"
              }`}>
                {tabs[key].label}
              </span>
              <h3 className={`text-4xl md:text-6xl font-heading font-bold uppercase tracking-tighter transition-all duration-500 ${
                activeTab === key 
                  ? "text-white translate-x-4" 
                  : "text-zinc-800 hover:text-zinc-500"
              }`}>
                {tabs[key].title}
              </h3>
            </button>
          ))}
        </div>

        {/* RIGHT SIDE: LARGE CONTENT AREA */}
        <div className="lg:pt-4">
          <div className="max-w-md">
            <div className="flex items-center gap-4 mb-6 opacity-50">
                <div className="w-12 h-[1px] bg-[#D4AF37]"></div>
                <span className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF37]">Details</span>
            </div>
            
            <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed italic transition-all duration-700 animate-in fade-in slide-in-from-right-4">
              "{tabs[activeTab].content}"
            </p>

            <div className="mt-12 group cursor-pointer flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-zinc-500 hover:text-white transition-all">
                <span>View Full Document</span>
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}