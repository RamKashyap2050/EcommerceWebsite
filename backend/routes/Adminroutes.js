const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controllers/AdminController");

router.route("/login").post(loginAdmin);

module.exports = router;
