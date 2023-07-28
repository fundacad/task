const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const uri = "mongodb+srv://appd:aFCN4t6EuOr619wg@app.xzp0rga.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("connected to mongodb");
  } catch (error) {
    console.error(error);
  }
  
}
connect();

const addCustomerAPI = require('./add');
const updateCustomerAPI = require('./update');
const deleteCustomerAPI = require('./delete');
const getAllCustomersAPI = require('./get-all');

const port = 3002;

app.post('/add', addCustomerAPI);
app.put('/update/:id', updateCustomerAPI);
app.delete('/delete/:id', deleteCustomerAPI);
app.get('/get-all', getAllCustomersAPI);


app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
  });
