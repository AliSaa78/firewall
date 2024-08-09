const express = require('express');
const router = express.Router();
const userController =require('../controllers/userController'); 

router.post('/signUp',userController.SignUp);

router.post('/login',userController.login)

module.exports = router