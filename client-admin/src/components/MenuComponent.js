import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { Link } from "react-router-dom";

class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state

  render() {
    return (
      <div className="border-b border-gray-300 bg-gray-900 shadow-sm py-4 px-6 flex justify-between items-center">
        {/* Left Menu */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/admin/home" className="text-white font-medium">
              Trang chủ
            </Link>
          </li>
          <li>
            <Link to="/admin/category" className="text-white font-medium">
              Loại
            </Link>
          </li>
          <li>
            <Link to="/admin/product" className="text-white font-medium">
              Sản phẩm
            </Link>
          </li>
          <li>
            <Link to="/admin/order" className="text-white font-medium">
              Đơn hàng
            </Link>
          </li>
          <li>
            <Link to="/admin/customer" className="text-white font-medium">
              Khách hàng
            </Link>
          </li>
        </ul>

        {/* Right Section */}
        <div className="text-sm text-white">
          Xin chào <b className="text-white">{this.context.username}</b> |{" "}
          <Link
            to="/admin/home"
            onClick={() => this.lnkLogoutClick()}
            className="text-red-400 hover:text-red-500 ml-2 font-bold"
          >
            Đăng xuất
          </Link>
        </div>
      </div>
    );
  }

  // event-handlers
  lnkLogoutClick() {
    this.context.setToken("");
    this.context.setUsername("");
  }
}

export default Menu;
