import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: []
    };
  }

  render() {
    const newprods = this.state.newprods.map((item) => {
      return (
        <div key={item._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-[280px] p-2">
          <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
            <figure>
              <Link to={`/product/${item._id}`}>
                <img 
                  src={`data:image/jpg;base64,${item.image}`} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </Link>
              <figcaption className="text-center p-2">
                <p className="font-semibold text-black text-left">{item.name}</p>
                <p className="text-red-500 font-bold text-left">{item.price}đ</p>
              </figcaption>
            </figure>
          </div>
        </div>
      );
    });

    const hotprods = this.state.hotprods.map((item) => {
      return (
        <div key={item._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-[280px] p-2">
          <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"> 
            <figure>
              <Link to={`/product/${item._id}`} className='w-[]'>
                <img 
                  src={`data:image/jpg;base64,${item.image}`} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </Link>
              <figcaption className="text-center p-2">
                <p className="font-semibold text-black text-left">{item.name}</p>
                <p className="text-red-500 font-bold text-left">{item.price}đ</p>
              </figcaption>
            </figure>
          </div>
        </div>
      );
    });

    return (
      <div className="px-4 py-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900-600 mb-4">SẢN PHẨM MỚI</h2>
          <div className="flex flex-wrap -m-2 justify-center">
            {newprods}
          </div>
        </div>
        {this.state.hotprods.length > 0 && (
          <div className="text-center mt-10">
            <h2 className="text-2xl font-bold text-gray-900-500 mb-4">SẢN PHẨM BÁN CHẠY</h2>
            <div className="flex flex-wrap -m-2 justify-center">
              {hotprods}
            </div>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }

  // APIs
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
}

export default Home;
