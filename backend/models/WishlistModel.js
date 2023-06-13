const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Products'
  }
}, {
  collection: 'Wishlist',
  timestamp: true
});

module.exports = mongoose.model('Wishlist', wishlistSchema);