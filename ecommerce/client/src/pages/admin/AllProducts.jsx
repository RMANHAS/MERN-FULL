import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";



export default function AllProducts() {
  const [products, setProducts] = useState([]);
  async function getProducts() {
    try {
      const { data } = await axios.get(`http://localhost:5500/api/v1/product`);
      //  console.log(data)
      setProducts(data?.products);
      console.log(data?.products);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);

  //delete
  const handleDelete=async(id)=>{
   try {
  const {data}=  await axios.delete(`http://localhost:5500/api/v1/delete-product/${id}`)
  
  if(data.success){
    alert(data?.message)
    
  }
getProducts()
   } catch (error) {
    console.log(error)
   }
  }

  
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 mt-3">
          <h3 className="text-center">
            all products
            {/* {JSON.stringify(products, null, 4)} */}
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Photo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  return (
                    <>
                      <tr key={product._id}>
                        <th>{product.name}</th>
                        <td>{product.description}</td>
                        <td>{product?.category?.name}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td>
                          <img
                            src={`http://localhost:5500/api/v1/product-photo/${product._id}`}
                            alt=""
                            width={"70px"}
                            height={"70px"}
                            className="img img-resposive" />
                        </td>
                        <td>
                          <Link className="btn btn-success btn-sm me-2" to={`/dashboard/update-product/${product._id}`}>
                            Edit
                          </Link>
                          <button className="btn btn-danger btn-sm " onClick={()=>{
                        if(window.confirm("R u sure to delete" )){
                          handleDelete(product._id)
                        }
                        }  
                        }>
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </h3>
        </div>
      </div>
    </Layout>
  );
}
