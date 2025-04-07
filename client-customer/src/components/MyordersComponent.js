import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Myorders extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }

  render() {
    if (this.context.token === '') return (<Navigate replace to='/login' />);

    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} className="cursor-pointer hover:bg-gray-100 text-left" onClick={() => this.trItemClick(item)}>
          <td className="px-4 py-2 border">{item._id}</td>
          <td className="px-4 py-2 border">{new Date(item.cdate).toLocaleString()}</td>
          <td className="px-4 py-2 border">{item.customer.name}</td>
          <td className="px-4 py-2 border">{item.customer.phone}</td>
          <td className="px-4 py-2 border">{item.total}đ</td>
          <td className="px-4 py-2 border">{item.status}</td>
        </tr>
      );
    });

    let items = [];
    if (this.state.order) {
      items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id} className="hover:bg-gray-50">
            <td className="px-4 py-2 border">{index + 1}</td>
            <td className="px-4 py-2 border">{item.product._id}</td>
            <td className="px-4 py-2 border">{item.product.name}</td>
            <td className="px-4 py-2 border">
              <img src={"data:image/jpg;base64," + item.product.image} width="70" height="70" alt={item.product.name} />
            </td>
            <td className="px-4 py-2 border">{item.product.price}đ</td>
            <td className="px-4 py-2 border">{item.quantity}</td>
            <td className="px-4 py-2 border">{item.product.price * item.quantity}đ</td>
          </tr>
        );
      });
    }

    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">ĐƠN HÀNG CỦA TÔI</h2>
        </div>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-900 text-white text-left">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Ngày tạo</th>
                <th className="px-4 py-2">Tên khách hàng</th>
                <th className="px-4 py-2">Số điện thoại khách hàng</th>
                <th className="px-4 py-2">Tổng tiền</th>
                <th className="px-4 py-2">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {orders}
            </tbody>
          </table>
        </div>

        {this.state.order && (
          <div className="mt-10">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">CHI TIẾT ĐƠN HÀNG</h2>
            </div>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg ">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-900 text-white text-left">
                  <tr>
                    <th className="px-4 py-2">STT</th>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Tên sản phẩm</th>
                    <th className="px-4 py-2">Hình ảnh</th>
                    <th className="px-4 py-2">Giá</th>
                    <th className="px-4 py-2">Số lượng</th>
                    <th className="px-4 py-2">Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {items}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    if (this.context.customer) {
      const cid = this.context.customer._id;
      this.apiGetOrdersByCustID(cid);
    }
  }

  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }

  // apis
  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/customer/orders/customer/' + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
}

export default Myorders;
