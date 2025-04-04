import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Inform extends Component {
  static contextType = MyContext;

  render() {
    const isLoggedIn = this.context.token !== '';
    const customer = this.context.customer;
    const cartLength = this.context.mycart.length;

    return (
      <div className="bg-gray-900 border-b border-gray-200 py-3 px-6 shadow flex flex-col md:flex-row justify-between items-center text-sm font-medium text-gray-700">
        {/* User Info */}
        <div className="mb-2 md:mb-0 flex flex-wrap gap-2 items-center">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-white hover:text-white transition">Login</Link>
              <span className="text-gray-400">|</span>
              <Link to="/signup" className="text-white hover:text-white transition">Sign-up</Link>
              <span className="text-gray-400">|</span>
              <Link to="/active" className="text-white hover:text-white transition">Active</Link>
            </>
          ) : (
            <>
              <span>
               <span className="text-white">Hello, </span><span className="font-semibold text-white">{customer.name}</span>
              </span>
              <span className="text-white">|</span>
              <Link to="/home" onClick={() => this.lnkLogoutClick()} className="text-red-600 hover:text-red-800 transition">Logout</Link>
              <span className="text-white">|</span>
              <Link to="/myprofile" className="text-white hover:text-white transition">My Profile</Link>
              <span className="text-white">|</span>
              <Link to="/myorders" className="text-white hover:text-white transition">My Orders</Link>
            </>
          )}
        </div>

        {/* Cart Info */}
        <div>
          <Link to="/mycart" className="text-white hover:text-white transition">
            My Cart
          </Link>
          <span className="ml-1 text-white hover:text-white">
            : <span className="font-bold text-white">{cartLength}</span> {cartLength === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>
    );
  }

  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}

export default Inform;
