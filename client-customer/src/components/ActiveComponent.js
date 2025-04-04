import axios from 'axios';
import React, { Component } from 'react';

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: ''
    };
  }

  render() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-black mb-6">Activate Account</h2>
          <form onSubmit={(e) => this.btnActiveClick(e)}>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">User ID</label>
              <input
                type="text"
                value={this.state.txtID}
                onChange={(e) => this.setState({ txtID: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="Enter your ID"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-1 font-medium text-gray-700">Activation Token</label>
              <input
                type="text"
                value={this.state.txtToken}
                onChange={(e) => this.setState({ txtToken: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="Enter your token"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-900 transition duration-300"
            >
              ACTIVATE
            </button>
          </form>
        </div>
      </div>
    );
  }

  // event-handlers
  btnActiveClick(e) {
    e.preventDefault();
    const { txtID, txtToken } = this.state;
    if (txtID && txtToken) {
      this.apiActive(txtID, txtToken);
    } else {
      alert('Please input ID and Token');
    }
  }

  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        alert('Account activated successfully!');
      } else {
        alert('Activation failed. Please check your ID and token.');
      }
    });
  }
}

export default Active;
