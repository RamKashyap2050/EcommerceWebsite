const express = require("express")
const router = express.Router()
const {registerUser, loginUser, updateClientProfilePhoto} = require("../controllers/UserController")

router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/updateprofilephoto/:userID').put(updateClientProfilePhoto)

module.exports = router