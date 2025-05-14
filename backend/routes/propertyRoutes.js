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
router.post('/buy', submitBuyRequest);

module.exports = router;



