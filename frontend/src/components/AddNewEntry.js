import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddNewEntry = () => {

  const navigate = useNavigate();

  const [fullname, setFullname] = useState('')
  const [contact, setContact] = useState('')
  const [age, setAge] = useState('')
  const [date, setDate] = useState(new Date());
  const [slottime, setSlottime] = useState("");
  const [seats, setSeats] = useState('')
  const [location, setLocation] = useState('')
  const [contactError, setContactError] = useState('');


  const [data, setData] = useState([])

  const handleClick = () => {
    navigate('/table')
  }


  const handdleFullnameChange = (e) => {
    setFullname(e.target.value)

  }
  const handleContactChange = (e) => {
    const value = e.target.value
    setContact(value)

    const phoneRegex = /^[0-9]{10}$/
    if (value && !phoneRegex.test(value)) {
      setContactError('Please enter a valid 10-digit phone number.');
    } else {
      setContactError('');
    }
  }
  const handleAgeChange = (e) => {
    setAge(e.target.value)
  }

  const handleSlottimeChange = (e) => {
    setSlottime(e.target.value)
  }
  const handleSeatsChange = (e) => {
    setSeats(e.target.value)
  }
  const handlelocationChange = (e) => {
    setLocation(e.target.value)
  }



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullname || !contact || !age || !date || !slottime || !seats || !location) {
      alert("All fields are required");
      return;
    }

    const userData = {
      fullname: fullname,
      contact: contact,
      age: age,
      date: date.toISOString().split('T')[0],
      seats: seats,
      location: location,
      slottime: slottime,
    };

    try {
      const response = await axios.post('http://localhost:5000/createUsers', userData);
      console.log('User added successfully', response.data);
      console.log(userData)
      alert("User added successfully");

      fetchData();
    } catch (error) {
      console.log("Error adding user:", error.response ? error.response.data : error.message);
      alert("Error adding user");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000')
      setData(response.data.user);

    } catch (error) {
      alert(error?.message);
      setData([]);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container col-md-8">
      <div className=" p-2 m-2 d-flex flex-wrap justify-content-center align-items-center">
        <div className="form-container">
          <h6>Please Enter the User Details</h6>
          <form onSubmit={handleSubmit}>
            <div className="row m-3 p-2">
              <div className="form-group col-md-6">
                <label className='m-2'>Enter Full Name:</label>
                <input type="text" name="fullname"  placeholder="Enter Full Name" className="form-control" value={fullname} onChange={handdleFullnameChange} required />
              </div>

              <div className="form-group col-md-6">
                <label className='m-2'>Enter Contact:</label>
                <input type="text" name="contact" placeholder="Enter Contact" className="form-control" value={contact} onChange={handleContactChange} required/>
                {contactError && <p className="text-danger">{contactError}</p>}
              </div>

              <div className="form-group col-md-6">
                <label className='m-2'>Enter Age:</label>
                <input type="text" name="age" placeholder="Enter Age" className="form-control" value={age} onChange={handleAgeChange} required/>
              </div>

              <div className="form-group col-md-6  d-flex flex-wrap justify-content-start align-items-center">
                <label className='m-2'>Select Date:</label>
                <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyyy" className="form-control" required />
              </div>

              <div className="form-group col-md-6">
                <label className='m-2'>Enter Seats:</label>
                <input type="text" name="seats" placeholder="Enter Seats" className="form-control" value={seats} onChange={handleSeatsChange} required />
              </div>

              <div className="form-group col-md-6">
                <label className='m-2'>Enter Location:</label>
                <input type="text" name="location" placeholder="Enter Location" className="form-control" value={location} onChange={handlelocationChange} required />
              </div>

              <div className="form-group">
                <label className='m-2'>Select Slot Time:</label>
                <input className='m-1'type="radio"
                  id="morning" name="slottime" value="Morning" checked={slottime === 'Morning'} onChange={handleSlottimeChange} />
                <label htmlFor="morning">Morning</label>

                <input className='m-1'
                  type="radio" id="afternoon" name="slottime" value="Afternoon" checked={slottime === 'Afternoon'} onChange={handleSlottimeChange} />
                <label className='m-2' htmlFor="afternoon">Afternoon</label>

                <input className='m-1'
                  type="radio" id="evening" name="slottime" value="Evening" checked={slottime === 'Evening'} onChange={handleSlottimeChange} />
                <label className='m-2' htmlFor="evening">Evening</label>
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary" onClick={handleClick}>
                  Submit
                </button>
              </div>
            </div>
            <div>{data}</div>
          </form>

        </div>
      </div>

    </div>
  );
};

export default AddNewEntry;
