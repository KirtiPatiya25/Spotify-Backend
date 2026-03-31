const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// 📝 Register user
router.post("/register", authController.registerUser);

// 🔐 Login user
router.post("/login", authController.loginUser);

module.exports = router;