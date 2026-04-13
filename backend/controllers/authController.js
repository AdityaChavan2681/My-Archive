const Users = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
  try {
    let check = await Users.findOne({ email: req.body.email });

    if (check) {
      return res.status(400).json({
        success: false,
        errors: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new Users({
      name: req.body.username,
      email: req.body.email,
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
    let user = await Users.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        success: false,
        errors: "Invalid credentials"
      });
    }

    const passCompare = await bcrypt.compare(req.body.password, user.password);

    if (!passCompare) {
      return res.status(400).json({
        success: false,
        errors: "Invalid credentials"
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