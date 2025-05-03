import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthProvider';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { user, logout } = useAuth();
  const cartCount = useSelector((state) => state.cart?.items?.length || 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = async () => {
    try {
      await logout();
      setMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const linkClass = (path) =>
    `hover:text-blue-600 transition ${
      location.pathname === path ? 'text-blue-600 font-semibold' : 'text-gray-700'
    }`;

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🩺 MedStore
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className={linkClass('/')}>Home</Link>
          <Link to="/products" className={linkClass('/products')}>Products</Link>

          {user ? (
            <>
              <Link to="/profile" className={linkClass('/profile')}>Profile</Link>
              <Link to="/order-tracking" className={linkClass('/order-tracking')}>My Orders</Link>
              <Link to="/upload-prescription" className={linkClass('/upload-prescription')}>Upload Rx</Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-500 hover:text-red-600"
              >
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className={linkClass('/login')}>Login</Link>
          )}

          {/* Cart with Badge */}
          <Link to="/cart" className={`relative flex items-center gap-1 ${linkClass('/cart')}`}>
            <FiShoppingCart className="text-lg" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden text-2xl text-blue-600" onClick={toggleMenu}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>

      {/* Mobile Dropdown (row layout) */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out flex flex-wrap justify-center gap-4 px-4 py-3 font-medium ${
          menuOpen ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'
        }`}
      >
        <Link to="/" onClick={() => setMenuOpen(false)} className={linkClass('/')}>Home</Link>
        <Link to="/products" onClick={() => setMenuOpen(false)} className={linkClass('/products')}>Products</Link>

        {user ? (
          <>
            <Link to="/profile" onClick={() => setMenuOpen(false)} className={linkClass('/profile')}>Profile</Link>
            <Link to="/order-tracking" onClick={() => setMenuOpen(false)} className={linkClass('/order-tracking')}>Orders</Link>
            <Link to="/upload-prescription" onClick={() => setMenuOpen(false)} className={linkClass('/upload-prescription')}>Upload Rx</Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-red-500 hover:text-red-600"
            >
              <FiLogOut /> Logout
            </button>
          </>
        ) : (
          <Link to="/login" onClick={() => setMenuOpen(false)} className={linkClass('/login')}>Login</Link>
        )}

        <Link to="/cart" onClick={() => setMenuOpen(false)} className={`relative flex items-center gap-1 ${linkClass('/cart')}`}>
          <FiShoppingCart className="text-lg" />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
