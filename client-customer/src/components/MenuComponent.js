import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: '',
    };
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  btnSearchClick(e) {
    e.preventDefault();
    if (this.state.txtKeyword.trim() !== '') {
      this.props.navigate('/product/search/' + this.state.txtKeyword);
    }
  }

  render() {
    const cates = this.state.categories.map((item) => (
      <li key={item._id}>
        <Link
          to={'/product/category/' + item._id}
          className="text-white hover:text-white transition"
        >
          {item.name}
        </Link>
      </li>
    ));

    return (
      <div className="border-b py-4 px-6 bg-gray-900 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Menu Items */}
          <ul className="flex flex-wrap gap-4 text-lg font-medium mb-4 md:mb-0">
            <li>
              <Link
                to="/"
                className="text-white hover:text-white transition"
              >
                TheGioiManhDong
              </Link>
            </li>
            {cates}
          </ul>

          {/* Search Box */}
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => this.btnSearchClick(e)}
          >
            <input
              type="search"
              placeholder="Enter keyword"
              className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-900"
              value={this.state.txtKeyword}
              onChange={(e) => this.setState({ txtKeyword: e.target.value })}
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-4 py-1 rounded hover:bg-gray-900 transition"
            >
              SEARCH
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Menu);
