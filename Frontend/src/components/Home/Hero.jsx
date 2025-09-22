import React from 'react'
import heroImage from '../../../public/hero.jpg';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap/all';
import { useGSAP } from '@gsap/react';


const Hero = () => {
  const navigate = useNavigate();
  useGSAP(() => {
 
 
  }, []);




  return (
    <section
        className=".home-section relative bg-gray-50 py-20"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/20 md:bg-black/20 bg-opacity-80"></div>
        <div className="relative px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6  md:text-left">
              <h2 className="text-5xl font-bold text-black leading-tight">
                Layer Up For Success
                <br />
                With Every Meeting
              </h2>
              <p className="text text-lg text-white max-w-md">
                Elevate your professional wardrobe with our premium collection
                of jackets and blazers designed for the modern gentleman.
              </p>
              <button onClick={() => navigate('/products')} className="bg-black text-white px-8 py-3 !rounded-button whitespace-nowrap cursor-pointer hover:bg-black/90 rounded transition-colors">
                VIEW COLLECTION
              </button>
            </div>
            <div></div>
          </div>
        </div>
      </section>
  )
}

export default Hero