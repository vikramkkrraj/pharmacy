import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { readData } from '../firebase/firebaseFunctions';

const OrderTracking = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await readData('/orders');
      if (data && user) {
        const userOrders = Object.entries(data)
          .map(([id, values]) => ({ id, ...values }))
          .filter((order) => order.userId === user.uid);
        setOrders(userOrders);
      }
    };
    fetchOrders();
  }, [user]);

  return (
    <div className="container mx-auto px-4 pt-24 pb-10">
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">My Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-600">You haven't placed any orders yet.</div>
      ) : (
        <div className="space-y-10">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID: <span className="font-medium">{order.id}</span></p>
                  <p className="text-sm text-gray-500">Ordered At: <span className="font-medium">{new Date(order.orderedAt).toLocaleString()}</span></p>
                </div>
                <div className="text-right text-sm text-gray-600 mt-2 md:mt-0">
                  <p><strong>Name:</strong> {order.name}</p>
                  <p><strong>Phone:</strong> {order.phone}</p>
                  <p><strong>Payment:</strong> {order.paymentMethod}</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3"><strong>Delivery Address:</strong> {order.address}</p>

              {order.items?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="border p-4 rounded-lg flex flex-col items-center bg-gray-50">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-contain mb-2" />
                      <h4 className="font-semibold text-sm text-center">{item.name}</h4>
                      <p className="text-xs text-gray-500">₹{item.price} × {item.quantity}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-right mt-4">
                <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-1 rounded-full">
                  Total: ₹{order.total ? order.total.toFixed(2) : '0.00'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderTracking;