import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast, Toaster } from 'sonner';

// todo - show all orders of user and redesign the page

const UserOrders = () => {

    const { backendUrl, token , currency } = useContext(ShopContext);

    const [orders, setOrders] = useState([]);

    const fetchUserOrders = async () => {
        try{
            if(!token){
                return null;
            }
            const response = await axios.post(backendUrl + '/api/v1/orders/userorders', {}, { headers: { token } });
            console.log("User Orders Response:", response.data.orders);
            if(response.data.success){
                let allOrdersitem =[];
                response.data.orders.map((order)=>{
                    order.items.map((item)=>{
                        item['status'] = order.status;
                        item['paymentMethod'] = order.paymentMethod;
                        item['payment'] = order.payment;
                        item['date'] = order.date;
                        
                        allOrdersitem.push(item);
                    })
                })
                setOrders(allOrdersitem.reverse());
                console.log("Processed Orders:", allOrdersitem);
            }
        } catch (error) {
            console.error('Error fetching user orders:', error);
            Toaster.error('Error fetching user orders');
        }
    }

    useEffect(()=>{
        fetchUserOrders();
    },[token])
  return (
<div className="pt-5 p-4">
  
    <h2 className="text-2xl text-center font-bold mb-4">My Orders</h2>
    {orders.length === 0 ? (
        <p>You have no orders yet.</p>
    ) : (
        <div className="space-y-4">
            {orders.map((order, index) => (
                <div key={index} className="border max-w-7xl mx-auto p-4 rounded-lg bg-white/5">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Order Date:</span>
                        <span>{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-sm ${order.status === 'Delivered' ? 'bg-green-500 text-white' : order.status === 'Shipped' ? 'bg-blue-500 text-white' : order.status === 'Processing' ? 'bg-yellow-500 text-black' : 'bg-gray-500 text-white'}`}>{order.status}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Payment Method:</span>
                        <span>{order.paymentMethod}</span>
                    </div>
                    {
                        order.payment === false ? (
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold">Payment Status:</span>
                                <span className="text-red-500">Pending</span>
                            </div>
                        ) : (
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold">Payment Status:</span>
                                <span className="text-green-500">Paid</span>
                            </div>
                        )}
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Product:</span>
                        <span>{order.name} (x{order.quantity})</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Size:</span>
                        <span>{order.size}</span>
                    </div>
                </div>
            ))}
        </div>
    )}
</div>
  )
}

export default UserOrders