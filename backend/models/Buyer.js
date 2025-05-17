const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },   // Use String for phone numbers
  pincode: { type: String, required: true },
  propertyType: { type: String, required: true }
});

module.exports = mongoose.model('Buyer', buyerSchema);
