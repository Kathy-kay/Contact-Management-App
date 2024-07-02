const nodemailer = require("nodemailer")


const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  service: process.env.SERVICE,
  port: Number(process.env.EMAIL_PORT),
  secure: Boolean(process.env),
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  },
})

const sendVerificationEmail = async (email, verificationToken) =>{
  const verificationUrl = `${process.env.BASE_URL}/api/users/verify-email?token=${verificationToken}`
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Email Verification",
    html: `
    <p>Hello,</p>
    <p>Thank you for registering with our contact management app! To complete your registration and start using our app, please verify your email address by clicking on the link below:</p>
    <p><a href="${verificationUrl}">Verify Email</a></p>
    <p>This link will expire in 24 hours. If you have any issues or concerns, please don't hesitate to reach out to us at <a href="mailto:adigunkafy27@gmail.com">adigunkafy27@gmail.com</a>.</p>
    <p>Best regards,<br>Contact Management Team</p>
  `}

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully')
  } catch (error) {
    console.log(error)
    throw Error
  }
}


module.exports = sendVerificationEmail