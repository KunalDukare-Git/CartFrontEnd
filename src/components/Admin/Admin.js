import React, { useState, useEffect } from "react";
import {
  getProducts,
  addProduct,
  deleteProduct,
} from "../../services/auth.service";
import { useDispatch } from "react-redux";
import {
  addProducts,
} from "../../redux/productsReducer/product.actions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data.result);
    dispatch(addProducts(res.data.result));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setProductName("");
    setPrice("");
    setCategory("");
    setProductImage(null);
  };

  const saveProduct = async () => {
    const formData = new FormData();
    formData.append("productname", productName);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", productImage);

    const res = await addProduct(formData);

    if (res.data.status) {
      closePopup();
      toast.success(res.data.message);
      fetchProducts();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
  };

  const handleDeleteProduct = async (productId) => {
    console.log("PRODUCT ID", productId);

    const res = await deleteProduct(productId);
    if (res.data.status) {
      toast.success(res.data.message);
      fetchProducts();
    }
  };

  const handleRoute = () => {
    navigate("/orders");
  };

  return (
    <div>
      <div className="row" id="ads">
        <h1>Hello Admin,</h1>
        <button className="btn btn-primary" onClick={openPopup}>
          Add Product
        </button>
        <br></br>

        <button className="btn btn-primary" onClick={handleRoute}>
          Placed ORders
        </button>
        <br></br>

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h2>Add Product</h2>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Product Name"
              />
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
              />
              <input
                input
                type="file"
                name="file"
                onChange={handleImageChange}
                placeholder="Select Image"
              />
              <div className="popup-buttons">
                <button onClick={saveProduct}>Save</button>
                <button onClick={closePopup}>Close</button>
              </div>
            </div>
          </div>
        )}

        {products.map((data, index) => (
          <div className="col-md-4" key={index}>
            <div className="card rounded">
              <div className="card-image">
                <br />
                <img src={data.image} alt="" />
              </div>
              <div className="card-image-overlay m-auto">
                <span className="card-detail-badge">
                  <strong>Product Name:</strong>
                  {data.productname}
                </span>
                <br />
                <span className="card-detail-badge">
                  <b>$</b>
                  {data.price}
                </span>
                <br />
                <span className="card-detail-badge">
                  <strong>Rating:</strong>
                  4.5
                </span>
              </div>
              <div className="card-body text-center">
                <div className="ad-title m-auto">
                  <h5>This product is so awesome</h5>
                </div>
                <button onClick={() => handleDeleteProduct(data._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
