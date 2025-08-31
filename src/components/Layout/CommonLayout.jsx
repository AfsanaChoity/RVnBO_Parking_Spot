import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router';
import Footer from './Footer';

export default function CommonLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <Navbar />
      
      {/* Main content */}
      <div className="flex-grow">
        <Outlet />
      </div>
      
      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}
