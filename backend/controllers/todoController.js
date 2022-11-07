const asyncHandler = require('express-async-handler')
const { ToDo, validate } = require('../models/todoModel')

// @desc Get all todos
// @route GET /api/todos
// @acess Public
const getToDos = asyncHandler(async (req, res) => {
  const todos = await ToDo.find({})
  res.send(todos)
})

// @desc Fetch single todo
// @route GET /api/todos/:id
// @acess Public
const getToDoById = asyncHandler(async (req, res) => {
  const todo = await ToDo.findById(req.params.id)
  if (!todo) {
    res.status(404)
    throw new Error(`The todo with Id ${req.params.id} was not found.`)
  }

  res.send(todo)
})

// @desc Delete a todo
// @route DELETE /api/todos/:id
// @acess Public
const deleteToDo = asyncHandler(async (req, res) => {
  const todo = await ToDo.findByIdAndRemove(req.params.id)
  if (!todo) {
    res.status(404)
    throw new Error(`The todo with Id ${req.params.id} was not found.`)
  }

  res.send(todo)
})

// @desc Create new todo
// @route POST /api/todos
// @acess Public
const createToDo = asyncHandler(async (req, res) => {
  const { error } = validate(req.body)
  if (error) {
    res.status(400)
    throw new Error(error.details[0].message)
  }

  const newTodo = new ToDo({
    text: req.body.text,
  })

  await newTodo.save()
  res.status(201).send(newTodo)
})

// @desc Update a todo
// @route PUT /api/todos/:id
// @acess Public
const updateTodo = asyncHandler(async (req, res) => {
  const { error } = validate(req.body)
  if (error) {
    res.status(400)
    throw new Error(error.details[0].message)
  }

  let todo = await ToDo.findByIdAndUpdate(
    req.params.id,
    {
      text: req.body.text,
    },
    {
      new: true,
    }
  )

  if (!todo) {
    res.status(404)
    throw new Error(`The todo with Id ${req.params.id} was not found.`)
  }

  res.send(patient)
})

// Exports Here
module.exports = {
  getToDos,
  getToDoById,
  createToDo,
  deleteToDo,
  updateTodo,
}
