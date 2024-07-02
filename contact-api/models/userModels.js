const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the username"]
    },
    email:{
      type: String,
      required: [true, "Please enter your email address"],
      unique: [true, "Email already exist"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"]
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationTokenExpires: {
      type: Date,
    },
    verificationToken: {
      type: String
    }
  },{
    timestamps: true,
  }
)

module.exports = mongoose.model("User", userSchema)