import React, { useState, useEffect } from "react";
import { getProducts } from "../../services/auth.service";
import { useDispatch } from "react-redux";
import {
  addProducts,
  addToCart,
} from "../../redux/productsReducer/product.actions";

const Products = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const func = async () => {
      const res = await getProducts();
      setProducts(res.data.result);
      dispatch(addProducts(res.data.result));
    };
    func();
  },[]);

  const addToCartHandler = (id) => {
    dispatch(addToCart(id));
  };

  return (
    <div class="row" id="ads">
      {products.map((data, index) => {
        return (
          <div class="col-md-4">
            <div class="card rounded">
              <div class="card-image">
               
                <br />
                <img src={data.image} alt="" />
              </div>
              <div class="card-image-overlay m-auto">
                <span class="card-detail-badge">
                  <strong>Product Name:</strong>
                  {data.productname}
                </span>
                <br />
                <span class="card-detail-badge">
                  <b>$</b>
                  {data.price}
                </span>
                <br />
                <span class="card-detail-badge">
                  <strong>Rating:</strong>
                  4.5
                </span>
              </div>
              <div class="card-body text-center">
                <div class="ad-title m-auto">
                  <h5>This product is so awesome</h5>
                </div>

                <button
                  class="btn btn-outline-success my-2 my-sm-0"
                  onClick={(e) => addToCartHandler(data._id)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
