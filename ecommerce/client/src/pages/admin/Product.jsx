// import React, { useEffect, useState } from "react";
// import Layout from "../../layout/Layout";
// import AdminMenu from "./AdminMenu";
// import axios from "axios";
// import { Select } from "antd";
// const { Option } = Select;

// export default function Product() {
//   const [name, setName] = useState();
//   const [price, setPrice] = useState();
//   const [description, setDescription] = useState();
//   const [quantity, setQuantity] = useState();
//   const [shipping, setshipping] = useState();
//   const [photo, setPhoto] = useState("");
//   const [category, setCategory] = useState("");
//   const [categories, setCategories] = useState([]);
//   async function getCategories() {
//     const { data } = await axios.get(
//       `http://localhost:5500/api/v1/get-category`
//     );
//     setCategories(data?.categories);
//   }
//   useEffect(() => {
//     getCategories();
//   }, []);

//   // handleProduct function
//   const handleProduct = async (e) => {
//     try {
//       e.preventDefault();
//       let productData = new FormData();
//       productData.append("name", name);
//       productData.append("description", description);
//       productData.append("price", price);
//       productData.append("quantity", quantity);
//       productData.append("photo", photo);
//       productData.append("category", category);
//       productData.append("shipping", shipping);

//       const { data } = await axios.post(
//         `http://localhost:5500/api/v1/add-product`,
//         productData
//       );
//       console.log(data)
//       // if (data?.success) {
//       //   alert(data?.message);
//       // }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <Layout>
//       <div className="row">
//         <div className="col-md-4">
//           <AdminMenu />
//         </div>
//         <div className="col-md-8">
//           {/* product page
//           {JSON.stringify(category, null, 4)} */}
//           {/* <select className="form-select form-selet-md mb-3 w-50" >
//             {categories.map((cat, i) => (
//               <>
//                 <option value={cat.name} key={i}>
//                   {cat.name}
//                 </option>
//               </>
//             ))}
//           </select> */}
//           <Select
//             bordered={false}
//             placeholder="select a category"
//             size="large"
//             showSearch
//             className="form-select mb-3"
//             onChange={(value) => setCategory(value)}
//           >
//             {categories.map((cat, i) => (
//               <>
//                 <Option key={i} value={cat._id}>
//                   {cat.name}
//                 </Option>
//               </>
//             ))}
//           </Select>

//           <div className="mb-3">
//             <label className="btn btn-outline-seconday w-100">
//               {photo ? photo.name : "Upload Photo"}
//               <input
//                 type="file"
//                 name="photo"
//                 accept="image/*"
//                 onChange={(e) => setPhoto(e.target.files[0])}
//                 hidden
//               />
//             </label>
//           </div>
//           <div className="mb-3">
//             {photo && (
//               <>
//                 <img
//                   src={URL.createObjectURL(photo)}
//                   alt=""
//                   width="200"
//                   height="200"
//                   style={{ marginLeft: "200px" }}
//                 />
//               </>
//             )}
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               name="name"
//               placeholder="write a name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>

//           <div className=" mb-3">
//             <textarea
//               className="form-control"
//               rows={3}
//               name="description"
//               value={description}
//               placeholder="write a description"
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               name="price"
//               placeholder="price "
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               name="quantity"
//               placeholder=" quantity"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <Select
//               bordered={false}
//               placeholder="Select Shipping"
//               size="large"
//               className="form-select mb-3"
//               onChange={(value) => setshipping(value)}
//             >
//               <Option value="0">No</Option>
//               <Option value="1">Yes</Option>
//             </Select>
//           </div>
//           <div className="mb-3">
//             <button className="btn btn-primary" onClick={handleProduct}>
//               {" "}
//               Create Product
//             </button>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }
import { useState } from "react";
import Layout from "../../layout/Layout";
import AdminMenu from "./AdminMenu";
import { useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

export default function Product() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  const navigate=useNavigate()

  async function getCategories() {
    const { data } = await axios.get(
      `http://localhost:5500/api/v1/get-category`
    );
    setCategories(data?.categories);
  }
  useEffect(() => {
    getCategories();
  }, []);

  // handleProduct function
  const handleProduct = async (e) => {
    try {
      e.preventDefault();
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.post(
        `http://localhost:5500/api/v1/add-product`,
        productData
      );
      if (data?.success) toast.success(data?.message, { autoClose: 1000 });

      setTimeout(()=>{
        navigate("/dashboard/products")
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row">
        <div className="col-md-4">
          <AdminMenu />
        </div>
        <div className="col-md-8 mt-5 w-50">
          <Select
            bordered={false}
            placeholder="Select a category"
            size="large"
            showSearch
            className="form-select mb-3"
            onChange={(value) => setCategory(value)}
          >
            {categories.map((cat, i) => (
              <>
                <Option key={i} value={cat._id}>
                  {cat.name}
                </Option>
              </>
            ))}
          </Select>
          <div className="mb-3">
            <label className="btn btn-outline-secondary w-100">
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>

          <div className="mb-3">
            {photo && (
              <>
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  width="200"
                  height="200"
                  style={{ marginLeft: "200px" }}
                  className="img img-responsive"
                />
              </>
            )}
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="write a name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              rows={3}
              name="description"
              value={description}
              placeholder="write a description here..."
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="price"
              placeholder="write a price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
<div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="quantity"
              placeholder="write a quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <Select
              bordered={false}
              placeholder="Select shipping"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => setShipping(value)}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
          </div>

          <div className="mb-3">
            <button className="btn btn-primary" 
            onClick={handleProduct}>
              CREATE PRODUCT
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}