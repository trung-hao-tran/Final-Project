require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const taskRoutes = require('./routes/tasks')
const userRoutes = require('./routes/user')
const bidRoutes = require('./routes/bid')
const messageRoutes = require('./routes/message');
const cors = require('cors')
const bodyParser = require('body-parser');
//express app
const app =express()

// middleware
app.use(cors())
// extend limit
app.use(express.json({limit: '100mb', extended: true}));
app.use(express.urlencoded({limit: '100mb', extended: true}));
app.use(express.text({ limit: '200mb', extended: true }));
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })

// routes
app.use('/api/tasks', taskRoutes)
app.use('/api/user', userRoutes)
app.use('/api/bid', bidRoutes)
app.use('/api/messages', messageRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })