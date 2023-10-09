const express = require('express')
const checkAdmin = require('../middleware/checkAdmin');

// controller functions
const { loginUser, signupUser } = require('../controllers/userController')

const router = express.Router()
 
// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)


// admin routes
// Update users
router.put('/admin/user/:userId', checkAdmin, updateUser);
// Delete users
router.delete('/admin/user/:userId', checkAdmin, deleteUser);



module.exports = router