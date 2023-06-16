import React, { useState } from "react";
import { checkout } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { clearCart } from "../../redux/productsReducer/product.actions";
import { useDispatch } from "react-redux";
import { CheckOutForm } from "../../form-validations/FormValidations";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

const initialValues = {
  fullname: "",
  email: "",
  mobile: "",
  address: "",
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { amount } = useParams();
  const products = useSelector((state) => state.product).cart;

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: CheckOutForm,
    onSubmit: async (values) => {
      let reqData = {
        total: amount,
        products: products,
        customerDetails: values,
      };

      console.log("REQ DATA==>", reqData);
      const res = await checkout(reqData);
      if (res.data.result.url) {
        window.location.href = res.data.result.url;
      }
      dispatch(clearCart());
    },
  });

  const handleRoute = () => {
    navigate("/cart");
  };

  return (
    <>
      <div class="container">
        <div class=" text-center mt-5 ">
          <h1>Fill Details</h1>
        </div>
        <div class="row ">
          <div class="col-lg-7 mx-auto">
            <div class="card mt-2 mx-auto p-4 bg-light">
              <div class="card-body bg-light">
                <div class="container">
                  <div class="row">
                    <div class="col-md-12">
                      <button
                        type="submit"
                        class="btn btn-info btn-send  pt-2 btn-block
                            "
                      >
                        Total $ : {amount}/-
                      </button>
                    </div>
                  </div>
                  <br></br>
                  <br></br>
                  <form id="contact-form" role="form">
                    <div class="controls">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="form_name">Full Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Full Name"
                              value={values?.fullname}
                              name="fullname"
                              onChange={handleChange}
                            />
                            {errors.fullname && touched.fullname ? (
                              <p className="text-danger">{errors.fullname}</p>
                            ) : null}
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="form_lastname">Email </label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Email"
                              value={values?.email}
                              name="email"
                              onChange={handleChange}
                            />
                            {errors.email && touched.email ? (
                              <p className="text-danger">{errors.email}</p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="form_email">Mobile</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Mobile"
                              value={values?.mobile}
                              name="mobile"
                              onChange={handleChange}
                            />
                            {errors.mobile && touched.mobile ? (
                              <p className="text-danger">{errors.mobile}</p>
                            ) : null}
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for="form_need">Address</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Address"
                              value={values?.address}
                              name="address"
                              onChange={handleChange}
                            />
                            {errors.address && touched.address ? (
                              <p className="text-danger">{errors.address}</p>
                            ) : null}
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group"></div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <button
                            type="submit"
                            class="btn btn-success btn-send  pt-2 btn-block
                            "
                            onClick={(e) => handleSubmit(e)}
                          >
                            Pay
                          </button><br></br><br></br>

                          <button
                            type="submit"
                            class="btn btn-danger btn-send  pt-2 btn-block
                            "
                            onClick={handleRoute}
                          >
                            Cancle
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CheckoutPage;
