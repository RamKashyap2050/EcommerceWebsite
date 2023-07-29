const asyncHandler = require("express-async-handler");
const Admin = require("../models/AdminModel");
const Users = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Category = require("../models/CategoryModel");
const Product = require("../models/ProductModel");
const sharp = require("sharp");
const CategoryModel = require("../models/CategoryModel");
//Function which enables User to Login
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const admin = await Admin.findOne({ email });
  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.status(200).json({
      _id: admin.id,
      user_name: admin.admin_name,
      phone: admin.phone,
      email: admin.email,
      token: await generateToken(admin.id),
    });
  } else {
    res.status(400);
    throw new Error("Incorrect Admin credentails");
  }
});

const createCategory = asyncHandler(async (req, res) => {
  const { category_name, category_description } = req.body;
  const image = req.files.image;
  console.log(category_description, category_name, image)
  const newCategory = await Category.create({
    category_name,
    category_description,
    image
  });
  res.status(201).json(newCategory);
});

const getCategory = asyncHandler(async (req, res) => {
  const getCategory = await Category.find({});

  res.status(200).json(getCategory);
});

const createProduct = asyncHandler(async (req, res) => {
  const {
    product_name,
    product_description,
    stock_number,
    product_price,
    CategoryID,
  } = req.body;
  console.log(
    product_name,
    product_description,
    product_price,
    stock_number,
    CategoryID
  );

  const file1 = req.files.file1;
  const file2 = req.files.file2;
  const file3 = req.files.file3;

  console.log(file1, file2, file3);

  if (!file1 || !file2 || !file3) {
    res.status(400);
    throw new Error('Please upload all the files!');
  }

  const compressImage = async (file) => {
    const compressedImage = await sharp(file.data)
      .resize(800, 800)
      .jpeg({ quality: 80 })
      .toBuffer();

    return compressedImage;
  };

  const images = [];

  if (file1) {
    const compressedImage = await compressImage(file1);
    images.push({
      data: compressedImage,
    });
  }

  if (file2) {
    const compressedImage = await compressImage(file2);
    images.push({
      data: compressedImage,
    });
  }

  if (file3) {
    const compressedImage = await compressImage(file3);
    images.push({
      data: compressedImage,
    });
  }

  const newProduct = await Product.create({
    product_name,
    product_description,
    product_price,
    stock_number,
    images,
    CategoryID,
  });
  const NewProductString = JSON.stringify(newProduct);
  const userDataSizeInBytes = Buffer.byteLength(NewProductString, "utf8");

  console.log(`Size of New Product: ${userDataSizeInBytes} bytes`);
  res.status(201).json(newProduct);
});

const getProducts = asyncHandler(async(req,res) => {
    const getProducts = await Product.find({})
    const userDataString = JSON.stringify(getProducts);
    const userDataSizeInBytes = Buffer.byteLength(userDataString, "utf8");

    console.log(`Size of userData: ${userDataSizeInBytes} bytes`);


    res.status(200).json(getProducts)
})

const getUsersforAdmin  = asyncHandler(async(req,res) => {
    const getUsersforAdmin = await Users.find({})

    res.status(200).json(getUsersforAdmin)
})



const generateToken = async (id) => {
  return await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = { loginAdmin, createCategory, getCategory, createProduct, getProducts, getUsersforAdmin };
