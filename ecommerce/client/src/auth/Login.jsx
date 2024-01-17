import { useState } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import one from './onetwo.jpg.jpg'

export default function Login() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState('')
const [auth,setAuth]=useAuth()
const navigate=useNavigate()
const location=useLocation()

  const handleSubmit=async(e)=>{
try {
  e.preventDefault();
  const { data } = await axios.post(
    `http://localhost:5500/api/v1/login`,
    {email,password}
  );

  // console.log(data)
  // alert(data.messaage)
  if(data?.success){
    toast.success(data?.message,{autoClose:500})
    {
      setAuth({
        ...auth,
        user:data?.user,
        token:data?.token
      })

localStorage.setItem('auth',JSON.stringify(data))

      setTimeout(() => {
        navigate(location.state || '/')
      }, 1000);
     
    }
  }
  else{
  
  toast.error(data?.message,{autoClose:500})

  // else (!password)
  //   toast.error(data.message,{autoClose:500})
  
  }
 

} 

catch (error) {
  console.log("something is happen wrong",error)
  
}
  }
  return (
    <Layout>
      <div className="row">
        <div className="col-md-4"> 
        </div>
        <div className="col-md-4 m-4">
          <div className="card p-5">
            <h2 className="pb-3">Login Form</h2>
          <form >
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
               
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
               
              />
            </div>

            <button type="submit" className="btn btn-success w-100" onClick={handleSubmit}>
              Login
            </button>
          </form>

          <Link className="btn btn-primary m-1" to="/forget-password">forget password</Link>
          </div>
         
        </div>
      </div>
    </Layout>
  );
}