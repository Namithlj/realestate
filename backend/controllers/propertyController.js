const Property = require('../models/Property');

exports.getAllProperties = async (req, res) => {
  try {
    const props = await Property.find();
    res.json(props);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPropertiesByPincode = async (req, res) => {
  try {
    const { pincode } = req.query;
    const props = await Property.find({ pincode });
    res.json(props);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addProperty = async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.submitBuyRequest = async (req, res) => {
  try {
    const buyerData = req.body;
     res.status(200).json({ message: "Buyer request received successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error processing buyer request" });
  }
};
