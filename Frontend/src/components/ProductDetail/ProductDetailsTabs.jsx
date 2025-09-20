import { useState } from "react";

export default function ProductDetailsTabs({ productdata }) {
  const [activeTab, setActiveTab] = useState("shipping");

const tabs = {
  shipping: {
    title: "Shipping",
    content: `Estimated delivery: ${
      productdata.delivery || "3-7 Days"
    }. Orders are processed within 24 hours and shipped through trusted courier partners. Real-time tracking is provided to ensure transparency and peace of mind. Express shipping options may be available at checkout.`,
  },

  policy: {
    title: "Policy",
    content:
      "We guarantee 100% genuine and high-quality products. All items undergo multiple quality checks before dispatch. By purchasing, you agree to our store policies covering product authenticity, safe packaging, and customer satisfaction. Please review the complete terms and conditions prior to placing your order.",
  },

  returns: {
    title: "Returns",
    content:
      "You can return the product within 7 days of delivery if unused, unwashed, and in its original packaging with all tags intact. Refunds are initiated once the product passes quality inspection and are processed within 3–5 business days. For damaged or incorrect products, we offer free reverse pickup and hassle-free replacement.",
  },

  stock: {
    title: "Stock Availability",
    content:
      productdata.stock > 0
        ? `In Stock — Only ${productdata.stock} item(s) left. Limited availability, so place your order soon to avoid missing out.`
        : "Currently out of stock. Please check back later, or browse similar products from the same category. You can also sign up for restock alerts to be notified when this item becomes available again.",
  },
};

  return (
    <div className="py-2">
      {/* Tabs Heading */}
      <div className="flex gap-6 border-b border-gray-300">
        {Object.keys(tabs).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`pb-2 font-medium ${
              activeTab === key
                ? "text-white text-md border-b-2 border-black"
                : "text-gray-500 text-sm hover:text-white " 
            }`}
          >
            {tabs[key].title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 text-gray-400 text-sm leading-relaxed">
        {tabs[activeTab] && <p className="text-sm ">{tabs[activeTab].content}</p>}
      </div>
    </div>
  );
}
