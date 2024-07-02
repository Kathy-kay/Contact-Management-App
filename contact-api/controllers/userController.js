const asyncHandler = require("express-async-handler");
const User = require("../models/userModels")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const sendVerificationEmail = require("../utils/emailSender");


const tokenExpiration = Number(process.env.VERIFICATION_TOKEN_EXPIRATION) || 3600000;

//@desc register user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body

    //check if all fields are provided
    if (!username || !email || !password) {
      res.status(400)
      throw new Error("All fields are mandatory")
    }

    //check if user already exist with email
    const userExits = await User.findOne({ email })
    if (userExits) {
      res.status(400)
      throw new Error("User with given email already exist!")
    }

    //hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex")
    const verificationTokenExpires = Date.now() + tokenExpiration
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpires,
      isVerified: false
    })
    console.log(`User created ${newUser}`)

    //send verification email
    await sendVerificationEmail(email, verificationToken)

    //Respond with user data
    if (newUser) {
      res.status(201).json({
        message: "User registered successfully",
        data: {
          _id: newUser._id,
          email: newUser.email,
        }
      })
    } else {
      res.status(500)
      throw new Error("User registration failed")
    }
  } catch (error) {
    console.log(error)
  }

})


//@desc login user
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  //check for if all fields are provided
  if (!email || !password) {
    res.status(400)
    throw new Error("All fields are mandatory")
  }

  const user = await User.findOne({ email })

  if (user && !user.isVerified) {
    res.status(401);
    throw new Error("Email not verified. Please verify your email.");
  }

  //compare the password with  the hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign({
      user: {                       //payload
        username: user.username,
        email: user.email,
        id: user.id
      }
    }, process.env.ACCESS_TOKEN_SECRET, //secret key
      { expiresIn: "1h" }                 //expiry day
    )
    res.status(200).json(accessToken)
    // res.status(200).json({message: "User login successfully"}) 
  }
  else {
    res.status(401)
    throw new Error("email or password is not valid")
  }

})


//@desc email verification
//@route GET /api/users/verify-email
//@access public

const verifyEmail = asyncHandler(async (req, res) =>{
  const {token} = req.query
  const user = await User.findOne({verificationToken: token })
  if(!user){
    res.status(400)
    throw new Error("Invalid token")
  }

  //check if verificationtoken is expired

  if(user.verificationTokenExpires < Date.now()){
    res.status(400)
    throw new Error("Verification has expired")
  }

  user.verificationToken = undefined
  user.isVerified = true;
  user.verificationTokenExpires = undefined
  await user.save()
  res.status(200).json({message: "Email verified successfully!"})
})

//@desc current user
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user)


})


module.exports = { registerUser, loginUser, verifyEmail, currentUser }