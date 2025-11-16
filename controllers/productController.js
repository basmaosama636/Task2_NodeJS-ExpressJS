const Product = require('../models/Product');

exports.index = async (req, res) => {
  try {
    const { q } = req.query;
    let products;
    if (q) {
  
      products = await Product.find({ $text: { $search: q } }).sort({ createdAt: -1 });
    } else {
      products = await Product.find().sort({ createdAt: -1 });
    }
    res.render('products/list', { products, q: q || '' });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
};

exports.showNewForm = (req, res) => {
  res.render('products/new');
};

exports.create = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    await Product.create({ name, description, price, category });
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.redirect('/products');
  }
};

exports.show = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.redirect('/products');
    res.render('products/show', { product });
  } catch (err) {
    console.error(err);
    res.redirect('/products');
  }
};

exports.showEditForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.redirect('/products');
    res.render('products/edit', { product });
  } catch (err) {
    console.error(err);
    res.redirect('/products');
  }
};

exports.update = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { name, description, price, category }, { new: true });
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.redirect('/products');
  }
};

exports.delete = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.redirect('/products');
  }
};
