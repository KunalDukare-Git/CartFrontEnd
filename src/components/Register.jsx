import React from "react";
import { useFormik } from "formik";
import { SignupValidations } from "../form-validations/FormValidations";
import "./Register.css";
import { userSignup } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialValues = {
  first_name: "",
  last_name: "",
  add_line1: "",
  add_line2: "",
  state: "",
  city: "",
  mobile: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const state = [
  "Maharashtra",
  "Gujrat",
  "Uttar Pradesh",
  "Bihar",
  "Maddhya Pradesh",
];

const city = [
  "Mumbai",
  "Pune",
  "Nagpur",
  " Wardha",
  "Mandgaon",
  "Ramtek",
  " Amravati",
];

const Register = () => {
  const navigate = useNavigate();
  const { values, errors, touched, handleChange, handleSubmit, handleReset } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignupValidations,
      onSubmit: async (values) => {
        const res = await userSignup(values);
        if (res.data.status) {
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      },
    });

  return (
    <>
      <div className="container register">
        <div className="row">
          <div className="col-md-3 register-left">
            <h3>Welcome</h3>
            <br />
            <input
              type="submit"
              name=""
              value="Login"
              onClick={() => navigate("/login")}
            />
            <br />
          </div>
          <div className="col-md-9 register-right">
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <form className="row register-form" onSubmit={handleSubmit}>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="first Name"
                        value={values?.first_name}
                        name="first_name"
                        onChange={handleChange}
                      />
                      {errors.first_name && touched.first_name ? (
                        <p className="text-danger">{errors.first_name}</p>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address Line1"
                        value={values?.add_line1}
                        name="add_line1"
                        onChange={handleChange}
                      />
                      {errors.add_line1 && touched.add_line1 ? (
                        <p className="text-danger">{errors.add_line1}</p>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <select
                        name="state"
                        className="form-control"
                        onChange={handleChange}
                        style={{ display: "block" }}
                      >
                        <option>Select State</option>
                        {state.map((data, i) => (
                          <option key={i}>{data}</option>
                        ))}
                      </select>
                      {errors.state && touched.state ? (
                        <p className="text-danger">{errors.state}</p>
                      ) : null}
                    </div>
                    <div className="form-group">
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
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={values?.password}
                        name="password"
                        onChange={handleChange}
                      />
                      {errors.password && touched.password ? (
                        <p className="text-danger">{errors.password}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        value={values?.last_name}
                        name="last_name"
                        onChange={handleChange}
                      />
                      {errors.last_name && touched.last_name ? (
                        <p className="text-danger">{errors.last_name}</p>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address Line2"
                        value={values?.add_line2}
                        name="add_line2"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <select
                        name="city"
                        className="form-control"
                        onChange={handleChange}
                      >
                        <option>Select City</option>
                        {city.map((data, i) => (
                          <option key={i}>{data}</option>
                        ))}
                      </select>
                      {errors.city && touched.city ? (
                        <p className="text-danger">{errors.city}</p>
                      ) : null}
                    </div>
                    <div className="form-group">
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

                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        value={values?.confirmPassword}
                        name="confirmPassword"
                        onChange={handleChange}
                      />
                      {errors.confirmPassword && touched.confirmPassword ? (
                        <p className="text-danger">{errors.confirmPassword}</p>
                      ) : null}
                      {!errors.confirmPassword && touched.confirmPassword? (
                        <p className="text-success">Password Matched</p>
                      ) : null}
                    </div>
                  </div>
                  <button className="btn btn-info" type="submit">
                    Submit
                  </button>
                  <button className="btn btn-danger" onClick={handleReset}>
                    Reset
                  </button>
                </form>
              </div>
              <div
                className="tab-pane fade show"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <h3 className="register-heading">Apply as a Hirer</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
