const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {name, email, password} = req.body

  try {
    const user = await User.signup(name, email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// update profile
function updateUserProfile(req, res) {
  const userId = req.user._id; 
  const updatedData = req.body;

  User.findByIdAndUpdate(userId, updatedData, { new: true })
      .then(user => res.send(user))
      .catch(err => res.status(400).send(err.message));
}



// admin routes

// Get all users
function getAllUsers(req, res) {
  User.find({})
      .then(users => res.send(users))
      .catch(err => res.status(400).send(err.message));
}

// Update users
function updateUser(req, res) {
  const userId = req.params.userId;
  const updatedData = req.body;

  // Use Mongoose to find by ID and update the user with the data from the request body
  User.findByIdAndUpdate(userId, updatedData, { new: true })
      .then(user => res.send(user))
      .catch(err => res.status(400).send(err.message));
}

// Delete users
function deleteUser(req, res) {
  const userId = req.params.userId;

  // Use Mongoose to find by ID and delete the user
  User.findByIdAndDelete(userId)
      .then(() => res.send('User deleted successfully'))
      .catch(err => res.status(400).send(err.message));
}



module.exports = { 
  signupUser,
  loginUser,
  updateUserProfile,
  getAllUsers,
  updateUser,
  deleteUser
}