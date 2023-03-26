const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User, validate } = require('../models/userModel')

// @desc Auth user & get token
// @route POST /api/users/login
// @acess Public
const authUser = asyncHandler(async (req, res) => {
  const { error } = validate(req.body)
  if (error) {
    res.status(400)
    throw new Error(error.details[0].message)
  }

  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc Register a new user
// @route POST /api/users
// @acess Public
const registerUser = asyncHandler(async (req, res) => {
  const { error } = validate(req.body)
  if (error) {
    res.status(400)
    throw new Error(error.details[0].message)
  }

  const { name, email, password } = req.body
  const usersExists = await User.findOne({ email })
  if (usersExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  let newUser = new User({
    name,
    email,
    password: hashedPassword,
  })
  await newUser.save()

  res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    token: generateToken(newUser._id),
  })
})

// @desc Get all users
// @route GET /api/users
// @acess Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).sort('name')
  res.send(users)
})

// @desc Delete users
// @route DELETE /api/users/:id
// @acess Public
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Get user by ID
// @route GET /api/users/:id
// @acess Public
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  res.send(user)
})

// @desc Update user
// @route PUT /api/users/:id
// @acess Public
const updateUser = asyncHandler(async (req, res) => {
  const { error } = validate(req.body)
  if (error) {
    res.status(400)
    throw new Error(error.details[0].message)
  }

  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin || user.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  authUser,
  registerUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
