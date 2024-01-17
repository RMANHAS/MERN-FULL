import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "./user/Price";

export default function Home() {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked,setChecked]=useState([])
  const [radio,setRadio]=useState([])

  //get all categories
  async function getAllCategories() {
    try {
      const { data } = await axios.get(
        `http://localhost:5500/api/v1/get-category`
      );
      setCategories(data?.categories);
      console.log(data?.categories);
    } catch (error) {
      console.log(error);
    }
  }

  //get all products
  async function getAllProducts() {
    try {
      const { data } = await axios.get(`http://localhost:5500/api/v1/product`);
      //  console.log(data?.products)
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);
  
  //checked
  const handleFilter=(value,cid)=>{
let all = [...checked];
if(value){
  all.push(cid)
}else{
  all= all.filter((c)=>c!==cid)
}
setChecked(all)
  }
  return (
    <Layout>
      {/* <h1>this is hahahhahahhahah</h1>
       <pre>
        {JSON.stringify(auth,null,4)}
       </pre> */}
      {/* <div className='container'> */}
      <div className="row">
        <div className="col-md-4">
          <h2 className="text-center">filters by category</h2>
          {/* {JSON.stringify(checked,null,4)} */}
          <div className="d-flex flex-column mt-3 ms-3">
            {categories.map((cat) => (
              <>
                <Checkbox key={cat._id} onChange={(e) =>handleFilter (e.target.checked,cat._id)} style={{fontsize:'50px'}} >
                  {cat.name}
                </Checkbox>
              </>
            ))}

<h3 className="mt-3">filter by price</h3>

  <Radio.Group>
  <div className="d-flex flex-column ">
{
  Prices.map((p)=>
  <Radio value= {p.array} style={{fontSize:"20px",paddingBottom:'5px'}}>   {p.name}</Radio>
  )
}
</div>
  </Radio.Group>
</div>

         


        </div>
        <div className="col-md-8">
          <h2 className="text-center mb-3"> All Products</h2>
          <div className="row">
            {products.map((product) => (
              <>
                <div className="col-md-4">
                  <div className="card mb-3" style={{ width: "18rem" }}>
                    <img
                      src={`http://localhost:5500/api/v1/product-photo/${product._id}`}
                      className="card-img-top mt-3 "
                      alt="..."
                      id="image"
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        Name:{product.name.toUpperCase()}
                      </h5>
                      <p className="card-text">
                        Category:{product.category.name}
                      </p>
                      <p className="card-text">Price:{product.price}</p>
                      <a href="#" className="btn btn-secondary me-2">
                        Add to Card
                      </a>
                      <a href="#" className="btn btn-success">
                        Read more...
                      </a>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
