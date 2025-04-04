import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} TheGioiManhDong. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="/about" className="hover:text-gray-300 transition">About Us</a>
          <a href="/contact" className="hover:text-gray-300 transition">Contact</a>
          <a href="/privacy" className="hover:text-gray-300 transition">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
