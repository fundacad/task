const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const port = 3001;


app.post('/validate-mobile-number', async (req, res) => {
    const mobileNumber = req.body.mobileNum;

    try {
      // Using https://numverify.com
      const response = await fetch('http://apilayer.net/api/validate?access_key=cd74fe9cc7b308039005a07c6d2e8538&number='+mobileNumber+'&country_code=&format=1');
      if (!response.ok) throw new Error('Failed to validate mobile number');
      const data = await response.json();

        if (data.valid) {
            const countryCode = data.country_code;
            const countryName = data.country_name;
            const operatorName = data.carrier || 'Unknown Operator';

            res.status(200).json({ countryCode, countryName, operatorName });
        }
        
        else {
            throw new error;
        }

      
    } catch (error) {
      console.error('Error validating mobile number:', error);
      res.status(400).json({ error: 'Invalid number or unable to retrieve details' });
    }
});


app.listen(port, () => {
  console.log(`Microservice server running on port ${port}`);
});
  