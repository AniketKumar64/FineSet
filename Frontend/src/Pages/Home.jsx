import React, { useEffect, useState } from 'react'
import Hero from '../components/Home/Hero'
import Features from '../components/Home/Features'
import LatestCollection from '../components/Home/LatestCollection';
import EcommerceShowcase from '../components/Home/EcommerceShowcase';
import Footer from '../components/Common/Footer';
import Marquee from '../components/Common/Marquee';
import Contact from '../components/Common/Contact';
import AboutSection from '../components/Home/AboutSection';
import Reviews from '../components/Home/ReviewCard';

const Home = () => {



  return (
    <div className="bg-[#050505] min-h-screen">
      <Hero/>
      <Marquee/>
      <AboutSection/>
      <LatestCollection/>
      <Reviews/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default Home