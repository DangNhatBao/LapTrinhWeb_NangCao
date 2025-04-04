import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Myprofile extends Component {
  static contextType = MyContext; // using this.context to access global state
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
    if (this.context.token === '') return (<Navigate replace to='/login' />);
    return (
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <h2 className="text-3xl font-bold text-center text-black mb-6">MY PROFILE</h2>
        <form className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="text-gray-700 font-medium">Username</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtUsername}
                    onChange={(e) => { this.setState({ txtUsername: e.target.value }) }}
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  />
                </td>
              </tr>
              <tr>
                <td className="text-gray-700 font-medium">Password</td>
                <td>
                  <input
                    type="password"
                    value={this.state.txtPassword}
                    onChange={(e) => { this.setState({ txtPassword: e.target.value }) }}
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  />
                </td>
              </tr>
              <tr>
                <td className="text-gray-700 font-medium">Name</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtName}
                    onChange={(e) => { this.setState({ txtName: e.target.value }) }}
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  />
                </td>
              </tr>
              <tr>
                <td className="text-gray-700 font-medium">Phone</td>
                <td>
                  <input
                    type="tel"
                    value={this.state.txtPhone}
                    onChange={(e) => { this.setState({ txtPhone: e.target.value }) }}
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  />
                </td>
              </tr>
              <tr>
                <td className="text-gray-700 font-medium">Email</td>
                <td>
                  <input
                    type="email"
                    value={this.state.txtEmail}
                    onChange={(e) => { this.setState({ txtEmail: e.target.value }) }}
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button
                    type="submit"
                    onClick={(e) => this.btnUpdateClick(e)}
                    className="mt-4 w-full py-2 px-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-900 transition"
                  >
                    UPDATE
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email
      });
    }
  }

  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const customer = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert('Please input username and password and name and phone and email');
    }
  }

  // apis
  apiPutCustomer(id, customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/customer/customers/' + id, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.context.setCustomer(result);
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}

export default Myprofile;
