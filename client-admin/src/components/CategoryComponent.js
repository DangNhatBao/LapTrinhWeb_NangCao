import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';

class Category extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null
    };
  }

  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <tr
          key={item._id}
          className="cursor-pointer hover:bg-gray-100 transition duration-200"
          onClick={() => this.trItemClick(item)}
        >
          <td className="border px-4 py-2">{item._id}</td>
          <td className="border px-4 py-2">{item.name}</td>
        </tr>
      );
    });

    return (
      <div className="flex flex-col lg:flex-row gap-8 p-4">
        <div className="w-full lg:w-2/3">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">DANH SÁCH DANH MỤC</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-900 text-white text-left">
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Tên loại</th>
                </tr>
              </thead>
              <tbody>{cates}</tbody>
            </table>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <CategoryDetail
            item={this.state.itemSelected}
            updateCategories={this.updateCategories}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  trItemClick(item) {
    this.setState({ itemSelected: item });
  }

  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  updateCategories = (categories) => {
    this.setState({ categories });
  };
}

export default Category;
