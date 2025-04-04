import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';

class Product extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null
    };
  }

  render() {
    const prods = this.state.products.map((item) => {
      return (
        <tr
          key={item._id}
          className="hover:bg-gray-100 cursor-pointer border-b"
          onClick={() => this.trItemClick(item)}
        >
          <td className="px-4 py-2">{item._id}</td>
          <td className="px-4 py-2">{item.name}</td>
          <td className="px-4 py-2">${item.price}</td>
          <td className="px-4 py-2">{new Date(item.cdate).toLocaleString()}</td>
          <td className="px-4 py-2">{item.category.name}</td>
          <td className="px-4 py-2">
            <img
              src={"data:image/jpg;base64," + item.image}
              className="w-24 h-24 object-cover rounded"
              alt=""
            />
          </td>
        </tr>
      );
    });

    const pagination = Array.from({ length: this.state.noPages }, (_, index) => {
      if ((index + 1) === this.state.curPage) {
        return (
          <span key={index} className="mx-1 text-black font-bold">
            | {index + 1} |
          </span>
        );
      } else {
        return (
          <span
            key={index}
            className="mx-1 text-blue-500 hover:underline cursor-pointer"
            onClick={() => this.lnkPageClick(index + 1)}
          >
            | {index + 1} |
          </span>
        );
      }
    });

    return (
      <div className="p-4">
        <div className="w-full lg:w-2/3 float-left">
          <h2 className="text-center text-2xl font-semibold mb-4">PRODUCT LIST</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Creation date</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Image</th>
                </tr>
              </thead>
              <tbody>{prods}</tbody>
              <tfoot>
                <tr>
                  <td colSpan="6" className="px-4 py-2 text-center">{pagination}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="inline-block align-top lg:w-1/3">
          <ProductDetail
            item={this.state.itemSelected}
            curPage={this.state.curPage}
            updateProducts={this.updateProducts}
          />
        </div>
        <div className="clear-both" />
      </div>
    );
  }

  updateProducts = (products, noPages, curPage) => {
    this.setState({ products: products, noPages: noPages, curPage: curPage });
  }

  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }

  // event-handlers
  lnkPageClick(index) {
    this.apiGetProducts(index);
  }

  trItemClick(item) {
    this.setState({ itemSelected: item });
  }

  // apis
  apiGetProducts(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + page, config).then((res) => {
      const result = res.data;
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage });
    });
  }
}
export default Product;
