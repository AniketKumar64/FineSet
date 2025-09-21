import React, { useEffect, useState } from 'react'
import Hero from '../components/Home/Hero'
import Features from '../components/Home/Features'
import LatestCollection from '../components/Home/LatestCollection';
import EcommerceShowcase from '../components/Home/EcommerceShowcase';

const Home = () => {
const [timeLeft, setTimeLeft] = useState({
    days: 210,
    hours: 3,
    minutes: 43,
    seconds: 43,
  });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => ({
        ...prev,
        seconds: prev.seconds > 0 ? prev.seconds - 1 : 59,
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div>
      <Hero/>
     <Features/>
     
     <EcommerceShowcase/>
     <LatestCollection/>
   
    </div>
  )
}

export default Home