import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from '../context/AuthProvider';
import { readData, updateData } from '../firebase/firebaseFunctions';

const WishlistButton = ({ product }) => {
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const checkWishlist = async () => {
      if (!user || !product?.id) return;
      const data = await readData(`/wishlists/${user.uid}`);
      if (data && data[product.id]) {
        setIsWishlisted(true);
      }
    };
    checkWishlist();
  }, [user, product]);

  const toggleWishlist = async () => {
    if (!user || !product?.id) return;
    const path = `/wishlists/${user.uid}/${product.id}`;
    const value = isWishlisted ? null : product;
    await updateData(path, value);
    setIsWishlisted(!isWishlisted);
    console.log(`${isWishlisted ? 'Removed' : 'Added'}: ${product.name}`);
  };

  return (
    <button
      onClick={toggleWishlist}
      className="text-red-500 hover:text-red-600 transition text-xl"
      title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {isWishlisted ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};

export default WishlistButton;
