// import React, { useEffect, useState } from "react";
// import Layout from "../../layout/Layout";
// import AdminMenu from "./AdminMenu";
// import axios from "axios";
// import { set } from "mongoose";

// // import toast from 'react-toastify'

// export default function Category() {
//   const [name, setName] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [updatename, setUpdateName] = useState("");
//   const [id,setId]=useState()

//   //get single category

//  async function getsingleCategory(id){
//   console.log(id)
//   const {data}=await axios.get(`http://localhost:5500/api/v1/get-single-category/${id}`)
//   console.log(data?.category?.name)
//   setName(data?.category?.name)
//   setId(data?.category?._id)

//   }

//   //update category
// async function handleUpdate(){

// await axios.put(`http://localhost:5500/api/v1/update-category/${id}`,{name:updatename})
// }
// getCategories()

//   const handleDelete = async ( id) => {
//     try {

//       const { data } = axios.delete(
//         `http://localhost:5500/api/v1/delete-category/${id}`
//       );
//       // alert(data?.success);
//       getCategories();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   async function getCategories(){
//     const {data}=await axios.get(`http//localhost:500/api/v1/get-category`)
//     set(data?.categories)
//   }
//   // function getCategories() {
//   //   (async () => {
//   //     const { data } = await axios.get(
//   //       `http://localhost:5500/api/v1/get-category`
//   //     );
//   //     // console.log(data?.categories)
//   //     setCategories(data?.categories);
//   //   })();
//   // }
//   // useEffect(() => {
//   //   // (async () => {
//   //   //   const { data } = await axios.get(
//   //   //     `http://localhost:5500/api/v1/get-category`
//   //   //   );
//   //   //   // console.log(data?.categories)
//   //   //   setCategories(data?.categories);
//   //   // })();
//   //   getCategories();
//   // }, []);

//   const handleCategory = async (e) => {
//     try {

//       const { data } = await axios.post(
//         `http://localhost:5500/api/v1/create-category`,
//         { name }
//       );
//       //  if(data?.success){
//       //   toast.success(data?.message,{autoClose:1000})
//       //  }
//       console.log(data);
//       alert(data.message);
//       getCategories(); //here we use the getcategories to update the category in realtime
//       setName("");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <Layout>
//       {/* model start */}

//       {/* <!-- Button trigger modal --> */}
//       <div>
//         <div
//           className="modal fade"
//           id="exampleModal"
//           tabIndex={-1}
//           aria-labelledby="exampleModalLabel"
//           aria-hidden="true"
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h1 className="modal-title fs-5" id="exampleModalLabel"
//                 // onClick={()=>{handleUpdate()}}
//                 >
//                   Update category
//                 </h1>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                 />
//               </div>
//               <div className="modal-body">
//                 <form>
//                   <div className="mb-3">
//                     <label for="exampleInputEmail1" class="form-label">
//                       Category Name
//                     </label>
//                     <input
//                       type="text"
//                       class="form-control"
//                     name="name"
//                     value={name}
//                      onChange={(e)=>setName(e.target.value)}

//                     />
//                     {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
//                   </div>
//                 </form>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-success"
//                   data-bs-dismiss="modal"
//                 >
//                    update
//                 </button>
//                 {/* <button type="button" className="btn btn-success">

//                 </button> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* model end */}

//       <div className="row">
//         <div className="col-md-4">
//           <AdminMenu />
//         </div>
//         <div className="col-md-8 w-50 ">
//           <form className="mt-5 ">
//             <div className="mb-3">
//               <input
//                 type="email"
//                 className="form-control"
//                 placeholder="Enter category name"
//                 name="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>

//             <button
//               type="submit"
//               className="btn btn-outline-success w-100"
//               onClick={handleCategory}
//             >
//               Add category
//             </button>
//           </form>
//           <div className="row  ">
//             <table className="table ">
//               <thead>
//                 <tr>
//                   <th scope="col">sno.</th>
//                   <th scope="col">name</th>
//                   <th></th>
//                   <th></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {categories.length > 0 ? (
//                   <>
//                     {categories.map((cat, i) => (
//                       <>
//                         <tr>
//                           <th key={i}>{(i = i + 1)}</th>
//                           <td>{cat.name}</td>
//                           <td>
//                             <button
//                               className="btn btn-outline-danger"
//                               onClick={() => {
//                                 if (window.confirm("are you sure to delete")) {
//                                   handleDelete(cat._id);
//                                 }
//                               }}
//                             >
//                               DElete
//                             </button>
//                           </td>
//                           <td>
//                             <button
//                               type="button"
//                               className="btn btn-primary"
//                               data-bs-toggle="modal"
//                               data-bs-target="#exampleModal"
//                               onClick={()=>getsingleCategory(cat._id)}
//                             >
//                               edit
//                             </button>
//                           </td>
//                         </tr>
//                       </>
//                     ))}
//                   </>
//                 ) : (
//                   <tr>
//                     <th>no category found</th>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";

export default function Category() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [updateName,setUpdateName] = useState("")
  const [id,setId] = useState()
  // single category
    async function getSingleCategory(id){
      // console.log(id);
        const {data} = await axios.get(`http://localhost:5500/api/v1/get-single-category/${id}`)
        console.log(data?.category?.name);
        setUpdateName(data?.category?.name)
        setId(data?.category?._id)
     }


  //  update category
async function handleUpdate ()
{
 await axios.put(`http://localhost:5500/api/v1/update-category/${id}`,{
  name:updateName
 })
  getCategories()

}

  // delete category
  async function handleDelete(id) {
    try {
    
      const { data } = await axios.delete(
        `http://localhost:5500/api/v1/delete-category/${id}`
      );
      //  console.log(data);

      if (data?.success) {
        toast.success(data?.message, { autoClose: 200 });
        getCategories();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getCategories() {
    const { data } = await axios.get(
     ` http://localhost:5500/api/v1/get-category`
    );
    // console.log(data?.categories);
    setCategories(data?.categories);
  }

  useEffect(() => {
    getCategories();
  }, []);

  const handleCategory = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        `http://localhost:5500/api/v1/create-category`,
        { name }
      );

      if (data?.success) {
        toast.success(data?.message, { autoClose: 200 });
        setTimeout(() => {
          getCategories();
        }, 300);
        setName("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      {/* modal starts */}
      <div>
        {/* Button trigger modal */}

        {/* Modal */}
        <div
          className="modal  fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="updateName"
                      value={updateName}
                      onChange={(e) => setUpdateName(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-success"
                    data-bs-dismiss="modal"
                    onClick={()=>handleUpdate()}
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal ends */}

      <div className="row">
        <div className="col-md-4">
          <AdminMenu />
        </div>
        <div className="col-md-8 w-50 mt-5 ms-5">
          <form>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter category name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-outline-primary w-100"
              onClick={handleCategory}
            >
              Add Category
            </button>
          </form>
<div className="row">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Sno</th>
                  <th scope="col">Name</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <>
                  {categories.map((cat, i) => (
                    <>
                      <tr  key={i}>
                        <th>{(i = i + 1)}</th>
                        <td>{cat.name}</td>
                        <td>
                          <button
                            className="btn btn-outline-danger me-5"
                            onClick={() => {
                              if (window.confirm("Are you sure to delete?")) {
                                handleDelete(cat._id);
                              }
                            }}
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={()=>getSingleCategory(cat._id)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
