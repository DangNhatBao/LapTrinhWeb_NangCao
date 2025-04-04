import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Order extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }

  render() {
    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} className="hover:bg-gray-100 cursor-pointer" onClick={() => this.trItemClick(item)}>
          <td className="border px-4 py-2">{item._id}</td>
          <td className="border px-4 py-2">{new Date(item.cdate).toLocaleString()}</td>
          <td className="border px-4 py-2">{item.customer.name}</td>
          <td className="border px-4 py-2">{item.customer.phone}</td>
          <td className="border px-4 py-2">{item.total}</td>
          <td className="border px-4 py-2">{item.status}</td>
          <td className="border px-4 py-2 text-center">
            {item.status === 'PENDING' ? (
              <div className="space-x-2">
                <button onClick={() => this.lnkApproveClick(item._id)} className="text-green-600 ">APPROVE</button>
                <span className="text-gray-400">|</span>
                <button onClick={() => this.lnkCancelClick(item._id)} className="text-red-600 ">CANCEL</button>
              </div>
            ) : null}
          </td>
        </tr>
      );
    });

    let items = null;
    if (this.state.order) {
      items = this.state.order.items.map((item, index) => (
        <tr key={item.product._id} className="hover:bg-gray-50">
          <td className="border px-4 py-2">{index + 1}</td>
          <td className="border px-4 py-2">{item.product._id}</td>
          <td className="border px-4 py-2">{item.product.name}</td>
          <td className="border px-4 py-2">
            <img src={"data:image/jpg;base64," + item.product.image} alt="" className="w-16 h-16 object-cover rounded" />
          </td>
          <td className="border px-4 py-2">{item.product.price}</td>
          <td className="border px-4 py-2">{item.quantity}</td>
          <td className="border px-4 py-2">{item.product.price * item.quantity}</td>
        </tr>
      ));
    }

    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold text-center mb-4">ORDER LIST</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm text-left">
            <thead className="bg-gray-200 text-gray-700 uppercase">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Creation date</th>
                <th className="border px-4 py-2">Cust. name</th>
                <th className="border px-4 py-2">Cust. phone</th>
                <th className="border px-4 py-2">Total</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>{orders}</tbody>
          </table>
        </div>

        {this.state.order && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-center mb-4">ORDER DETAIL</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 text-sm text-left">
                <thead className="bg-gray-100 text-gray-700 uppercase">
                  <tr>
                    <th className="border px-4 py-2">No.</th>
                    <th className="border px-4 py-2">Prod. ID</th>
                    <th className="border px-4 py-2">Prod. name</th>
                    <th className="border px-4 py-2">Image</th>
                    <th className="border px-4 py-2">Price</th>
                    <th className="border px-4 py-2">Quantity</th>
                    <th className="border px-4 py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>{items}</tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetOrders();
  }

  trItemClick(item) {
    this.setState({ order: item });
  }

  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, 'APPROVED');
  }

  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, 'CANCELED');
  }

  apiGetOrders() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders', config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }

  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/orders/status/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetOrders();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}

export default Order;
