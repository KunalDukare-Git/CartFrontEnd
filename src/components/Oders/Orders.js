import React, { useState, useEffect } from "react";
import {
  getOrders,
  updateOrder,
} from "../../services/auth.service";
import { useDispatch } from "react-redux";
import {
  addProducts,
} from "../../redux/productsReducer/product.actions";
import { toast } from "react-toastify";

const Orders = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const res = await getOrders();
    setProducts(res.data.result);
    dispatch(addProducts(res.data.result));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleStatusChange = async (e, orderId) => {
    const newStatus = e.target.value;
    let reqData = {
      orderId,
      status: newStatus,
    };

    const res = await updateOrder(reqData);
    if (res.data.status) {
      toast.success(res.data.message);
      fetchProducts();
    }
  };

   const handleFulfillmentChange = async (e, orderId) => {
    const newStatus = e.target.checked;

    let reqData = {
      orderId,
      isFullFilled: newStatus,
    };

    console.log(reqData);
    const res = await updateOrder(reqData);

    if (res.data.status) {
      toast.success(res.data.message);
      fetchProducts();
    }
  };

  return (
    <div>
      <div className="row" id="ads">
        <h1>Hello Admin,</h1>
        <h3>Placed Orders</h3>

        {products.map((data, index) => (
          <div className="col-md-4" key={index}>
            <div className="card rounded">
              <div className="card-image">
                <br />
                <img src={data.image} alt="" />
              </div>
              <div className="card-image-overlay m-auto">
                <span className="card-detail-badge">
                  <strong>Product Name : </strong>
                  {data.productname}
                </span>
                <br />

                <span className="card-detail-badge">
                  <strong>Quantity : </strong>
                  {data.quantity}
                </span>
                <br></br>

                <span className="card-detail-badge">
                  <strong>Customer Name : </strong>
                  {data.customerDetails.fullname}
                </span>
                <br></br>

                <span className="card-detail-badge">
                  <strong>Customer Addres : </strong>
                  {data.customerDetails.address}
                </span>
                <br></br>

                <span className="card-detail-badge">
                  <strong>Customer Mobile : </strong>
                  {data.customerDetails.mobile}
                </span>
                <br></br>

                <span className="card-detail-badge">
                  <strong>Status : </strong>
                  <select
                    value={data.status}
                    onChange={(e) => handleStatusChange(e, data._id)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Proccessing">Proccessing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </span>
                <br></br>

                <span className="card-detail-badge">
                  <strong>FullFillment : </strong>
                  <input
                    type="checkbox"
                    id={`fulfillment-${data._id}`}
                    checked={data.isFullFilled}
                    onChange={(e) => handleFulfillmentChange(e, data._id)}
                  />
                </span>
                <br></br>
              </div>
              <div className="card-body text-center"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
