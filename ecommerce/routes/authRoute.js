import express from "express";
import {
  loginController,
  registerController,
  testController,forgetpasswordController
} from "../controller/authController.js";

import { isAdmin, signIn } from "../middleware/authMiddleware.js";

const router = express.Router();

//register route
router.post("/register", registerController);

//login route
router.post("/login", loginController);

//forget password

router.post('/forget-password',forgetpasswordController)

//test middleware routes  here sign is protected  we use where we want to protect the 
router.get("/test", signIn, isAdmin, testController);

//protected routes for auth

router.get('/user-auth',signIn,(req,res)=>{
res.status(200).send({ok:true})
})


// super user routes
router.get('/admin-auth',signIn,isAdmin,(req,res)=>{
  res.status(200).send({ok:true})
  })
  
export default router;

