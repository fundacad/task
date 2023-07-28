const express = require('express');
const router = express.Router();
const Customer = require('./schema');


router.get('/get-all', async (req, res) => {
  try {
    const allCustomers = await Customer.find();

    res.status(200).json(allCustomers);
  } catch (error) {
    console.error('Error retrieving customers:', error);
    res.status(500).json({ error: 'Unable to retrieve customers' });
  }
});

module.exports = router;