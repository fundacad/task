import React, { useState, useEffect } from 'react';
import "./style.css" 

export const Form = ({closeform , onSubmit , defaultvalue}) => {
    const [newCustomer, setnewCustomer] = useState(defaultvalue || {_id:"",name:"",address:"",mobileNum:""});

    const handleInputChange = (e) => {
      setnewCustomer ({
        ...newCustomer,
        [e.target.id]:  e.target.value
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(newCustomer);
      closeform();
    }

    return <div className='form-container'>
        <div className='form'>
        <form onSubmit={handleSubmit}>
        <div className='form-item'>
          <label htmlFor='name'>name:</label>
          <input type='text' id='name' required value={newCustomer.name} onChange={handleInputChange}/>
        </div>
        <div className='form-item'>
          <label htmlFor='address'>address:</label>
          <input type='text' id='address' required value={newCustomer.address} onChange={handleInputChange}/>
        </div>
        <div className='form-item'>
          <label htmlFor='mobileNum'>mobileNumber:</label>
          <input type='text' id='mobileNum' required value={newCustomer.mobileNum} onChange={handleInputChange}/>
        </div>
        <div className='form-item'>
          <input type='submit' className='btn' value={"Submit"}/> <br></br>
          <button onClick={closeform} className='btn'>Cancel</button>
        </div>
      </form>
        </div>
    </div>
}