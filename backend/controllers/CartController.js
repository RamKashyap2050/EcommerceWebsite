const asyncHandler = require("express-async-handler");
const Users = require("../models/UserModel");
const Product = require("../models/ProductModel");
const CartModel = require("../models/CartModel");

const setCartItem = asyncHandler(async (req, res) => {
  const { user, product } = req.body;

  const setCartItem = await CartModel.create({
    user,
    product,
  });

  res.status(201).json(setCartItem);
});

const getCartItem = asyncHandler(async (req, res) => {
    const { userID } = req.params;
    console.log(userID)
    
    const getCartItem = await CartModel.find({ user: userID })
    .populate("product", "product_name product_description product_price stock_number images")
    .populate("user", "user_name phone email")
    .select("product user");

    res.status(200).json(getCartItem);
  });
  

module.exports = { getCartItem, setCartItem };
