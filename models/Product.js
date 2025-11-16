const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: String,
  price: { type: Number, required: true, default: 0 },
  category: String,
  createdAt: { type: Date, default: Date.now }
});


ProductSchema.index({ name: 'text', description: 'text' });


ProductSchema.index({ name: 1 });

module.exports = mongoose.model('Product', ProductSchema);
