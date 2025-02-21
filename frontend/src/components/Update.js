import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import { useNavigate, useParams } from 'react-router-dom'

const Update = () => {

    const navigate = useNavigate()

    const {id} = useParams();

    const [fullname, setFullname] = useState('')
    const [contact, setContact] = useState('')
    const [age, setAge] = useState('')
    const [date, setDate] = useState(new Date());
    const [slottime, setSlottime] = useState("");
    const [seats, setSeats] = useState('')
    const [location, setLocation] = useState('')

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedUser = { fullname, contact, age, date, slottime, seats, location };
    
        try {
          const response = await axios.put(`http://localhost:5000/updateUser/${id}`, updatedUser);
          console.log(response);
          navigate('/table');  
      } catch (err) {
          console.error("Error updating user:", err);
      }
      };

    


    useEffect(() => {
      const fetchData = async () =>{
      try {
        const result = await axios.get(`http://localhost:5000/getUser/${id}`);
        const user = result.data;
        setFullname(user.fullname);
        setContact(user.contact);
        setAge(user.age);
        setDate(new Date(user.date)); // Ensure the date is properly formatted
        setSlottime(user.slottime);
        setSeats(user.seats);
        setLocation(user.location);
    } catch (err) {
        console.error("Error fetching user data:", err);
    }
}

fetchData();
       
    },[id])

  return (
    <div>
         <div className="container col-md-8">
              <div className=" p-2 m-2 d-flex flex-wrap justify-content-center align-items-center">
                <div className="form-container">
                  <h6>Update User Details</h6>
                  <form onSubmit={ handleUpdate}>
                    <div className='row m-3 p-2'>
                      <div className="form-group col-md-6">
                        <label className='m-2'>Enter Full Name:</label>
                        <input type="text" name="fullname" placeholder="Enter Full Name" className="form-control" value={fullname} onChange={(e) => {setFullname(e.target.value)}} required/>
                      </div>
        
                      <div className="form-group col-md-6 ">
                        <label className='m-2'>Enter Contact:</label>
                        <input type="text" name="contact" placeholder="Enter Contact" className="form-control"  value={contact} onChange={(e) => {setContact(e.target.value)}} required />
                      </div>
        
                      <div className="form-group col-md-6 ">
                        <label className='m-2'>Enter Age:</label>
                        <input
                          type="text"
                          name="age"
                          placeholder="Enter Age"
                          className="form-control"
                          value={age}
                          onChange={(e) => {setAge(e.target.value)}}
                          required
                        />
                      </div>
        
                      <div className="form-group col-md-6 d-flex flex-wrap justify-content-start align-items-center">
                        <label className='m-2'>Select Date:</label>
                        <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="form-control"
                        required/>
                      </div>
        
                      <div className="form-group col-md-6 ">
                        <label className='m-2'>Select Seats:</label>
                        <input
                          type="text"
                          name="seats"
                          placeholder="Enter Seats"
                          className="form-control"
                          value={seats}
                          onChange={(e) => {setSeats(e.target.value)}}
                          required
                        />
                      </div>
        
                      <div className="form-group col-md-6 ">
                        <label className='m-2'>Enter Location:</label>
                        <input
                          type="text"
                          name="location"
                          placeholder="Enter Location"
                          className="form-control"
                          value={location}
                          onChange={(e) => {setLocation(e.target.value)}}
                          required
                        />
                      </div>
        
                      <div className="form-group">
                        <label className='m-2'>Select Slot Time:</label>
        
                        <input className=' m-1'
                          type="radio"
                          id="morning"
                          name="slottime"
                          value="Morning"
                          checked={slottime === "Morning"}
                          onChange={() => setSlottime('Morning')}
                        
                        />
                        <label className='m-2' htmlFor="morning">Morning</label>
        
                        <input  className=' m-1'
                          type="radio"
                          id="Afternoon"
                          name="slottime"
                          value="Afternoon"
                          checked={slottime === "Afternoon"}
                          onChange={() => setSlottime('Afternoon')}
                        
                        />
                        <label className='m-2' htmlFor="Afternoon">Afternoon</label>
        
                        <input  className=' m-1'
                          type="radio"
                          id="Evening"
                          name="slottime"
                          value="Evening"
                          checked={slottime=== "Evening"}
                          onChange={() => setSlottime('Evening')}
                        
                        />
                        <label className='m-2' htmlFor="Evening">Evening</label>
        
                      </div>
        
                      <div className="form-group">
                        <button type="submit" className="btn btn-primary">Submit</button>
                      </div>
        
                    </div>
                  </form>
                </div>
              </div>
            </div>
    </div>
  )
}

export default Update