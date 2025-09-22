import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
        <div className="px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div>
              <h4 className="font-bold text-black mb-4">Fineset.</h4>
              <p className="text-gray-600 text-sm mb-4">
                Premium menswear for the modern professional. Quality
                craftsmanship meets contemporary style.
              </p>
              <div className="flex space-x-4">
                <i className="fab fa-facebook text-gray-600 cursor-pointer hover:text-black"></i>
                <i className="fab fa-twitter text-gray-600 cursor-pointer hover:text-black"></i>
                <i className="fab fa-instagram text-gray-600 cursor-pointer hover:text-black"></i>
                <i className="fab fa-linkedin text-gray-600 cursor-pointer hover:text-black"></i>
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-black mb-4">Shop</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-black cursor-pointer">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black cursor-pointer">
                    Jackets
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black cursor-pointer">
                    Shirts
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black cursor-pointer">
                    Accessories
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-black mb-4">Support</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-black cursor-pointer">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black cursor-pointer">
                    Size Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black cursor-pointer">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black cursor-pointer">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-black mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-black cursor-pointer">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black cursor-pointer">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black cursor-pointer">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black cursor-pointer">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-black mb-4">Payment Methods</h5>
              <div className="flex space-x-4 ">
                <i className="fab fa-cc-visa text-2xl text-gray-600"></i>
                <i className="fab fa-cc-mastercard text-2xl text-gray-600"></i>
                <i className="fab fa-cc-paypal text-2xl text-gray-600"></i>
                <i className="fab fa-cc-apple-pay text-2xl text-gray-600"></i>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-600">
              © 2025 Fineset. All rights reserved. | Privacy Policy | Terms of
              Service
            </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer