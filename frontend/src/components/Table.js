import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const Table = ({ data }) => {

  const [users, setUsers] = useState(data || [])
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/update/${id}`)
  }

  const handleDelete = async (id) => {
    try {
      const response = axios.delete(`http://localhost:5000/deleteUser/${id}`);
      console.log(response);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.log("Error deleting task:", error);
    }

  }

  useEffect(() => {
    if (data) {
      setUsers(data);
    } else {
      fetch('http://localhost:5000')
        .then(response => response.json())
        .then(data => {
          console.log("fetched data:", data)
          setUsers(data)
        })
        .catch(error => console.error('Error:', error));
    }
  }, [])


  return (
    <div>
      <div className=''>
        <div className='d-flex  justify-content-center align-items-center'>
          <div className='w-75 bg-white rounded p-3'>
            <div className="col-md-2 m-3 d-flex flex-wrap justify-content-center align-items-center">
              <NavLink to='/addnewentry' className="btn btn-success btn-sm">Add</NavLink>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>FullName</th>
                  <th>Contact</th>
                  <th>Age</th>
                  <th>Date</th>
                  <th>SlotTime</th>
                  <th>Seats</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={index}>
                      <td>{user._id}</td>
                      <td>{user.fullname}</td>
                      <td>{user.contact}</td>
                      <td>{user.age}</td>
                      <td>{user.date}</td>
                      <td>{user.slottime}</td>
                      <td>{user.seats}</td>
                      <td>{user.location}</td>
                      <td className="action-buttons">
                        <button className="btn btn-sm mx-1" style={{ background: 'black', color: 'white' }} onClick={() => handleClick(user._id)}>Update</button>
                        <button className="btn btn-sm mx-1" style={{ background: 'black', color: 'white' }} onClick={() => handleDelete(user._id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="10">No data available</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
