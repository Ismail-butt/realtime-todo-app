const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 155,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
})

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = new mongoose.model('User', userSchema)

const validateUser = (user) => {
  const schema = {
    name: Joi.string().min(5).max(50),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  }

  return Joi.validate(user, schema)
}

module.exports = {
  User,
  validate: validateUser,
}
