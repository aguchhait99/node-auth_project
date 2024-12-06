const express = require('express')
const AuthController = require('../controller/api/authController')
const ImageUpload = require('../helper/imageUpload')


const router = express.Router()


// APIs
router.post('/register/user', ImageUpload.single('image'), AuthController.userRegistration)


module.exports = router