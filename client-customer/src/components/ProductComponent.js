import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  render() {
    const prods = this.state.products.map((item) => {
      return (
        <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
          <figure className="p-4 flex flex-col items-center">
            <Link to={'/product/' + item._id}>
              <img
                src={"data:image/jpg;base64," + item.image}
                alt={item.name}
                className="w-64 h-64 object-cover rounded-lg"
              />
            </Link>
            <figcaption className="mt-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-black font-bold mt-1">Price: {item.price}</p>
            </figcaption>
          </figure>
        </div>
      );
    });

    return (
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <h2 className="text-3xl font-bold text-center text-black mb-10">LIST PRODUCTS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 lg:grid-cols-6 gap-6 justify-items-center">
          {prods}
        </div>
      </div>
    );
  }

  componentDidMount() {
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  componentDidUpdate(prevProps) {
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  // apis
  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }

  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
}

export default withRouter(Product);
