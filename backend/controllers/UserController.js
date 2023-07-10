const asyncHandler = require("express-async-handler");
const Users = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Wishlist = require("../models/WishlistModel");
//Function that enables us to Signup
const registerUser = asyncHandler(async (req, res) => {
  const { user_name, phone, email, password } = req.body;
  //   const image = req.files.image;
  if (!user_name || !phone || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields!");
  }

  const userExists = await Users.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await Users.create({
    user_name,
    phone,
    email,
    password: hashedPassword,
    // image: image,
  });

  if (!user) {
    res.status(400);
    throw new Error("Account not registered");
  }

  // //Welcome Mail in addition
  // var transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: process.env.NODE_MAILER_USER,
  //     pass: process.env.NODE_MAILER_PASS,
  //   },
  // });
  // var mailOptions = {
  //   from: process.env.NODE_MAILER_USER,
  //   to: user.email,
  //   subject: "Welcome to EasyShop",
  //   html: `<html><head><style>h1 {color: #000000;} p {font-size: 18px;}</style></head><body><div style="margin: auto; text-align: center"><h1>Happy to see you ${user.user_name}</h1><br><p style="color: #0000ff;">Thanks for signing up to Farmer Place!</p><br><br><a href="https://localhost:3000/dashboard/">Click Here to get started</a></div></body></html>`,
  // };
  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //   }
  // });

  res.status(201).json({
    _id: user.id,
    user_name: user.user_name,
    phone: user.phone,
    email: user.email,
    // image: user.image,
    token: await generateToken(user.id),
    message: "You are registered",
  });
});

//Function which enables User to Login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const user = await Users.findOne({ email });

  if (user) {
    if (user.AccountStatus == true) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        const userData = {
          _id: user.id,
          user_name: user.user_name,
          phone: user.phone,
          email: user.email,
          image: user.image,
          saved_address: user.saved_address,
          token: await generateToken(user.id),
        };

        const userDataString = JSON.stringify(userData);
        const userDataSizeInBytes = Buffer.byteLength(userDataString, "utf8");

        console.log(`Size of userData: ${userDataSizeInBytes} bytes`);

        res.status(200).json(userData);
      } else {
        res.status(400);
        throw new Error("Incorrect password");
      }
    } else {
      res.status(401);
      throw new Error("User account is blocked");
    }
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const updateClientProfilePhoto = asyncHandler(async (req, res) => {
  const profilePhotoPath = req.files.profilePhoto;
  const userID = req.params.userID;
  console.log("Profile Path", profilePhotoPath);
  if (!profilePhotoPath) {
    return res.status(400).json({ error: "Profile photo is required." });
  }

  // Check image size
  const fileSizeInBytes = profilePhotoPath.size;
  const fileSizeInMB = fileSizeInBytes / (1024 * 1024); // Convert to megabytes

  if (fileSizeInMB > 2) {
    return res
      .status(400)
      .json({ error: "Image size should not exceed 2 MB." });
  }

  try {
    const user = await Users.findById(userID);

    user.image = profilePhotoPath;
    const updatedUser = await user.save();
    console.log("Updated User", updatedUser);
    res.status(200).json({
      ...updatedUser._doc,
      token: await generateToken(updatedUser._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

const updateClientAddress = asyncHandler(async (req, res) => {
  const address = req.body; // Access the address data directly from req.body
  const userID = req.params.userID;

  if (!address) {
    return res.status(400).json({ error: "Address is required." });
  }

  try {
    const user = await Users.findById(userID);

    user.saved_address.push(address);

    const updatedUser = await user.save();
    console.log("updated user with address",updatedUser);

    res.status(200).json({
      ...updatedUser._doc,
      token: await generateToken(updatedUser._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

const removeClientAddress = asyncHandler(async (req, res) => {
  const addressIndex = req.params.addressIndex; 
  const userID = req.params.userID;

  try {
    const user = await Users.findById(userID);

    if (addressIndex < 0 || addressIndex >= user.saved_address.length) {
      return res.status(400).json({ error: "Invalid address index." });
    }

    const removedAddress = user.saved_address.splice(addressIndex, 1); 

    const updatedUser = await user.save();
    console.log("updated user with address", updatedUser);

    res.status(200).json({
      ...updatedUser._doc,
      token: await generateToken(updatedUser._id),
      removedAddress: removedAddress[0], 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});


const addtowishlist = asyncHandler(async (req, res) => {
  const { user, product } = req.body;

  const existingEntry = await Wishlist.findOne({ user, product });

  if (existingEntry) {
    res.status(400).json({ message: "Entry already exists in the wishlist." });
  } else {
    const newEntry = await Wishlist.create({
      user,
      product,
    });
    res.status(201).json(newEntry);
  }
});

const getWishlist = asyncHandler(async (req, res) => {
  const { userID } = req.params;
  console.log(userID);

  const getWishlistItem = await Wishlist.find({ user: userID })
    .populate(
      "product",
      "product_name product_description product_price stock_number images"
    )
    .populate("user", "user_name phone email")
    .select("product user");

  res.status(200).json(getWishlistItem);
});

const removeWishlist = asyncHandler(async (req, res) => {
  const { product, user } = req.params;

  try {
    const wishlistItem = await Wishlist.findOne({
      user: user,
      product: product,
    });

    if (!wishlistItem) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }

    await Wishlist.findByIdAndRemove(wishlistItem._id);

    res.status(200).json({ message: "Wishlist item removed" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const generateToken = async (id) => {
  return await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  loginUser,
  registerUser,
  updateClientProfilePhoto,
  updateClientAddress,
  addtowishlist,
  getWishlist,
  removeWishlist,
  removeClientAddress
};
