const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }, // Price
 // Property Name
  description: { type: String, required: true }, // Property Description
  pincode: { type: String, required: true }, // Pincode
  propertyType: { type: String, required: true }, // Property Type (e.g., buy/rent)
  phone: { type: Number, required: true } // Phone Number
});

module.exports = mongoose.model('Property', propertySchema);
