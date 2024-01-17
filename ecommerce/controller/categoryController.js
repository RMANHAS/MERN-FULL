import slugify from "slugify";

import categoryModel from "../model/CategoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    //validation check
    if (!name) return res.status(200).send({ message: "Name is required!..." });

    //existing category
    let existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category already exist ! ....",
      });
    }
    //adding a new category
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(200).send({
      success: true,
      message: "New category added!...",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while creating a new category ...",
    });
  }
};

export const getCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find();

    res.status(200).send({
      success: true,
      message: "List of Categories",
      categories,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Error while getting the categories",
      error,
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { _id } = req.params;
    await categoryModel.findByIdAndDelete({ _id });
    res.status(200).send({
      success: true,
      message: "deleted successfully",
    });
  } catch (error) {
    res.status(200).send({
      success: false,
      message: "error while deleting a category....",
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { _id } = req.params;
    //  const {name}=req.body.name
    const category = await categoryModel.findByIdAndUpdate(_id, {
      $set: {
        name: req.body.name,
        slug: slugify(req.body.name),
      },
      new: true,
    });
    res.status(200).send({
      success: true,
      message: "category updated successfully ",
      category,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error while update category",
      error,
    });
  }
};

export const singleCategoryController = async (req, res) => {
  try {
    const {_id } = req.params;
    const category = await categoryModel.findOne({ _id});
    res.status(200).send({
      success: true,
      message: "category details.",
      category,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error while getting single category",
      error,
    });
  }
};
