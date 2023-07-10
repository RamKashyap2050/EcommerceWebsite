const express = require("express")
const router = express.Router()
const {registerUser, loginUser, updateClientProfilePhoto, updateClientAddress, addtowishlist, getWishlist, removeWishlist, removeClientAddress} = require("../controllers/UserController")
const { setCartItem, getCartItem } = require("../controllers/CartController")

router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/updateprofilephoto/:userID').put(updateClientProfilePhoto)
router.route('/addtocart').post(setCartItem)
router.route('/address/:userID').put(updateClientAddress)
router.route('/addtowishlist').post(addtowishlist)
router.route('/getcart/:userID').get(getCartItem)
router.route('/getwishlist/:userID').get(getWishlist)
router.route('/removewishlist/:user/:product').delete(removeWishlist)
router.route('/removeClientAddress/:userID/:address').delete(removeClientAddress)


module.exports = router