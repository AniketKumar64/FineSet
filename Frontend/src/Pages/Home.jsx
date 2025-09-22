import React, { useEffect, useState } from 'react'
import Hero from '../components/Home/Hero'
import Features from '../components/Home/Features'
import LatestCollection from '../components/Home/LatestCollection';
import EcommerceShowcase from '../components/Home/EcommerceShowcase';
import Footer from '../components/Common/Footer';

const Home = () => {

  const testimonials = [
    {
      name: "Alice Johnson",
      text: "Fantastic products and top-notch customer service! Highly recommend.",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      name: "Mark Smith",
      text: "A seamless shopping experience with great deals. Will shop again!",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);




  return (
    <div>
      <Hero/>
     <Features/>
     
     <EcommerceShowcase/>
     <LatestCollection/>
     <section className="bg-gray-50 py-16">
        <div className="px-8">
          <h3 className="text-3xl font-bold text-black text-center mb-12">
            What Customers Say
          </h3>
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <img
                src={testimonials[currentTestimonial].avatar}
                alt={testimonials[currentTestimonial].name}
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <blockquote className="text-xl text-gray-700 mb-4">
              "{testimonials[currentTestimonial].text}"
            </blockquote>
            <cite className="text-gray-600 font-semibold">
              - {testimonials[currentTestimonial].name}
            </cite>
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full cursor-pointer ${
                    index === currentTestimonial ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>


       <section className="bg-black py-16">
        <div className="px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Join Our Newsletter For Access To Exclusive Offers Today
          </h3>
          <p className="text-gray-300 mb-8">
            Stay updated with our latest collections and special promotions
          </p>
          <div className="max-w-md gap-2 mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 border-b-2 border-gray-300 text-sm focus:outline-none"
            />
            <button className="bg-white rounded text-black px-6 py-3 !rounded-button whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    
    <Footer/>
   
    </div>
  )
}

export default Home