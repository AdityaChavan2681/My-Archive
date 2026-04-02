const Users = require('../models/User');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });

  if (check) {
    return res.status(400).json({
      success: false,
      errors: "existing user found with same email address"
    });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  const data = {
    user: {
      id: user.id
    }
  };

  const token = jwt.sign(data, 'secret_ecom');

  res.json({ success: true, token });
};

const login = async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });

  if (user) {
    const passCompare = req.body.password === user.password;

    if (passCompare) {
      const data = {
        user: {
          id: user.id
        }
      };

      const token = jwt.sign(data, 'secret_ecom');
      res.json({ success: true, token });

    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }

  } else {
    res.json({ success: false, errors: "Wrong Email Id" });
  }
};

module.exports = { signup, login };