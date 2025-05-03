import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {sampleProducts} from '../data/sampleProducts';
import { useAuth } from '../context/AuthProvider';
import { pushData } from '../firebase/firebaseFunctions';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const product = sampleProducts.find((p) => p.id === parseInt(id));
  const [tab, setTab] = useState('description');
  const dispatch = useDispatch();

  const handlePriceAlert = async () => {
    if (!user) {
      toast.error('Please login to subscribe to price alerts.');
      return;
    }
    const alertData = {
      userId: user.uid,
      productId: product.id,
      productName: product.name,
      subscribedAt: new Date().toISOString(),
    };
    await pushData('/alerts', alertData);
    toast.success('You will be notified when the price drops!');
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  if (!product) return <div className="pt-24 text-center">Product not found.</div>;

  return (
    <div className="container mx-auto px-4 pt-24 pb-10">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/3 object-contain rounded-lg shadow"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">{product.name}</h1>
          <p className="text-xl text-green-600 font-semibold mb-4">₹{product.price.toFixed(2)}</p>

          <button
            onClick={handlePriceAlert}
            className="mb-4 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition text-sm"
          >
            🔔 Notify Me on Price Drop
          </button>
          <button
            onClick={handleAddToCart}
            className="mb-4 ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
          >
            🛒 Add to Cart
          </button>

          <div className="mb-6">
            <button
              className={`px-4 py-2 mr-2 rounded-md text-sm font-semibold ${
                tab === 'description' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setTab('description')}
            >
              Description
            </button>
            <button
              className={`px-4 py-2 mr-2 rounded-md text-sm font-semibold ${
                tab === 'ingredients' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setTab('ingredients')}
            >
              Ingredients
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-semibold ${
                tab === 'reviews' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setTab('reviews')}
            >
              Reviews
            </button>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            {tab === 'description' && (
              <p>This is a detailed description of {product.name}. Helps with pain relief and fever reduction.</p>
            )}
            {tab === 'ingredients' && (
              <ul className="list-disc pl-6">
                <li>Paracetamol 650mg</li>
                <li>Magnesium stearate</li>
                <li>Starch</li>
              </ul>
            )}
            {tab === 'reviews' && (
              <p>No reviews yet. Be the first to leave feedback!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
