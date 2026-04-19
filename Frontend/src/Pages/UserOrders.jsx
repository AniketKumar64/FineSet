import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'sonner';
import { Package, Truck, CheckCircle, Clock, RefreshCcw } from 'lucide-react';

const UserOrders = () => {
    const { backendUrl, token, currency } = useContext(ShopContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUserOrders = async () => {
        try {
            if (!token) return null;
            const response = await axios.post(backendUrl + '/api/v1/orders/userorders', {}, { headers: { token } });
            
            if (response.data.success) {
                let allOrdersItem = [];
                response.data.orders.forEach((order) => {
                    order.items.forEach((item) => {
                        item['status'] = order.status;
                        item['paymentMethod'] = order.paymentMethod;
                        item['payment'] = order.payment;
                        item['date'] = order.date;
                        allOrdersItem.push(item);
                    });
                });
                setOrders(allOrdersItem.reverse());
            }
        } catch (error) {
            console.error('Error fetching user orders:', error);
            toast.error('Could not retrieve your order history');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserOrders();
    }, [token]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Delivered': return <CheckCircle size={14} className="text-green-500" />;
            case 'Shipped': return <Truck size={14} className="text-blue-400" />;
            case 'Processing': return <Clock size={14} className="text-yellow-500" />;
            default: return <RefreshCcw size={14} className="text-zinc-500" />;
        }
    };

    return (
        <div className="bg-[#050505] min-h-screen text-white pt-28 pb-20 px-6 md:px-12 lg:px-20">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <span className="text-[#D4AF37] text-[10px] tracking-[0.5em] uppercase mb-2 block">Account Archive</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter">MY ACQUISITIONS</h2>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-20 border border-white/5 bg-white/[0.02]">
                        <Package size={48} className="mx-auto text-zinc-800 mb-4 stroke-1" />
                        <p className="text-zinc-500 tracking-widest uppercase text-xs">Your order history is empty</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order, index) => (
                            <div 
                                key={index} 
                                className="group relative flex flex-col md:flex-row items-center gap-8 p-6 bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500"
                            >
                                {/* Product Image */}
                                <div className="w-full md:w-24 h-24 bg-zinc-900 overflow-hidden shrink-0">
                                    <img 
                                        src={order.image || order.images?.[0]} 
                                        alt={order.name} 
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>

                                {/* Order Info */}
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                                    <div>
                                        <h3 className="text-lg font-bold tracking-tight mb-1 uppercase">{order.name}</h3>
                                        <div className="flex items-center gap-4 text-[10px] tracking-widest text-zinc-500 uppercase">
                                            <span>Price: {currency}{order.price}</span>
                                            <span>Qty: {order.quantity}</span>
                                            <span>Size: {order.size}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:items-center justify-center">
                                        <p className="text-[10px] tracking-widest text-zinc-500 uppercase mb-2">Order Date</p>
                                        <span className="text-sm font-light text-zinc-300">
                                            {new Date(order.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </span>
                                    </div>

                                    <div className="flex flex-col md:items-end justify-center">
                                        <div className="flex items-center gap-2 mb-2">
                                            {getStatusIcon(order.status)}
                                            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white">
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${order.payment ? 'bg-green-500' : 'bg-red-500'}`} />
                                            <span className="text-[9px] tracking-widest text-zinc-500 uppercase">
                                                {order.paymentMethod} — {order.payment ? 'Paid' : 'Pending'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Tracking Action */}
                                <div className="w-full md:w-auto">
                                    <button 
                                        onClick={fetchUserOrders}
                                        className="w-full md:w-auto px-6 py-3 border border-white/10 text-[9px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-500"
                                    >
                                        Track Order
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserOrders;