const express = require("express");
const router = express.Router();
const { loginAdmin, createCategory, getCategory, createProduct, getProducts, getUsersforAdmin } = require("../controllers/AdminController");

router.route("/login").post(loginAdmin);
router.route("/newcategory").post(createCategory);
router.route("/getcategory").get(getCategory);
router.route("/getProducts").get(getProducts);
router.route("/newproduct").post(createProduct)
router.route("/getusers").get(getUsersforAdmin)
router.route("/getcategories").get(getCategory)
module.exports = router;
