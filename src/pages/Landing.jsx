import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthProvider';


const Landing = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-orange-50 text-gray-800">
      {/* Hero Banner */}
      <section className="relative text-center py-12 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-blue-800 mb-4"
        >
          True Healthcare For Your Family
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-600 mb-6"
        >
          Consult doctors, order medicines & track your health easily online.
        </motion.p>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link
            to={user ? "/products" : "/login"}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition"
          >
            Consult Now
          </Link>
        </motion.div>
      </section>

      {/* Promo Banner */}
      <div className="flex flex-wrap justify-around items-center bg-blue-100 py-4 text-sm md:text-base font-medium text-blue-900">
        <div className="flex items-center gap-2">🚚 Free Delivery on Orders over ₹500</div>
        <div className="flex items-center gap-2">💬 Free Doctor Consultation</div>
        <div className="flex items-center gap-2">🎁 Extra 10% Off on First Order</div>
      </div>

      {/* Featured Categories */}
      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">Featured Categories</h2>
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {[
            { name: 'Consult', icon: 'https://cdn-icons-png.flaticon.com/512/3179/3179068.png' },
            { name: 'Ayurveda', icon: 'https://cdn-icons-png.flaticon.com/512/3410/3410154.png' },
            { name: 'Allopathy', icon: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png' },
            { name: 'Homeopathy', icon: 'https://cdn-icons-png.flaticon.com/512/7641/7641727.png' },
            { name: 'Nutrition', icon: 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png' },
            { name: 'Personal Care', icon: 'https://cdn-icons-png.flaticon.com/512/3771/3771465.png' },
            { name: 'Baby Care', icon: 'https://cdn-icons-png.flaticon.com/512/2545/2545703.png' },
          ].map((category, index) => (
            <motion.div 
              key={category.name}
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.1 }} 
              className="w-28 h-28 bg-white rounded-xl flex flex-col justify-center items-center shadow-md hover:shadow-xl transition transform hover:scale-105"
            >
              <img
                src={category.icon}
                alt={category.name}
                className="w-10 h-10 mb-2"
              />
              <span className="text-sm font-medium">{category.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-12 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">Popular Products</h2>
        <div className="flex flex-wrap justify-center gap-8 px-4">
          {[
            {
              name: 'Crocin Advance',
              img: 'https://cdn-icons-png.flaticon.com/512/2965/2965567.png',
            },
            {
              name: 'Dolo 650',
              img: 'https://cdn-icons-png.flaticon.com/512/4272/4272805.png',
            },
            {
              name: 'Dettol Liquid',
              img: 'https://cdn-icons-png.flaticon.com/512/1047/1047411.png',
            },
          ].map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className="w-44 bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <img src={product.img} alt={product.name} className="w-full h-32 object-contain mb-2" />
              <p className="text-sm font-medium text-gray-700">{product.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Promo */}
      <div className="p-6 bg-orange-200 text-center text-lg font-semibold text-orange-900">
        🎉 Get up to <span className="text-orange-700 font-bold">40% OFF</span> on your first order!
      </div>
    </div>
  );
};

export default Landing;