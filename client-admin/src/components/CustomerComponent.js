import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Customer extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      orders: [],
      order: null
    };
  }

  render() {
    const customers = this.state.customers.map((item) => (
      <tr
        key={item._id}
        className="hover:bg-gray-100 cursor-pointer border-b"
        onClick={() => this.trCustomerClick(item)}
      >
        <td className="px-4 py-2">{item._id}</td>
        <td className="px-4 py-2">{item.username}</td>
        <td className="px-4 py-2">{item.password}</td>
        <td className="px-4 py-2">{item.name}</td>
        <td className="px-4 py-2">{item.phone}</td>
        <td className="px-4 py-2">{item.email}</td>
        <td className="px-4 py-2">{item.active}</td>
        <td className="px-4 py-2">
          {item.active === 0 ? (
            <span
              className="text-blue-600 hover:underline cursor-pointer font-bold"
              onClick={() => this.lnkEmailClick(item)}
            >
              EMAIL
            </span>
          ) : (
            <span
              className="text-red-600 cursor-pointer font-bold"
              onClick={() => this.lnkDeactiveClick(item)}
            >
              DEACTIVE
            </span>
          )}
        </td>
      </tr>
    ));

    const orders = this.state.orders.map((item) => (
      <tr
        key={item._id}
        className="hover:bg-gray-100 cursor-pointer border-b"
        onClick={() => this.trOrderClick(item)}
      >
        <td className="px-4 py-2">{item._id}</td>
        <td className="px-4 py-2">{new Date(item.cdate).toLocaleString()}</td>
        <td className="px-4 py-2">{item.customer.name}</td>
        <td className="px-4 py-2">{item.customer.phone}</td>
        <td className="px-4 py-2">{item.total}đ</td>
        <td className="px-4 py-2">{item.status}</td>
      </tr>
    ));

    const items = this.state.order
      ? this.state.order.items.map((item, index) => (
          <tr key={item.product._id} className="border-b">
            <td className="px-4 py-2">{index + 1}</td>
            <td className="px-4 py-2">{item.product._id}</td>
            <td className="px-4 py-2">{item.product.name}</td>
            <td className="px-4 py-2">
              <img
                src={"data:image/jpg;base64," + item.product.image}
                className="w-[70px] h-[70px] object-cover"
                alt=""
              />
            </td>
            <td className="px-4 py-2">{item.product.price}đ</td>
            <td className="px-4 py-2">{item.quantity}</td>
            <td className="px-4 py-2">
              {item.product.price * item.quantity}đ
            </td>
          </tr>
        ))
      : null;

    return (
      <div className="p-4 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">DANH SÁCH KHÁCH HÀNG</h2>
          <table className="table-auto w-full border border-gray-300 text-left shadow-md">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Tài khoản</th>
                <th className="px-4 py-2">Mật khẩu</th>
                <th className="px-4 py-2">Tên khách hàng</th>
                <th className="px-4 py-2">Số điện thoại</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Kích hoạt</th>
                <th className="px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>{customers}</tbody>
          </table>
        </div>

        {this.state.orders.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">DANH SÁCH ĐƠN HÀNG</h2>
            <table className="table-auto w-full border border-gray-300 text-left shadow-md">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Ngày tạo</th>
                  <th className="px-4 py-2">Tên khách hàng</th>
                  <th className="px-4 py-2">Số điện thoại</th>
                  <th className="px-4 py-2">Tổng</th>
                  <th className="px-4 py-2">Trạng thái</th>
                </tr>
              </thead>
              <tbody>{orders}</tbody>
            </table>
          </div>
        )}

        {this.state.order && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">CHI TIẾT ĐƠN HÀNG</h2>
            <table className="table-auto w-full border border-gray-300 text-left shadow-md">
              <thead className="bg-gray-900 text-white">
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
              <tbody>{items}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCustomers();
  }

  // event-handlers
  trCustomerClick(item) {
    this.setState({ orders: [], order: null });
    this.apiGetOrdersByCustID(item._id);
  }

  trOrderClick(item) {
    this.setState({ order: item });
  }

  lnkDeactiveClick(item) {
    this.apiPutCustomerDeactive(item._id, item.token);
  }

  lnkEmailClick(item) {
    this.apiGetCustomerSendmail(item._id);
  }

  // apis
  apiGetCustomers() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/customers', config).then((res) => {
      const result = res.data;
      this.setState({ customers: result });
    });
  }

  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders/customer/' + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }

  apiPutCustomerDeactive(id, token) {
    const body = { token: token };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/customers/deactive/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetCustomers();
      } else {
        alert('SORRY BABY!');
      }
    });
  }

  apiGetCustomerSendmail(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/customers/sendmail/' + id, config).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}

export default Customer;
