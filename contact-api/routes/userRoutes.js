const express = require("express");
const { registerUser, loginUser, currentUser, verifyEmail } = require("../controllers/userController");
const validationToken = require("../middleware/validateToken");
const router = express.Router()

router.post('/register', registerUser);

router.post('/login', loginUser)
router.get("/verify-email", verifyEmail)
router.get("/current", validationToken, currentUser)
  


module.exports = router