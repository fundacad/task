
const express = require('express');
const router = express.Router();
const Customer = require('./schema');


router.delete('/delete/:id', async (req, res) => {
  const customerId = req.params.id;

  try {
    const deletedCustomer = await Customer.findOneAndDelete({ _id: customerId });
    if (!deletedCustomer) throw new Error(); 
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(400).json({ error: 'Unable to delete customer' });
  }
});

module.exports = router;