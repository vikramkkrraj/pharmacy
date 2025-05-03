import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { pushData } from '../firebase/firebaseFunctions';
import { toast } from 'react-toastify';

const ProductCard = ({ product, onAddToCart }) => {
  const { user } = useAuth();
  const isDiscounted = product.originalPrice && product.price < product.originalPrice;
  const discountPercent = isDiscounted
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleRestockAlert = async () => {
    if (!user) {
      toast.error('Please login to subscribe for stock updates.');
      return;
    }
    const alertData = {
      userId: user.uid,
      productId: product.id,
      productName: product.name,
      subscribedAt: new Date().toISOString(),
    };
    await pushData('/restockAlerts', alertData);
    toast.success('You will be notified when the product is back in stock.');
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer relative">
      {isDiscounted && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded animate-pulse">
          {discountPercent}% OFF
        </span>
      )}
      {product.availability === 'out' && (
        <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
          Out of Stock
        </span>
      )}

      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain p-4"
          loading="lazy"
        />
      </Link>

      <div className="px-4 pb-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
        <div className="flex items-center gap-2">
          <p className="text-green-600 font-bold">₹{product.price.toFixed(2)}</p>
          {isDiscounted && (
            <p className="text-gray-400 line-through text-sm">₹{product.originalPrice.toFixed(2)}</p>
          )}
        </div>

        {product.availability === 'in' ? (
          <button
            className="mt-2 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 text-sm"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        ) : (
          <button
            className="mt-2 w-full bg-gray-300 text-gray-700 py-1 rounded hover:bg-gray-400 text-sm"
            onClick={handleRestockAlert}
          >
            Notify Me When Available
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
