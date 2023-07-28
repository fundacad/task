import React, { useState, useEffect } from 'react';
import API from './api';
import { Table } from './table';
import { Form } from './form';
import "./style.css"

function App() {
  const [customers ,setCustomers] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [openform, setopenform] = useState(false);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await API.get('/get-all');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    }

    fetchCustomers();
  }, []);

  const addCustomer = async (newCustomer) => {
    const reqBody = {name: newCustomer.name ,  address: newCustomer.address , mobileNum: newCustomer.mobileNum};
    try {
      const response = await API.post('/add',reqBody);
      if (response.status !== 201) throw new error;
      setCustomers([...customers, response.data]); 
    } catch (error) {
      window.alert("Failed to add customer")
      console.error(error);
    }
  }
  
  const updateCustomer = async (newCustomer) => {
    try {
      const response = await API.put(`/update/${newCustomer._id}`,newCustomer);
      if (response.status !== 200) throw new error;
      setCustomers (customers.map(currentCustomers=> {
        if (currentCustomers._id !== editRow) return currentCustomers;
        return newCustomer; 
      }))

    } catch (error) {
      window.alert("Failed to Edit row")
      console.error(error);
    }
  }

  const deleteCustomer = async (id) => {
    try {
      const response = await API.delete(`/delete/${id}`);
      if (response.status !== 200) throw new error;
      setCustomers (currentCustomers => {
        return currentCustomers.filter(customer => customer._id != id);  
      })
    } catch (error) {
      window.alert("Failed to Delete row");
      console.error(error);
    }
  }

  const handleSubmit = (newCustomer) => {
    editRow === null
    ? addCustomer(newCustomer) 
    : updateCustomer(newCustomer)
  }

  const handleEdit = (id) => {
    setEditRow(id);
    setopenform(true);
  }

  return (
    <>
      <div className='App'>
      {customers.length === 0 && <h1>No Customers Yet</h1>}
      {customers.length > 0 && <Table customers={customers} Delete={deleteCustomer} Edit={handleEdit}/>}
      <button className='btn' onClick={() => setopenform(true)}>ADD</button>
      {openform && <Form closeform = {()=> {setopenform(false);setEditRow(null)}} onSubmit={handleSubmit} 
      defaultvalue={editRow !== null && customers.find((customer) => customer._id===editRow)}/>}
      </div>
    </>
  )
}

export default App
