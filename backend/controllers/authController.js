const Users = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

const signup = async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const username = String(req.body.username || req.body.name || "").trim();
    const password = String(req.body.password || "");

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "name, email, and password are required"
      });
    }

    if (username.length < 2) {
      return res.status(400).json({
        success: false,
        error: "name must be at least 2 characters long"
      });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        success: false,
        error: "email must be a valid email address"
      });
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({
        success: false,
        error: `password must be at least ${MIN_PASSWORD_LENGTH} characters long`
      });
    }

    let check = await Users.findOne({ email });

    if (check) {
      return res.status(409).json({
        success: false,
        error: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users({
      name: username,
      email,
      password: hashedPassword,
    });

    await user.save();

    const data = {
      user: {
        id: user.id
      }
    };

    const token = jwt.sign(data, process.env.JWT_SECRET);

    res.json({ success: true, token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "email and password are required"
      });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        success: false,
        error: "email must be a valid email address"
      });
    }

    let user = await Users.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials"
      });
    }

    const passCompare = await bcrypt.compare(password, user.password);

    if (!passCompare) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials"
      });
    }

    const data = {
      user: {
        id: user.id
      }
    };

    const token = jwt.sign(data, process.env.JWT_SECRET);

    res.json({ success: true, token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { signup, login };
