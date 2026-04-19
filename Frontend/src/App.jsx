import React, { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import '@fortawesome/fontawesome-free/css/all.min.css';



import Navbar from './components/Common/Navbar'
import SearchBar from './components/Common/SearchBar'
import Shop from './Pages/Shop'
import ProductDetail from './Pages/ProductDetail'
import PlaceOrder from './Pages/PlaceOrder'
import UserOrders from './Pages/UserOrders'
import Verify from './Pages/Verify'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cart from './Pages/Cart'

import OrderSuccess from './Pages/OrderSuccess'

import Login from './Pages/Login'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Faqs from './Pages/Faqs'


gsap.registerPlugin(ScrollTrigger);




function App() {
  const appRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Elegant fade-in and slide-up animation for route transitions
    if (appRef.current) {
      gsap.fromTo(
        appRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [location.pathname]);

  return (
  <div className="min-h-screen bg-background text-foreground transition-colors duration-500 overflow-hidden ">
    <Navbar />

    
    <div className="" ref={appRef}>
       <SearchBar />
     
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<Faqs />} />


        <Route path="/collection" element={<Shop />} />

        <Route path="/products" element={<Shop />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/user-orders" element={<UserOrders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        
        {/* Redesigned 404 Page */}
        <Route path="*" element={
          <div className='flex flex-col font-[font1] justify-center items-center min-h-[100vh] bg-black text-center space-y-6 px-6'>
            <h1 className='text-8xl md:text-9xl lg:text-[12rem] tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent drop-shadow-2xl'>
              404
            </h1>
            <h2 className='text-3xl md:text-5xl text-[#D4AF37] mt-4 headfont tracking-wide'>
              Lost in the Void
            </h2>
            <p className='text-muted-foreground font-[font3] text-lg md:text-xl max-w-lg mt-4 leading-relaxed'>
              The page you are looking for has vanished into thin air, or might have never existed. Let's redirect you to safer grounds.
            </p>
            <a href="/" className='mt-10 px-10 py-4 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-white hover:bg-[#D4AF37] hover:text-black hover:scale-105 transition-all duration-300 font-medium tracking-wide shadow-lg backdrop-blur-md'>
              Return to Home
            </a>
          </div>
        } />


        

        


      </Routes> 
    </div>
    
 

  </div>
  )
}

export default App