import React, { useEffect, useState, useRef } from "react";
import ProductCard from "../pages/ProductCard";
import { sampleProducts } from "../data/sampleProducts";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";

const RecommendedProducts = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [recommended, setRecommended] = useState([]);
  const scrollRef = useRef(null);
  const dispatch = useDispatch()

  useEffect(() => {
    const recommendedSet = new Set();

    if (cartItems.length > 0) {
      cartItems.forEach((item) => {
        const matches = sampleProducts.filter(
          (p) =>
            p.id !== item.id &&
            (p.category === item.category ||
              Math.abs(p.price - item.price) <= 20)
        );
        matches.forEach((p) => recommendedSet.add(p));
      });
    } else {
      sampleProducts.slice(0, 8).forEach((p) => recommendedSet.add(p));
    }

    const recArray = Array.from(recommendedSet).slice(0, 8);
    setRecommended(recArray);
  }, [cartItems]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (recommended.length === 0) return null;

  return (
    <div className="mt-12 relative bg-white shadow rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-blue-800">
          Recommended for You
        </h3>
        <div className="hidden md:flex gap-2">
          <button
            onClick={scrollLeft}
            className="bg-blue-100 text-blue-700 hover:bg-blue-200 p-2 rounded-full shadow-md transition"
            title="Scroll Left"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={scrollRight}
            className="bg-blue-100 text-blue-700 hover:bg-blue-200 p-2 rounded-full shadow-md transition"
            title="Scroll Right"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="overflow-x-auto whitespace-nowrap space-x-4 pb-2 flex scrollbar-hide scroll-smooth"
      >
        {recommended.map((product) => (
          <div key={product.id} className="inline-block w-64 flex-shrink-0">
            <ProductCard
              product={product}
              onAddToCart={() => {
                dispatch({ type: "cart/addToCart", payload: product });
                toast.success(`${product.name} added to cart!`);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
