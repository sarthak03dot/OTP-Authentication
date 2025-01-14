const bodyParser = require("body-parser");
const express = require("express");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 5000;

const otpStore = new Map();

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Gmail SMTP server
    port: 587, // Port for secure connection
    secure: false, // Use TLS
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // App-specific password
    },
  });
  

transport.verify((error, success) => {
    if (error) {
      console.error('SMTP connection error:', error);
    } else {
      console.log('SMTP connection successful:', success);
    }
  });

// Generate OTP function
function generateOTP() {
  return crypto.randomInt(100000, 999999).toString();
}

// API to send OTP
app.post("/send-otp", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required!" });
  }

  const otp = generateOTP();
  otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 }); // Expires in 5 minutes

  const mailOption = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
  };

  transport.sendMail(mailOption, (err, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to send OTP." });
    }
    res.status(200).json({ message: "OTP sent Successfully." });
  });
});

// Test route
app.get("/hi", (req, res) => {
  res.send("Hello Baby...");
  console.log(generateOTP());
});

// API to verify OTP
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const record = otpStore.get(email);
  if (!record) {
    return res.status(400).json({ error: "Invalid or expired OTP." });
  }
  if (Date.now() > record.expires) {
    otpStore.delete(email);
    return res.status(400).json({ error: "OTP expired!" });
  }
  if (record.otp !== otp) {
    return res.status(400).json({ error: "Invalid OTP." });
  }

  otpStore.delete(email);
  res.status(200).json({ message: "OTP verified Successfully." });
});

// Start server
app.listen(PORT, () => {
  console.log(`App is listening on PORT: ${PORT}`);
});
