const express = require("express")
const router = express.Router()
const {registerUser, loginUser, updateClientProfilePhoto} = require("../controllers/UserController")
const { setCartItem, getCartItem } = require("../controllers/CartController")

router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/updateprofilephoto/:userID').put(updateClientProfilePhoto)
router.route('/addtocart').post(setCartItem)
router.route('/getcart/:userID').get(getCartItem)

module.exports = router