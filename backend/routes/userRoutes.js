const express = require('express')
const router = express.Router()
const {
  authUser,
  registerUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require('../controllers/userController')

router.route('/').post(registerUser).get(getUsers)
router.post('/login', authUser)
router.route('/:id').delete(deleteUser).get(getUserById).put(updateUser)

// Export all the routes
module.exports = router
