const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const checkAdmin = require("../middleware/checkAdmin");

// controller functions
const {
  loginUser,
  signupUser,
  updateUserProfile,
  getAllUsers,
  updateUser,
  deleteUser,
  refresh,
  getUser,
  getAllUsersWithoutPassword,
  addComment,
  addReport,
  payment,
} = require("../controllers/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// update profile
router.put("/profile", requireAuth, updateUserProfile);

// admin routes
// Get all users
router.get("/", getAllUsers);
// Update a user
router.put("/admin/user/:userId", checkAdmin, updateUser);
// Delete users
router.delete("/admin/user/:userId", checkAdmin, deleteUser);

router.post("/refresh", refresh);

// Get a single user (helper function for front-end usage)
router.get("/getuser", getUser);
// Get all user (helper function for front-end usage)
router.get("/getusers/getAllUsers", getAllUsersWithoutPassword);

// Post a comment on a user
router.post("/comment", requireAuth, addComment);

// Post a report on a user
router.post("/report", requireAuth, addReport);

// Payment'
router.post("/payment", requireAuth, payment);

module.exports = router;
