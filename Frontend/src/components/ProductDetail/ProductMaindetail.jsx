import React, { useState } from 'react'

const ProductMaindetail = ({ productdata }) => {
  const [activeTab, setActiveTab] = useState("description");


const tabs = {
    description: {
    title: "Description",
    content: `${productdata.description || "No description available. Please check back later."}`

    },


  shipping: {
    title: "Shipping",
    content: `Estimated delivery: ${
      productdata.delivery || "3-7 Days"
    }. Orders are processed within 24 hours and shipped through trusted courier partners. Real-time tracking is provided to ensure transparency and peace of mind. Express shipping options may be available at checkout.
    Free shipping on orders over $50. For international orders, customs duties and taxes may apply based on your country's regulations.
    Please allow additional time for delivery during peak seasons and holidays.
    Note: Delivery times are estimates and may vary due to unforeseen circumstances such as weather or logistical issues.
    For any shipping-related inquiries, please contact our customer support team.
    30-day return policy for unused products in original packaging. See our Returns page for details.
    `,
  },


  policy: {
    title: "Policy",
    content:`
      We guarantee 100% genuine and high-quality products. All items undergo multiple quality checks before dispatch. By purchasing, you agree to our store policies covering product authenticity, safe packaging, and customer satisfaction. Please review the complete terms and conditions prior to placing your order on our website. Your satisfaction is our priority, and we are committed to providing excellent service and support throughout your shopping experience.
    `

  },

  returns: {
    title: "Returns",
    content:
      `
      We accept returns within 30 days of purchase for unused products in original packaging. To initiate a return, please contact our customer support team with your order details. Once your return is received and inspected, we will notify you of the approval or rejection of your refund. Approved refunds will be processed to your original payment method within 7-10 business days. Please note that shipping costs are non-refundable, and you are responsible for return shipping fees unless the return is due to our error. For more information, please visit our Returns page or contact customer support.
      `,
  },


};
    ;
    return (
     <div className="py-4 px-6">
      {/* Tabs Heading */}
      <div className="flex gap-6 border-b border-gray-300">
        {Object.keys(tabs).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`pb-2 font-medium ${
              activeTab === key
                ? "text-white text-lg border-b-2 border-black"
                : "text-gray-500 text-md hover:text-white " 
            }`}
          >
            {tabs[key].title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 text-gray-400 text-md leading-relaxed">
        {tabs[activeTab] && <p className="text-md h-full ">{tabs[activeTab].content}</p>}
      </div>
    </div>
    )
}

export default ProductMaindetail
