import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./auth/Register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./auth/Login";
import Dashboard from "./pages/user/Dashboard";

import ForgetPassword from "./auth/ForgetPassword";
import AdminRoutess from "./routes/AdminRoutess";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PrivateRoutess from "./routes/PrivateRoutess";
import Users from "./pages/admin/Users";
import Product from "./pages/admin/Product";
import Category from "./pages/admin/Category";
import AllProducts from "./pages/admin/AllProducts";
import UpdateProduct from "./pages/admin/UpdateProduct";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* protected routes */}
          <Route path="/dashboard" element={<PrivateRoutess />}>
            <Route path="user" element={<Dashboard />} />
          </Route>

          {/* protected routes  for admin/super-user*/}
          <Route path="/dashboard" element={<AdminRoutess />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="create-category" element={<Category />} />
            <Route path="create-product" element={<Product />} />
            <Route path="users" element={<Users/>} />
            <Route path="products" element={<AllProducts/>} />
            <Route path="update-product/:id" element={<UpdateProduct/>} />
          </Route>

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="forget-password" element={<ForgetPassword />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
