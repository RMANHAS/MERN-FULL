import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../model/userModel.js";
//protected routes

export const signIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};
// admin access

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    console.log(user);
    if (user.role !== 1) {
      res.status(401).send({
        success: false,
        message: "unauthorised access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
