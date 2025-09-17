import React, { useState } from "react";

const currency = "$";

const initialOrders = [
  {
    _id: "order123456",
    userId: "user001",
    items: [
      { productId: "prod101", name: "Wireless Mouse", quantity: 1, price: 25.99, size: "Standard" },
      { productId: "prod102", name: "Mechanical Keyboard", quantity: 1, price: 89.99, size: "Full-size" }
    ],
    amount: 115.98,
    address: {
      firstName: "John",
      lastName: "Doe",
      street: "123 Park Street",
      city: "Delhi",
      state: "Delhi",
      postalCode: "110001",
      country: "India",
      phone: "+91-9876543210"
    },
    status: "Order Placed",
    paymentMethod: "Credit Card",
    payment: true,
    createdAt: 1694947200000
  },
  {
    _id: "order123457",
    userId: "user002",
    items: [
      { productId: "prod103", name: "Smartphone", quantity: 1, price: 499.99, size: "128GB" }
    ],
    amount: 499.99,
    address: {
      firstName: "Jane",
      lastName: "Smith",
      street: "45 Lake Road",
      city: "Bangalore",
      state: "Karnataka",
      postalCode: "560001",
      country: "India",
      phone: "+91-9876543211"
    },
    status: "Shipped",
    paymentMethod: "UPI",
    payment: true,
    createdAt: 1695033600000
  }
];

const statusHandler = (event, orderId) => {
  console.log(`New Status for Order ${orderId}: ${event.target.value}`);
  // Implement API update logic here
};

const TrackingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");


  const filteredOrders = initialOrders.filter((order) =>
    order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())||
      order.userId.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const getProgress = (status) => {
    switch (status) {
      case "Order Placed":
        return "w-1/5";
      case "Packing":
        return "w-2/5";
      case "Shipped":
        return "w-3/5";
      case "Out for delivery":
        return "w-4/5";
      case "Delivered":
        return "w-full";
      default:
        return "w-0";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-extrabold text-center mb-10">📦 Order Tracking Dashboard</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by User ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 w-full max-w-md rounded-lg bg-gray-800 text-white placeholder-gray-400"
        />
      </div>

      <div className="grid grid-cols-1 gap-10">
        {filteredOrders.map((order, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-6 items-start p-6 my-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg hover:scale-105 transition-transform"
          >
            {/* Icon */}
            <img src="/assets/paracel_icon.png" className="w-12" alt="Parcel Icon" />

            {/* Order Details */}
            <div>
              {order.items.map((item, i) => (
                <p key={i} className="py-1">
                  {item.name} x{item.quantity}{" "}
                  <span className="italic text-gray-300">[{item.size}]</span>
                </p>
              ))}

              <p className="mt-3 font-medium text-lg">
                {order.address.firstName} {order.address.lastName}
              </p>

              <div className="text-gray-300 text-sm">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country}
                </p>
              </div>

              <p className="mt-2 text-gray-300">{order.address.phone}</p>
            </div>

            {/* Payment & Date */}
            <div className="text-gray-300 text-sm">
              <p>Items: {order.items.length}</p>
              <p className="mt-2">Method: {order.paymentMethod}</p>
              <p className="mt-2">
                Payment:{" "}
                {order.payment ? (
                  <span className="text-green-400">Paid</span>
                ) : (
                  <span className="text-yellow-300">Pending</span>
                )}
              </p>
              <p className="mt-2">
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Amount */}
            <p className="text-lg font-semibold text-indigo-300">
              {currency}{order.amount.toFixed(2)}
            </p>

            {/* Status Selector */}
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              className="p-2 bg-gray-800 text-white rounded-lg font-semibold"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

            {/* Progress Bar */}
            <div className="col-span-full mt-4">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`bg-indigo-400 h-2 rounded-full ${getProgress(order.status)}`}
                ></div>
              </div>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <p className="text-center text-gray-400">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default TrackingPage;
