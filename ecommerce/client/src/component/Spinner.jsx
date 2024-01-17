import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Spinner() {
    const [count,setCount] =useState(5)
    const navigate=useNavigate()
    const location=useLocation()
    useEffect(()=>{
       const interval= setInterval(()=>{
setCount((preValuse)=>preValuse-1)
        },1000)
        count===0 && navigate('/login',{
            state:location.pathname
        })
        return  ()=>clearInterval(interval)
    },[count,navigate,location])
  return (
    <div>
       <div className="d-flex justify-content-center align-items-center" style={{height:'1000vh'}}>
        <h3 text-center>redirecting to you  in {count} second</h3>
  <div className="spinner-border" role="status">
    <span className="visually-hidden">
        Loading...
        </span>
  </div>
</div>

    </div>
  )
}
