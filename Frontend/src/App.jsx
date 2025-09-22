import React from 'react'
import { Routes, Route } from 'react-router-dom'
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
  return (
  <div className=" min-h-screen">
    <Navbar />

    
    <div className=" absolute inset-x-0 top-16 ">
       <SearchBar />
     
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<Faqs />} />



        <Route path="/products" element={<Shop />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/user-orders" element={<UserOrders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
       <Route path="*" element={<div className='flex font-[font1] justify-center items-center h-screen text-4xl '>404 Not Found</div>} />


        

        


      </Routes> 
    </div>
    
 

  </div>
  )
}

export default App