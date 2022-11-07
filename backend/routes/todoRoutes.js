const express = require('express')
const router = express.Router()
const {
  getToDos,
  getToDoById,
  createToDo,
  deleteToDo,
  updateTodo,
} = require('../controllers/todoController')

router.route('/').post(createToDo).get(getToDos)
router.route('/:id').delete(deleteToDo).get(getToDoById).put(updateTodo)

module.exports = router
