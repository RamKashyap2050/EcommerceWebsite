const asyncHandler = require("express-async-handler");
const Users = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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
        res.status(200).json({
          _id: user.id,
          user_name: user.user_name,
          phone: user.phone,
          email: user.email,
          image: user.image,
          token: await generateToken(user.id),
        });
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
console.log(userID, profilePhotoPath)
  if (!profilePhotoPath) {
    return res.status(400).json({ error: "Profile photo is required." });
  }

  try {
    const user = await Users.findById(userID);
    console.log(user)
    // if (!user) {
    //   return res.status(404).json({ error: "User not found." });
    // }

    user.image = profilePhotoPath;
    const updatedUser = await user.save();

    res.status(200).json({
      ...updatedUser._doc,
      token: await generateToken(updatedUser._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

const generateToken = async (id) => {
  return await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { loginUser, registerUser, updateClientProfilePhoto };
