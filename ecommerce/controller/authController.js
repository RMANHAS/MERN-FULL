import userModel from "../model/userModel.js";
// import bcrypt from "bcrypt";
import jwtToken from "jsonwebtoken";
import { comparePassword, hashedPassword } from "../helper/bcryptPass.js";
import dotenv from "dotenv";

//register controller --> which is exported from routes/authRoutes
export const registerController = async (req, res) => {
  try {
    // res.send("register routes working");
    const { name, email, password, gender, address, mobile, answer } = req.body;
    //this is user validation

    switch (true) {
      case !name:
        return res.status(200).send({ messaage: "Name is required" });

      case !email:
        return res.status(200).send({ messaage: "Email is required" });

      case !password:
        return res.status(200).send({ messaage: "Password is required" });

      case !gender:
        return res.status(200).send({ messaage: "gender is required" });

      case !address:
        return res.status(200).send({ messaage: "Address is required" });

      case !mobile:
        return res.status(200).send({ messaage: "Mobile is required" });

      case !answer:
        return res.status(200).send({ messaage: "Answer is required" });
    }

    // this is for hash password

    // const saltRound =10;

    //     const hashedPassword= await bcrypt.hash(password,saltRound)
    //     console.log("password",hashedPassword)
    //     res.send(hashedPassword)
    // res.send({name,email,password,gender,address,mobile,answer})

    const hashPassword = await hashedPassword(password);
    console.log("password", hashPassword);
    // res.send(hashPassword);

    //add new user

    const user = new userModel({
      name,
      email,
      password: hashPassword,
      gender,
      address,
      mobile,
      answer,
    });
    await user.save();
    res.status(201).send({
      success: true,
      message: "user successfully register",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "user is not registered",
      error,
    });
  }
};

// login controller  --> which is exported from routes/authRoutes
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password ){
      return res.status(200).send({ message: "email and password is required" });
      return false
    }
    // if (!password) return res.status(200).send({ message: "password is required" });
    //check user existing
    const user = await userModel.findOne({ email });
    // console.log(user)
    if (!user)
     {
      res
      .status(200)
      .send({success:false,
         message: " you are not registered,Plz register first..." });
         return false
     }
    // res.send({
    //   success:true,
    //   messaage:"login successfully"
    // })

    //check password
    // const match=await bcrypt.compare(password,user.password);
    const match = await comparePassword(password, user.password);
    console.log(match);
    if (!match) {
      res.status(200).send({
        success: false,
        message: "invalid password try again",
      });
      return false
      
    }
    //jwt token
    const token = jwtToken.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    console.log("this is token dear:----", token);

    res.status(200).send({
      success: true,
      message: "login successfull",
      user: {
        _id: user._id,
        name: user.name,
        email:user.email,
        address: user.address,
        mobile: user.mobile,
        gender: user.gender,
        answer: user.answer,
        role: user.role,  
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "user is not registered",
      error,
    });
  }
};

export const testController = (req, res) => {
  res.send("test routes working  ..");
};

//forget password controller

export const forgetpasswordController=async (req,res)=>{
try {
  const {email,answer,newPassword}=req.body
  //validation
  if(!email) return res.status(200).send('email is required')
  if(!answer) return res.status(200).send('answer is required')
  if(!newPassword) return res.status(200).send('newpassword is required')

  const user=await userModel.findOne({email,answer})
  console.log("this is user findone",user)
  if(!user){
    return res.status(404).send({
      success:false,
      message:"wrong email and answer"
    })
    return false
  }
  const hashPassword=await hashedPassword(newPassword)
  // console.log("this is hashed password",hashPassword)


  const userupdate=await userModel.findByIdAndUpdate({_id:user._id},{
    password:hashPassword
   
    })

    console.log("this is new updated password",userupdate)

    res.status(200).send({
      success:true,
      messaage:'Password successfully changed'
  })
} catch (error) {
  res.status(500).send({
    success:false,
    message:"something went wrong"
  })
}
}