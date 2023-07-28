import React, { useState, useEffect } from 'react';
import "./style.css"

export const Table = ({customers ,Delete ,Edit}) => {
    return <>
        <div className='table-wraper'>
        <table className='table'>
            <thead>
                <tr>
                    <th>name</th>
                    <th>address</th>
                    <th>mobileNumber</th>
                    <th></th><th></th>
                </tr>
            </thead>
            <tbody>
                {customers.map(customer => {
                    return (
                    <tr key={customer._id}>
                        <td>{customer.name}</td><td>{customer.address}</td><td>{customer.mobileNum}</td>
                        <td><button className='btn' onClick={() => Edit(customer._id)}>edit</button></td><td><button className='btn' onClick={() => Delete(customer._id)}>delete</button></td>
                    </tr>
                    )
                })}
            </tbody>
      </table>
      </div>
    </>
}