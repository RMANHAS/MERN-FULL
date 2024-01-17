import React, { useState } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    gender: "",
    answer: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    // console.log(e)
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
   
      e.preventDefault();
      console.log(user);
      const { data } = await axios.post(
        `http://localhost:5500/api/v1/register`,
        user
      );
      console.log(data);
      alert("..registered");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      console.log(data?.message)
      console.log(data?.success)
      if (data?.success) {
        // toast.success(data?.message, { autoClose: 500 });
        // setTimeout(() => {
        //   navigate("/login");
        // }, 1000);
      } else {
        toast.error(data?.messaage, { autoClose: 500 });
      }
   
  };
  return (
    <Layout>
      <div className="row">
        <div className="col-md-6 offset-3">
          <div className="card p-5 my-3">
            <h3>Registration Form</h3>
            <p style={{ fontSize: "13px" }}>
              Fields marked with <span className="text-danger">*</span> are
              mandatory
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">
                  <span className="text-danger">*</span> Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  <span className="text-danger">*</span> Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  <span className="text-danger">*</span> Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">
                  <span className="text-danger">*</span> Mobile
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="mobile"
                  value={user.mobile}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  <span className="text-danger">*</span> Address
                </label>
                <textarea
                  className="form-control"
                  rows={3}
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">
                  <span className="text-danger">*</span> Gender
                </label>
                <select
                  className="form-select form-select-lg mb-3"
                  name="gender"
                  value={user.gender}
                  onChange={handleChange}
                >
                  <option> select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Other</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputAnswer" className="form-label">
                  <span className="text-danger">*</span> What is your favorite
                  sports?
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="answer"
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-success w-100">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
