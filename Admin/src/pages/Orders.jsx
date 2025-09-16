import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { backendUrl } from "../App";
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
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <p className="text-gray-700">This is the Orders page where you can manage all your orders.</p>
     <div className="">
      {orders.map((order,idx)=>(
        <div key={idx} className="grid  grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border2 border-gray-200 p-5 md:p-8 my-3 md:my-4 sm:text-sm text-gray-700">
          <img src={assets.paracel_icon} className='w-12' alt="" />
          <div className="">
            <div className="">
            {
              order.items.map((item,idx)=>{
                if(idx === order.items.length-1){
                  return <p key={idx}  className='py-0.5' >
                    {item.name} x{item.quantity} <span>{item.size}</span>
                  </p>
                }
                else{
                  return <p className='py-0.5'  key={idx}>{item.name} X {item.quantity} <span>{item.size}</span></p>
                }
              })
            }
          </div>
          <p className='mt-3 mb-2 font-medium'>{order.address.firstName +" "+order.address.lastName}</p>
          <div className="">
            <p>{order.address.street + ","}</p>
            <p>{order.address.city +","+order.address.state+ " ,"+ order.address.country}</p>
          </div>
          <p>{order.address.phone}</p>
        </div>
        <div className="">
          <p className='text-sm sm:text-[15px]'>Items:{order.items.length}</p>
          <p className='mt-3'>Method : {order.paymentMethod}</p>
          <p>Payment: {order.payment ? <span>Paid</span> : <span>Pending</span>}</p>
          <p>Date :{new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
        <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className="p-2 font-semibold">
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