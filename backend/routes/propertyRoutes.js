const express = require('express');
const router = express.Router();
const {
  getAllProperties,
  getPropertiesByPincode,
  addProperty,
  submitBuyRequest
} = require('../controllers/propertyController');

router.get('/', getAllProperties);
router.get('/search', getPropertiesByPincode);
router.post('/add', addProperty);
router.post('/buy', (req, res, next) => {
  console.log("POST /buy route hit");
  next();
}, submitBuyRequest);

module.exports = router;



