const Property = require('../models/Property');
const Buyer = require('../models/Buyer');

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
    console.log("Received buyer data:", buyerData);

    const newBuyer = new Buyer(buyerData);
    await newBuyer.save(); // Save to MongoDB

    console.log("Buyer saved to database.");
    res.status(200).json({ message: "Buyer request received successfully!" });
  } catch (error) {
    console.error('Error saving buyer request:', error);
    res.status(500).json({ message: "Error processing buyer request" });
  }
};


