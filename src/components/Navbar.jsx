import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthProvider';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🩺 MedStore
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6 items-center text-gray-700 font-medium">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>

          {user ? (
            <>
              <Link to="/profile">Profile</Link>
              <Link to="/order-tracking">My Orders</Link>
              <Link to="/upload-prescription">Upload Prescription</Link>
              <button onClick={handleLogout} className="flex items-center gap-1 text-red-500 hover:text-red-600">
                <FiLogOut /> Logout
              </button>
              {/* <Link to="/wishlist" className="hover:text-blue-600">Wishlist</Link> */}
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}

          <Link to="/cart" className="flex items-center gap-1">
            <FiShoppingCart className="text-lg" />
            <span>Cart</span>
          </Link>
        </div>

        

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-2xl text-blue-600">
          <FiMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
