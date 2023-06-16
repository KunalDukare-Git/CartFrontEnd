import React from "react";
import "./Login.css";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LoginValidations } from "../form-validations/FormValidations";
import { useDispatch } from "react-redux";
import { userLogin } from "../services/auth.service";
import { userlogin } from "../redux/authReducer/auth.actions";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: LoginValidations,
    onSubmit: async (values) => {
      const res = await userLogin(values);
      if (res.data.status) {
        toast.success(res.data.message);
        dispatch(userlogin(res.data.result));
        navigate("/dashboard");
      } else {
        toast.error(res.data.message);
      }
    },
  });

  return (
    <>
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
          <MDBCol col="10" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </MDBCol>

          <MDBCol col="4" md="6">
            <div className="d-flex flex-row align-items-center justify-content-center">
              <p className="lead fw-normal mb-0 me-3">Sign in with</p>

              <MDBBtn floating size="md" tag="a" className="me-2">
                <MDBIcon fab icon="facebook-f" />
              </MDBBtn>

              <MDBBtn floating size="md" tag="a" className="me-2">
                <MDBIcon fab icon="twitter" />
              </MDBBtn>

              <MDBBtn floating size="md" tag="a" className="me-2">
                <MDBIcon fab icon="linkedin-in" />
              </MDBBtn>
            </div>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">Or</p>
            </div>

            <MDBInput
              wrapperclass="mb-4"
              placeholder="Email"
              type="email"
              size="lg"
              name="email"
              onChange={handleChange}
            />
            {errors.email && touched.email ? (
              <p className="text-danger">{errors.email}</p>
            ) : null}
            <br />
            <MDBInput
              wrapperclass="mb-4"
              placeholder="Password"
              type="password"
              size="lg"
              name="password"
              onChange={handleChange}
            />
            {errors.password && touched.password ? (
              <p className="text-danger">{errors.password}</p>
            ) : null}

            <div className="text-center text-md-start mt-4 pt-2">
              <MDBBtn
                type="button"
                className="mb-0 px-3"
                onClick={() => handleSubmit()}
              >
                Login
              </MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account?{" "}
                <a
                  className="link-danger"
                  onClick={() => navigate("/register")}
                >
                  Register
                </a>
              </p>
            </div>
          </MDBCol>
        </MDBRow>

        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2020. All rights reserved.
          </div>

          <div>
            <MDBBtn
              tag="a"
              color="none"
              className="mx-3"
              style={{ color: "white" }}
            >
              <MDBIcon fab icon="facebook-f" size="md" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="mx-3"
              style={{ color: "white" }}
            >
              <MDBIcon fab icon="twitter" size="md" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="mx-3"
              style={{ color: "white" }}
            >
              <MDBIcon fab icon="google" size="md" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="mx-3"
              style={{ color: "white" }}
            >
              <MDBIcon fab icon="linkedin-in" size="md" />
            </MDBBtn>
          </div>
        </div>
      </MDBContainer>
      );
    </>
  );
};

export default Login;
