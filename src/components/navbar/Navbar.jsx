import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.jpeg";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { userlogout } from "../../redux/authReducer/auth.actions";
import { clearCart } from "../../redux/productsReducer/product.actions";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogIn = useSelector((state) => state.auth).isLoggedIn;
  const cartLength = useSelector((state) => state.product).cart.length;

  const logoutHandler = () => {
    localStorage.clear();
    dispatch(userlogout());
    dispatch(clearCart());
    navigate('/')
  };

  const cartHandler = () => {
    navigate("/cart");
  };

  return (
    <>
      <div id="flipkart-navbar">
        <div class="container">
          <div class="row row1"></div>
          <div class="row row2">
            <div class="col-sm-2">
              <h2>
                <span class="smallnav menu" onclick="openNav()">
                  ☰ Brand
                </span>
              </h2>
              <h1>
                <span class="largenav">
                  <img src={logo} width="150px" height="80px" alt="" />
                </span>
              </h1>
            </div>
            <div class="flipkart-navbar-search smallsearch col-sm-8 col-xs-11">
              {/* <div class="row">
                <input
                  class="flipkart-navbar-input col-xs-11"
                  type="text"
                  placeholder="Search for Products, Brands and more"
                  name="search"
                  onChange={(e)=>navigate(`/searchresult/${e.target.value}`)}
                />
                <button class="flipkart-navbar-button col-xs-1">
                  <svg width="15px" height="15px">
                    <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
                  </svg>
                </button>
              </div> */}
            </div>
            {isLogIn ? (
              <>
                {" "}
                <div class="cart largenav col-sm-2">
                  <button className="btn btn-warning" onClick={cartHandler}>
                    <svg
                      class="cart-svg "
                      width="16 "
                      height="16 "
                      viewBox="0 0 16 16 "
                    >
                      <path
                        d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86 "
                        fill="#fff "
                      ></path>
                    </svg>
                  </button>
                  <span class="item-number ">{cartLength}</span> &nbsp;{" "}
                  <button class="btn btn-danger" onClick={logoutHandler}>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                {" "}
                <Link to="" id="text">
                  Home
                </Link>
                &nbsp;
                <Link to="/admin" id="text">
                  Admin
                </Link>
                &nbsp;
                <Link to="/login" id="text">
                 User Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div id="mySidenav" class="sidenav">
        <div class="container">
          <span class="sidenav-heading">Home</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
