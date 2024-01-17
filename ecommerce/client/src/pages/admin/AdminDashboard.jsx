import React from "react";
import Layout from "../../layout/Layout";
import AdminMenu from "./AdminMenu";
import { useAuth } from "../../context/auth";


export default function AdminDashboard() {
 const [auth,setAuth]=useAuth()
  return (
    <Layout>
      <div className="row">
        <div className="col-md-4">
          <AdminMenu />
        </div>
        <div className="col-md-8 mt-4">
          <div className="card p-3 w-75 m-auto" style={{boxShadow:'none', fontFamily:'monospace'}}>
            <h4>Personal Details</h4>
            <hr/>
            <h3>Name:{auth?.user?.name}</h3>
            <h3>E-mail:{auth?.user?.email}</h3>
            <h3>Mobile:{auth?.user?.mobile}</h3>
            <h3>Address:{auth?.user?.address}</h3>
            <h3>Your Favorite sports:{auth?.user?.answer}</h3>
            <hr/>
          </div>
        </div>
      </div>
    </Layout>
  );
}
