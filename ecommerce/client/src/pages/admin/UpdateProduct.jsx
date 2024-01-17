import { useState } from "react";
import Layout from "../../layout/Layout";
import AdminMenu from "./AdminMenu";
import { useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

export default function UpdateProduct() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const { id } = useParams();
  // const [id,setId]=useState()
  const navigate = useNavigate();

  async function getCategories() {
    const { data } = await axios.get(
      `http://localhost:5500/api/v1/get-category`
    );
    setCategories(data?.categories);
  }
  useEffect(() => {
    getCategories();
    singleProduct();
  }, []);

  // single product
  async function singleProduct() {
    //    console.log(id);
    const { data } = await axios.get(
      `http://localhost:5500/api/v1/single-product/${id}`
    );
    console.log(data?.product?.name);
    setName(data?.product?.name);
    setDescription(data?.product?.description);
    setCategory(data?.product?.category?._id);
    setPrice(data?.product?.price);
    setQuantity(data?.product?.quantity);
    setShipping(data?.product?.shipping);
  }

  // handleUpdate function
  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      console.log(id);
      const productData = new FormData();
      productData.append("name", name);
       productData.append("description", description);
      productData.append("price", price);
       productData.append("quantity", quantity);
       productData.append("photo", photo);
       productData.append("category", category);
       productData.append("shipping", shipping);

      const { data } = await axios.put(
        ` http://localhost:5500/api/v1/update-product/${id}`,
        productData
      );
      if (data?.success) toast.success(data?.message, { autoClose: 500 });
      
      setTimeout(() => {
        navigate("/dashboard/products");
      }, 1000);
      window.reload(); //this is used for refresh the window /page
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
            value={category}
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
            {photo ? (
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
            ) : (
              <>
                <img
                  src={`http://localhost:5500/api/v1/product-photo/${id}`}  
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
              value={shipping ? "Yes" : "No"}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
          </div>

          <div className="mb-3">
            <button className="btn btn-primary" onClick={handleUpdate}>
              UPDATE PRODUCT
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
