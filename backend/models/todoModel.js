const mongoose = require('mongoose')
const Joi = require('joi')

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
})

const ToDo = new mongoose.model('ToDo', todoSchema)

const validateToDo = (todo) => {
  const schema = {
    text: Joi.string().min(5).max(50).required(),
  }

  return Joi.validate(todo, schema)
}

module.exports = {
  ToDo,
  validate: validateToDo,
}
