import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import MyContext from '../contexts/MyContext';

const ProductDetail = (props) => {
  const context = useContext(MyContext);

  const [categories, setCategories] = useState([]);
  const [txtID, setTxtID] = useState('');
  const [txtName, setTxtName] = useState('');
  const [txtPrice, setTxtPrice] = useState(0);
  const [cmbCategory, setCmbCategory] = useState('');
  const [imgProduct, setImgProduct] = useState('');
  const [txtDescription, setTxtDescription] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    apiGetCategories();
    apiGetProducts();
  }, []);

  useEffect(() => {
    if (props.item) {
      setTxtID(props.item._id);
      setTxtName(props.item.name);
      setTxtPrice(props.item.price);
      setCmbCategory(props.item.category._id);
      setImgProduct('data:image/jpg;base64,' + props.item.image);
      setTxtDescription(props.item.description || '');
    }
  }, [props.item]);

  const clearAllInputs = () => {
    setTxtID('');
    setTxtName('');
    setTxtPrice(0);
    setImgProduct('');
    setTxtDescription('');
    apiGetCategories();
  };

  const previewImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setImgProduct(evt.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const checkDuplicateProduct = (name, id) => {
    const duplicate = products.find((product) => product.name === name && product._id !== id);
    return !!duplicate;
  };

  const btnAddClick = (e) => {
    e.preventDefault();
    const name = txtName;
    const price = parseInt(txtPrice);
    const category = cmbCategory;
    const image = imgProduct.replace(/^data:image\/[a-z]+;base64,/, '');
    const description = txtDescription;

    if (name && price && category && image && description) {
      if (checkDuplicateProduct(name, null)) {
        alert('Tên sản phẩm đã tồn tại. Vui lòng chọn tên khác.');
        return;
      }
      const prod = { name, price, category, image, description };
      apiPostProduct(prod);
    } else {
      alert('Vui lòng điền vào tất cả các ô trống');
    }
  };

  const btnUpdateClick = (e) => {
    e.preventDefault();
    const id = txtID;
    const name = txtName;
    const price = parseInt(txtPrice);
    const category = cmbCategory;
    const image = imgProduct.replace(/^data:image\/[a-z]+;base64,/, '');
    const description = txtDescription;

    if (id && name && price && category && image && description) {
      if (checkDuplicateProduct(name, id)) {
        alert('Tên sản phẩm đã tồn tại. Vui lòng chọn tên khác.');
        return;
      }
      const prod = { name, price, category, image, description };
      apiPutProduct(id, prod);
    } else {
      alert('Vui lòng điền vào tất cả các ô trống');
    }
  };

  const btnDeleteClick = (e) => {
    e.preventDefault();
    if (window.confirm('Bạn có chắc không?')) {
      const id = txtID;
      if (id) {
        apiDeleteProduct(id);
      } else {
        alert('Vui lòng nhập ID');
      }
    }
  };

  const apiGetCategories = () => {
    const config = { headers: { 'x-access-token': context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      setCategories(result);
      if (result.length > 0) {
        setCmbCategory(result[0]._id);
      }
    });
  };

  const apiPostProduct = (prod) => {
    const config = { headers: { 'x-access-token': context.token } };
    axios.post('/api/admin/products', prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Đã thêm sản phẩm thành công');
        apiGetProducts();
      } else {
        alert('Đã thêm sản phẩm thất bại');
      }
    });
  };

  const apiGetProducts = () => {
    const config = { headers: { 'x-access-token': context.token } };
    axios.get('/api/admin/products', config).then((res) => {
      const result = res.data;
      setProducts(result.products);
      if (result.products.length !== 0) {
        props.updateProducts(result.products, result.noPages, result.curPage);
      } else {
        const curPage = props.curPage - 1;
        axios.get('/api/admin/products?page=' + curPage, config).then((res) => {
          const result = res.data;
          props.updateProducts(result.products, result.noPages, curPage);
        });
      }
    });
  };

  const apiPutProduct = (id, prod) => {
    const config = { headers: { 'x-access-token': context.token } };
    axios.put('/api/admin/products/' + id, prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Sản phẩm được cập nhật thành công');
        apiGetProducts();
      } else {
        alert('Sản phẩm được cập nhật thất bại');
      }
    });
  };

  const apiDeleteProduct = (id) => {
    const config = { headers: { 'x-access-token': context.token } };
    axios.delete('/api/admin/products/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Đã xóa sản phẩm thành công');
        apiGetProducts();
      } else {
        alert('Đã xóa sản phẩm thất bại');
      }
    });
  };

  const cates = categories.map((cate) => {
    return (
      <option key={cate._id} value={cate._id}>
        {cate.name}
      </option>
    );
  });

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-4">
      <h2 className="text-2xl font-bold text-center mb-6">CHI TIẾT SẢN PHẨM</h2>
      <form className="space-y-4">
        <div>
          <label className="block font-medium">ID</label>
          <input type="text" className="w-full border p-2 rounded" value={txtID} readOnly />
        </div>
        <div>
          <label className="block font-medium">Tên sản phẩm</label>
          <input type="text" className="w-full border p-2 rounded" value={txtName} onChange={(e) => setTxtName(e.target.value)} />
        </div>
        <div>
          <label className="block font-medium">Giá</label>
          <input type="number" className="w-full border p-2 rounded" value={txtPrice} onChange={(e) => setTxtPrice(e.target.value)} />
        </div>
        <div>
          <label className="block font-medium">Hình ảnh</label>
          <input type="file" accept="image/jpeg, image/png, image/gif" onChange={previewImage} />
        </div>
        <div>
          <label className="block font-medium">Loại</label>
          <select className="w-full border p-2 rounded" value={cmbCategory} onChange={(e) => setCmbCategory(e.target.value)}>
            {cates}
          </select>
        </div>
        <div>
          <label className="block font-medium">Mô tả</label>
          <textarea className="w-full border p-2 rounded" value={txtDescription} onChange={(e) => setTxtDescription(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          <button className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-black font-bold" onClick={btnAddClick}>
            Thêm
          </button>
          <button className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-black font-bold" onClick={btnUpdateClick}>
            Cập nhật
          </button>
          <button className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-black font-bold" onClick={btnDeleteClick}>
            Xóa
          </button>
          <button className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-black font-bold" onClick={clearAllInputs}>
            Đặt lại
          </button>
        </div>
        <div className="text-center mt-6">
          {imgProduct && <img src={imgProduct} className="mx-auto w-60 h-60 object-cover border rounded" alt="Preview" />}
        </div>
      </form>
    </div>
  );
};

export default ProductDetail;
