import axios from "axios";
import React, { Component } from "react";
import withRouter from "../utils/withRouter";
import MyContext from "../contexts/MyContext";

class ProductDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1,
    };
  }

  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }

  // API
  apiGetProduct(id) {
    axios.get("/api/customer/products/" + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }

  // Event handler
  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id);
      if (index === -1) {
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else {
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      alert('Thêm sản phẩm vào giỏ hàng thành công');
    } else {
      alert('Hãy điền số lượng');
    }
  }

  render() {
    const prod = this.state.product;

    if (!prod) return <div />;

    return (
      <div className="h-[calc(100vh-67px-45px-100px)] px-4">

      <div className="flex justify-center py-10 px-4">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row">
          <div className="flex-shrink-0 md:mr-8 mb-6 md:mb-0">
            <img
              src={`data:image/jpg;base64,${prod.image}`}
              alt={prod.name}
              className="w-full md:w-[400px] h-[400px] object-cover rounded-md"
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold mb-4 text-center md:text-left text-gray-800">
              CHI TIẾT SẢN PHẨM
            </h2>
            <form onSubmit={(e) => this.btnAdd2CartClick(e)}>
              <div className="space-y-4 text-gray-700">
                <div className="flex">
                  <div className="w-32 font-bold">ID:</div>
                  <div className="text-gray-700 font-semibold">{prod._id}</div>
                </div>
                <div className="flex">
                  <div className="w-32 font-bold">Tên:</div>
                  <div className="text-gray-700 font-semibold">{prod.name}</div>
                </div>
                <div className="flex">
                  <div className="w-32 font-bold">Giá:</div>
                  <div className="text-red-500 font-semibold">{prod.price}đ</div>
                </div>
                <div className="flex">
                  <div className="w-32 font-bold">Loại:</div>
                  <div className="text-gray-700 font-semibold">{prod.category.name}</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 font-bold">Số lượng:</div>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={this.state.txtQuantity}
                    onChange={(e) =>
                      this.setState({ txtQuantity: e.target.value })
                    }
                    className="border border-gray-300 rounded px-3 py-1 w-20"
                  />
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-gray-900 hover:bg-gray-900 text-white px-6 py-2 rounded shadow-md transition font-bold"
                  >
                    THÊM VÀO GIỎ HÀNG
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default withRouter(ProductDetail);
