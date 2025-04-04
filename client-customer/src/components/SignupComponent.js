import axios from 'axios';
import React, { Component } from 'react';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }

  render() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-black mb-6">Sign Up</h2>
          <form onSubmit={(e) => this.btnSignupClick(e)}>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">Username</label>
              <input
                type="text"
                value={this.state.txtUsername}
                onChange={(e) => this.setState({ txtUsername: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="Enter username"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={this.state.txtPassword}
                onChange={(e) => this.setState({ txtPassword: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="Enter password"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={this.state.txtName}
                onChange={(e) => this.setState({ txtName: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="Enter full name"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={this.state.txtPhone}
                onChange={(e) => this.setState({ txtPhone: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="Enter phone number"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={this.state.txtEmail}
                onChange={(e) => this.setState({ txtEmail: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="Enter email address"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-900 transition duration-300"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    );
  }

  // event-handlers
  btnSignupClick(e) {
    e.preventDefault();
    const { txtUsername, txtPassword, txtName, txtPhone, txtEmail } = this.state;
    if (txtUsername && txtPassword && txtName && txtPhone && txtEmail) {
      const account = {
        username: txtUsername,
        password: txtPassword,
        name: txtName,
        phone: txtPhone,
        email: txtEmail
      };
      this.apiSignup(account);
    } else {
      alert('Please fill in all fields');
    }
  }

  // apis
  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}

export default Signup;
