import React from 'react';
// import { AuthProvider } from './context/AuthProvider';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    // <AuthProvider>
      <div className="pt-5 "> {/* Padding for fixed navbar */}
        <Navbar />
        <AppRoutes />
        <Footer />
      </div>
    // </AuthProvider>
  );
};

export default App;
