const express = require('express')
const router = express.Router()
const {
    registerUser,
    loginUser,
    getUserInfo
} = require('../controllers/userController')
const { authenticate } = require('../middleware/authentication')

router.route('/login')
.post(loginUser)

router.route('/register')
.post(registerUser)

router.route('/info')
.post(authenticate, getUserInfo)

module.exports = router