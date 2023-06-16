import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartProducts,
} from "../../redux/productsReducer/product.actions";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartProducts = useSelector((state) => state.product).cart;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const func = () => {
      let tot = 0;
      cartProducts.map((item) => {
        tot = tot + item.price * item.qty;
      });
      setTotal(tot);
    };
    func();
  }, []);

  const checkoutHandler = async () => {
    navigate(`/checkoutpage/${total}`);
  };

  const backHandler= async () => {
    navigate(`/dashboard`);
  };

  const removeItemHandler = (id) => {
    console.log(id);
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (productId, qty) => {
    const updatedCartProducts = cartProducts.map((product) => {
      if (product._id === productId) {
        return { ...product, qty };
      }
      return product;
    });

    dispatch(updateCartProducts(updatedCartProducts));

    let tot = 0;
    updatedCartProducts.map((item) => {
      tot = tot + item.price * item.qty;
    });
    setTotal(tot);
  };
  return (
    <div class="mt-5">
      <h1>
        <b>My Cart</b>
      </h1>
      <div class="text-right ">
        <h2 class>Total : ${total}</h2>
        <button type="button" class="btn btn-success" onClick={backHandler}>
          Back
        </button>
        <button type="button" class="btn btn-success" onClick={checkoutHandler}>
          Checkout
        </button>
      </div>
      <div class="row mt-5" id="ads">
        {cartProducts.length === 0 ? (
          <p style={{ fontWeight: "bold" }}>No items found in the cart.</p>
        ) : (
          <>
            {cartProducts.map((data, index) => {
              return (
                <div key={data._id} class="col-md-4">
                  <div class="card rounded">
                    <div class="card-image">
                      {/* <span class="card-notify-badge">
                    <strong>Product Id:</strong>
                    {data._id}
                  </span> */}
                      <br />
                      <img src={data.image} alt="" />
                    </div>
                    <div class="card-image-overlay m-auto">
                      <span class="card-detail-badge">
                        <strong>Product Name :</strong>
                        {data.productname}
                      </span>
                      <br />
                      <span class="card-detail-badge">
                        <b>Price :</b>
                        {data.price}
                      </span>
                      <br />
                      <span class="card-detail-badge">
                        <strong>Rating :</strong>
                        4.5
                      </span>
                      <br></br>
                      <span class="card-detail-badge">
                        <strong>Quantity :</strong>
                        <input
                          type="number"
                          min={1}
                          value={data.qty || 1}
                          onChange={(e) =>
                            handleQuantityChange(
                              data._id,
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </span>
                    </div>
                    <div class="card-body text-center">
                      <div class="ad-title m-auto">
                        <h5>This product is so awesome</h5>
                      </div>
                      <button
                        class="btn btn-outline-success my-2 my-sm-0"
                        onClick={(e) => removeItemHandler(data._id)}
                      >
                        Remove
                      </button>
                      <br></br>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
export default Cart;
