import express from "express";
import { createProductController,getProductController, singleProductController,getProductPhotoController, deleteProductController, UpdateProductController } from "../controller/productController.js";
import formidable from 'express-formidable' //this is a middleware

// import { signIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add-product",formidable (),createProductController);
router.get("/product",getProductController);
router.get("/single-product/:_id",formidable (),singleProductController);

//get photo controller
router.get('/product-photo/:_id',formidable (),getProductPhotoController)

//delete controller
router.delete('/delete-product/:_id',deleteProductController)

//update controller
router.put('/update-product/:_id',formidable(),UpdateProductController)

export default router;
