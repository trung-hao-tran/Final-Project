const express = require('express')
const requireAuth = require('../middleware/requireAuth');
const checkAdmin = require('../middleware/checkAdmin');

// controller functions
const { loginUser,
        signupUser,
        updateUserProfile,
        getAllUsers,
        updateUser,
        deleteUser,
        refresh
    } = require('../controllers/userController')

const router = express.Router()
 
// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// update profile
router.put('/profile', requireAuth, updateUserProfile);


// admin routes
// Get all users
router.get('/admin/users', checkAdmin, getAllUsers);
// Update users
router.put('/admin/user/:userId', checkAdmin, updateUser);
// Delete users
router.delete('/admin/user/:userId', checkAdmin, deleteUser);

router.post('/refresh', refresh);




module.exports = router