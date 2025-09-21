import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Account from './pages/Account'
import Login from './pages/Login'
import Navbar from './components/Common/Navbar'
import SearchBar from './components/Common/SearchBar'
import Shop from './Pages/Shop'
import ProductDetail from './Pages/ProductDetail'
import PlaceOrder from './Pages/PlaceOrder'
import UserOrders from './Pages/UserOrders'
import Verify from './Pages/Verify'





function App() {
  return (
  <div className=" min-h-screen">
    <Navbar />

    
    <div className=" absolute inset-x-0 top-16 ">
       <SearchBar />
     
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Shop />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/user-orders" element={<UserOrders />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
       <Route path="*" element={<div>404 Not Found</div>} />


        

        


      </Routes> 
    </div>
    
 

  </div>
  )
}

export default App