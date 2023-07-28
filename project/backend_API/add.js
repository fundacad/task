const express = require('express');
const axios = require('axios');
const router = express.Router();
const Customer = require('./schema');


const validationServiceUrl = 'http://localhost:3001/validate-mobile-number';


router.post('/add',async (req, res)=> {
    const data = req.body;
    try {
        const validationResponse = await axios.post(validationServiceUrl, {mobileNum: data.mobileNum});
        if (validationResponse.status === 400) throw new Error();
        else if (data.name === "" || data.name === null) throw new Error();
        else if (data.address === "" || data.address === null) throw new Error();

        const foundCustomer = await Customer.findOne({ mobileNum: data.mobileNum });
        if (foundCustomer) throw new Error("Customer number already present");
        
        const customer = await Customer.create({name: data.name,address: data.address,mobileNum: data.mobileNum});

        res.status(200).json(customer);

    } catch (error) {
        console.error('Error adding customer:', error);
        res.status(400).json({ error: 'Invalid mobile number or unable to add customer' });   
    }
});

module.exports = {router};