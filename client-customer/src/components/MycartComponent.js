import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import axios from 'axios';
import withRouter from '../utils/withRouter';

class Mycart extends Component {
  static contextType = MyContext; // using this.context to access global state

  render() {
    const mycart = this.context.mycart.map((item, index) => {
      return (
        <tr key={item.product._id} className="hover:bg-gray-100">
          <td className="px-4 py-2 border">{index + 1}</td>
          <td className="px-4 py-2 border">{item.product._id}</td>
          <td className="px-4 py-2 border">{item.product.name}</td>
          <td className="px-4 py-2 border">{item.product.category.name}</td>
          <td className="px-4 py-2 border">
            <img src={"data:image/jpg;base64," + item.product.image} width="70" height="70" alt={item.product.name} />
          </td>
          <td className="px-4 py-2 border">{item.product.price}</td>
          <td className="px-4 py-2 border">{item.quantity}</td>
          <td className="px-4 py-2 border">{item.product.price * item.quantity}</td>
          <td className="px-4 py-2 border">
            <span className="text-red-500 cursor-pointer hover:underline" onClick={() => this.lnkRemoveClick(item.product._id)}>Remove</span>
          </td>
        </tr>
      );
    });

    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-black">ITEM LIST</h2>
        </div>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-4 py-2">No.</th>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {mycart}
              <tr className="bg-gray-50">
                <td colSpan="6" className="text-right px-4 py-2">Total</td>
                <td className="px-4 py-2">{CartUtil.getTotal(this.context.mycart)}</td>
                <td className="px-4 py-2">
                  <span className="bg-gray-900 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-900" onClick={() => this.lnkCheckoutClick()}>CHECKOUT</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // event-handlers
  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex(x => x.product._id === id);
    if (index !== -1) { // found, remove item
      mycart.splice(index, 1);
      this.context.setMycart(mycart);
    }
  }

  lnkCheckoutClick() {
    if (window.confirm('ARE YOU SURE?')) {
      if (this.context.mycart.length > 0) {
        const total = CartUtil.getTotal(this.context.mycart);
        const items = this.context.mycart;
        const customer = this.context.customer;
        if (customer) {
          this.apiCheckout(total, items, customer);
        } else {
          this.props.navigate('/login');
        }
      } else {
        alert('Your cart is empty');
      }
    }
  }

  // apis
  apiCheckout(total, items, customer) {
    const body = { total: total, items: items, customer: customer };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/customer/checkout', body, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.context.setMycart([]);
        this.props.navigate('/home');
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}

export default withRouter(Mycart);
