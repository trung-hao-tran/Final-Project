const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  credit: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: "",
  },
  report: [
    {
      description: String,
      violation: {
        type: String,
        enum: ["inappropriate action", "sensitive content"],
      },
      userId: String,
    }
  ],
  comments: [
      {
      userId: String,
      taskId: String,
      rating: Number,
      comment: String,
      time: Date,
      }
    ]
})

// static signup method
userSchema.statics.signup = async function (name, email, password, address, phone, role) {

  // validation
  if (!name || !email || !password || !address || !phone) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ name, email, password: hash, address, phone, role })

  return user
}

// static login method
userSchema.statics.login = async function (email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

// check if user is admin
userSchema.methods.isAdmin = function () {
  return this.role === 'admin'
}

module.exports = mongoose.model('User', userSchema)