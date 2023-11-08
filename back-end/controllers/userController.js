const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const userId = user._id;
    // create a token
    const token = createToken(user._id);

    res.status(200).json({ userId, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { name, email, password, address, phone } = req.body;

  try {
    const user = await User.signup(name, email, password, address, phone);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update profile
function updateUserProfile(req, res) {
  const userId = req.user._id;
  const updatedData = req.body;

  User.findByIdAndUpdate(userId, updatedData, { new: true })
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send(err.message));
}

// admin routes

// Get all users
function getAllUsers(req, res) {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(400).send(err.message));
}

// Update users
function updateUser(req, res) {
  const userId = req.params.userId;
  const updatedData = req.body;

  // Use Mongoose to find by ID and update the user with the data from the request body
  User.findByIdAndUpdate(userId, updatedData, { new: true })
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send(err.message));
}

// Delete users
function deleteUser(req, res) {
  const userId = req.params.userId;

  // Use Mongoose to find by ID and delete the user
  User.findByIdAndDelete(userId)
    .then(() => res.send("User deleted successfully"))
    .catch((err) => res.status(400).send(err.message));
}

// check authentification saparately
const refresh = async (req, res) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  console.log(authorization);

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    res.status(200).json({ message: "refreshed successfully" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

// get single user information (helper function for front-end)
const getUser = async (req, res) => {
  const userId = req.query.userId;
  console.log("userId", userId);

  User.findById(userId)
    .then((user) => {
      console.log(user);
      res.send({
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
      });
    })
    .catch((err) => res.status(400).send(err.message));
};

// Get all users without the password property (helper function for front-end)
function getAllUsersWithoutPassword(req, res) {
  User.find({}, "-password") // Exclude the 'password' field
    .then((users) => res.send(users))
    .catch((err) => res.status(400).send(err.message));
}

module.exports = {
  signupUser,
  loginUser,
  updateUserProfile,
  getAllUsers,
  updateUser,
  deleteUser,
  refresh,
  getUser,
  getAllUsersWithoutPassword,
};
