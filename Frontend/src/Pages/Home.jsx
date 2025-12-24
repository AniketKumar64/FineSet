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