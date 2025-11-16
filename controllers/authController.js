const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.showRegister = (req, res) => {
  res.render('auth/register');
};

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed });
    await user.save();
   
    req.session.user = { id: user._id, username: user.username };
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.redirect('/register');
  }
};

exports.showLogin = (req, res) => {
  res.render('auth/login');
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.redirect('/login');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.redirect('/login');
    }
    req.session.user = { id: user._id, username: user.username };
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.redirect('/login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) console.error(err);
    res.redirect('/login');
  });
};
