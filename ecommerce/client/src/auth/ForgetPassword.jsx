import { useState } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [answer,setAnswer] = useState("")
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate()
   
  const handleSubmit = async(e)=>{
    try {
       e.preventDefault()
      const {data} = await axios.post(`http://localhost:5500/api/v1/forget-password`,{
           email,answer,newPassword
        })
        console.log(data)
        if(data?.success){
            toast.success(data?.message,{autoClose:1000})
            setTimeout(() => {
                 navigate("/login")
            }, 2000);
        }

    } catch (error) {
        console.log(error);
    }
  }
 
  return (
    <Layout>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 m-4">
          <div className="card p-5">
            <h3 className="pb-3">Reset Password</h3>
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputAnswer1" className="form-label">
                  What is your favorite sports?
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Enter new password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  value={newPassword}
                  required
                  autoComplete="off"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
                onClick={handleSubmit}
              >
                Sumbit
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </Layout>
  );
}