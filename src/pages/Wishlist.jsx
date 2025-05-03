import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { readData } from "../firebase/firebaseFunctions";
import ProductCard from "./ProductCard";

const Wishlist = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const data = await readData(`/wishlists/${user.uid}`);
      if (data) {
        setWishlist(Object.values(data));
      }
    };

    if (user) fetchWishlist();
  }, [user]);

  return (
    <div className="container mx-auto px-4 pt-24 pb-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
