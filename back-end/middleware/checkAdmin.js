const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

checkAdmin = async (req, res, next) => {
  // check user type
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)
    req.user = await User.findOne({ _id })

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }

    console.log(req.user)
    if (req.user && req.user.role === 'admin') {
        next(); 
    } else {
        res.status(403).send('Access denied. Admin only.'); 
    }
}

module.exports = checkAdmin;
