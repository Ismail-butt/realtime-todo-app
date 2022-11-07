const morgan = require('morgan')
const cors = require('cors')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const userRoutes = require('./routes/userRoutes')
const todoRoutes = require('./routes/todoRoutes')

// Connect to database
connectDB()

const app = express()

const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

// Added Builtin Middlewares Here
app.use(morgan('dev'))
app.use(express.json())
app.use(cors(corsOptions))

app.use('/api/users', userRoutes)
app.use('/api/todos', todoRoutes)

app.get('/', (req, res) => {
  res.send('App is running...')
})

// Custom Middlewares
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 8000
app.listen(port, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold
  )
)
