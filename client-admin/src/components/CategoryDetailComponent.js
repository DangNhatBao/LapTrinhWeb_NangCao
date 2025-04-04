import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class CategoryDetail extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: ''
    };
  }

  render() {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 w-full">
        <h2 className="text-xl font-bold text-center text-gray-700 mb-4">CATEGORY DETAIL</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">ID</label>
            <input
              disabled
              type="text"
              value={this.state.txtID}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              onChange={(e) => this.setState({ txtID: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
            <input
              type="text"
              value={this.state.txtName}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              onChange={(e) => this.setState({ txtName: e.target.value })}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-md"
              onClick={(e) => this.btnAddClick(e)}
            >
              ADD NEW
            </button>
            <button
              className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-md"
              onClick={(e) => this.btnUpdateClick(e)}
            >
              UPDATE
            </button>
            <button
              className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-md"
              onClick={(e) => this.btnDeleteClick(e)}
            >
              DELETE
            </button>
          </div>
        </form>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item && this.props.item) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }

  // ADD
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    if (name) {
      const cate = { name: name };
      this.apiPostCategory(cate);
    } else {
      alert('Please input name');
    }
  }
  apiPostCategory(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Category added successfully!');
        this.apiGetCategories();
      } else {
        alert('Failed to add category');
      }
    });
  }

  // UPDATE
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if (id && name) {
      const cate = { name: name };
      this.apiPutCategory(id, cate);
    } else {
      alert('Please input ID and name');
    }
  }
  apiPutCategory(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Category updated successfully!');
        this.apiGetCategories();
      } else {
        alert('Failed to update category');
      }
    });
  }

  // DELETE
  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this category?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteCategory(id);
      } else {
        alert('Please input ID');
      }
    }
  }
  apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/categories/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Category deleted successfully!');
        this.apiGetCategories();
      } else {
        alert('Failed to delete category');
      }
    });
  }

  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.props.updateCategories(result);
    });
  }
}

export default CategoryDetail;
