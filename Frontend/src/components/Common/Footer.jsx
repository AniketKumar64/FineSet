import React from 'react'

const Footer = () => {
  return (
    <div className=" bg-black text-gray-400 bodyfont  mt-20">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h3 className="text-lg font-semibold mb-4 headfont text-white">About Us</h3>
                <p className="text-sm">
                    We are committed to providing high-quality products and excellent customer service. Our mission is to enhance your lifestyle with our unique offerings.
                </p>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-4 headfont text-white">Customer Service</h3>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:underline">Contact Us</a></li>
                    <li><a href="#" className="hover:underline">Returns</a></li>
                    <li><a href="#" className="hover:underline">Shipping Info</a></li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer