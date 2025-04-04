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
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => this.lnkEmailClick(item)}
            >
              EMAIL
            </span>
          ) : (
            <span
              className="text-red-600 cursor-pointer"
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
        <td className="px-4 py-2">{item.total}</td>
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
            <td className="px-4 py-2">{item.product.price}</td>
            <td className="px-4 py-2">{item.quantity}</td>
            <td className="px-4 py-2">
              {item.product.price * item.quantity}
            </td>
          </tr>
        ))
      : null;

    return (
      <div className="p-4 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-center mb-4">CUSTOMER LIST</h2>
          <table className="table-auto w-full border border-gray-300 text-left shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Password</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Active</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>{customers}</tbody>
          </table>
        </div>

        {this.state.orders.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-4">ORDER LIST</h2>
            <table className="table-auto w-full border border-gray-300 text-left shadow-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Creation date</th>
                  <th className="px-4 py-2">Cust.name</th>
                  <th className="px-4 py-2">Cust.phone</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>{orders}</tbody>
            </table>
          </div>
        )}

        {this.state.order && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-4">ORDER DETAIL</h2>
            <table className="table-auto w-full border border-gray-300 text-left shadow-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">No.</th>
                  <th className="px-4 py-2">Prod.ID</th>
                  <th className="px-4 py-2">Prod.name</th>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Amount</th>
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
