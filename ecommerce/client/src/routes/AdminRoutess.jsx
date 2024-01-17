import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import Spinner from "../component/Spinner";
import { Outlet } from "react-router-dom";

export default function AdminRoutess(){
    const [ok,setOk]=useState(false)

    const [auth,setAuth]=useAuth()

    useEffect(()=>{
        const authCheck=async()=>{
            const res=await axios.get(`http://localhost:5500/api/v1/admin-auth`

            //we declared axios globbaly -->go to file contex->auth.jsx to see globally
        //    , {
        //         headers:{
        //             "Authorization":auth?.token
        //         }
        //     }
            )
            if(res.data.ok){
                setOk(true)
            }
            else{
                setOk(false)
            }
        }
        if(auth?.token) authCheck()
    },[auth?.token])

    return ok ? <Outlet/>: <Spinner/>;

}