import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import ProtectedOutlet from "./protect-routes/ProtectedOutlet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Register";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./components/homepage/HomePage";
import Products from "./components/products/Products";
import Cart from "./components/cart/Cart";
import CheckoutPage from "./components/checkout/CheckoutPage";
import Admin from "./components/Admin/Admin";
import Orders from "./components/Oders/Orders"

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<ProtectedOutlet />}>
          <Route path="dashboard" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkoutpage/:amount" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
