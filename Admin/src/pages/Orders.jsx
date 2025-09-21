import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { backendUrl } from "../App";
import { Box } from 'lucide-react';
// import {assets} from '../assets';

const currency = "₹";

const Orders = ({token}) => {
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {

    if (!token) {
      return null;
    }
    try{
      const response = await axios.post(backendUrl + '/api/v1/orders/list',{}, {
        headers: {
          token
        }

        
      });

    
    if(response.data.success){
      setOrders(response.data.orders);
    } else {
      //add toast
      console.error('Failed to fetch orders:', response.data.message);
    }

    }
    catch (error) {
      console.error('Error fetching orders:', error);
    }


  }


  const statusHandler= async(event , orderId) => {
    try{
      const response = await axios.post(backendUrl + '/api/v1/orders/status', {orderId, status: event.target.value},{headers:{token}});
      if(response.data.success){
        await fetchOrders(); // Refresh orders after updating status

      }
      
     
       
    }
    catch (error) {
      console.log('Error updating order status:', error);
     
    }
  }






  useEffect(()=>{
    fetchOrders();
  }, [token])

  //1145

  return (
  <div className="p-4 md:p-8 bg-black min-h-screen text-white">
  <h1 className="text-2xl font-bold mb-4">Orders</h1>
  <p className="text-gray-300 mb-6">
    This is the Orders page where you can manage all your orders.
  </p>

  <div className="space-y-4">
    {orders.map((order, idx) => (
      <div
        key={idx}
        className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 p-4 md:p-6 border border-white/20 rounded-lg bg-white/5 items-start"
      >
        {/* Left Box / Placeholder */}
        <Box className="text-white" />

        {/* Order Items & Address */}
        <div className="space-y-2">
          <div className="space-y-1">
            {order.items.map((item, i) => (
              <p key={i} className="text-sm">
                {item.name} x{item.quantity} <span>({item.size})</span>
              </p>
            ))}
          </div>

          <p className="mt-2 font-medium">
            {order.address.firstName} {order.address.lastName}
          </p>

          <div className="text-gray-300 text-sm">
            <p>{order.address.street}</p>
            <p>
              {order.address.city}, {order.address.state}, {order.address.country}
            </p>
            <p>{order.address.phone}</p>
          </div>
        </div>

        {/* Payment & Date */}
        <div className="space-y-1 text-sm text-gray-300">
          <p>Items: {order.items.length}</p>
          <p>Method: {order.paymentMethod}</p>
          <p>
            Payment:{" "}
            {order.payment ? (
              <span className="text-green-400">Paid</span>
            ) : (
              <span className="text-red-400">Pending</span>
            )}
          </p>
          <p>Date: {new Date(order.date).toLocaleDateString()}</p>
        </div>

        {/* Amount */}
        <p className="text-sm sm:text-[15px] font-semibold text-white">
          {currency}{order.amount}
        </p>

        {/* Status Dropdown */}
        <select
          onChange={(event) => statusHandler(event, order._id)}
          value={order.status}
          className="p-2 font-semibold rounded border border-white/20 bg-black/20 text-white"
        >
          <option value="order placed">Order Placed</option>
          <option value="Packing">Packing</option>
          <option value="Shipped">Shipped</option>
          <option value="Out for delivery">Out for delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
    ))}
  </div>
</div>

  
  )
}

export default Orders