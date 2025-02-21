const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModal = require('./model/todoschema'); 
require('dotenv').config();

const app = express();

app.use(cors({
  origin : 'http://localhost:3000',
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Error connecting to MongoDB", err));

app.listen(5000, () => {
  console.log("Server is Running on port 5000");
});

// Get all users
app.get('/', async (req, res) => {
  try {
    const users = await UserModal.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
});

// Get a single user by ID
app.get('/getUser/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModal.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err });
  }
});

// Update user by ID
app.put('/updateUser/:id', async (req, res) => {
  const id = req.params.id;
  const { fullname, contact, age, date, slottime, seats, location } = req.body;
  const formattedDate = new Date(date)
  try {
    const updatedUser = await UserModal.findByIdAndUpdate(
      id, 
      { fullname, contact, age, date:formattedDate, slottime, seats, location },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err });
  }
});

// Delete user by ID
app.delete('/deleteUser/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await UserModal.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
});

// Create a new user
app.post('/createUsers', async (req, res) => {
  const { fullname, contact, age, date, slottime, seats, location } = req.body;

  if (!fullname || !contact || !age || !date || !slottime || !seats || !location) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const newUser = new UserModal({
    fullname,
    contact,
    age,
    date,
    seats,
    location,
    slottime,
  });

  try {


   const savedUser = await newUser.save();
   console.log('New user created:', savedUser)

   const users = await UserModal.find();
    res.status(201).json({ message: 'User added successfully', user: users});
  } catch (err) {
    console.log("Error adding user:", err);
    res.status(500).json({ message: 'Error adding user', error: err.message || 'Unknown error'});
  }
});










