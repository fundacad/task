const express = require('express');
const axios = require('axios');
const router = express.Router();
const Customer = require('./schema');

const validationServiceUrl = 'http://localhost:3001/validate-mobile-number';

router.put('/update/:id',async (req,res) =>{
    const customerId = req.params.id;
    const data = req.body;
    
    try {
        const validationResponse = await axios.post(validationServiceUrl, {mobileNum: data.mobileNum});
        if (validationResponse.status === 400) throw new Error();
        else if (data.name === "" || data.name === null) throw new Error();
        else if (data.address === "" || data.address === null) throw new Error();
        
        const customerToUpdate = await Customer.findById(customerId);
    
        if (!customerToUpdate) {
          return res.status(404).json({ error: 'Customer not found' });
        }
    
        if (data.name) customerToUpdate.name = data.name;
        if (data.address) customerToUpdate.address = data.address;
        if (data.mobileNum) customerToUpdate.mobileNum = data.mobileNum;
    
        await customerToUpdate.save();
    
        res.status(200).json(customerToUpdate);
      } catch (error) {
        console.error('Error updating customer:', error);
        res.status(400).json({ error: 'Unable to update customer' });
      }
});

module.exports = router;