const express = require('express');
const userController = require('../users.controller/users.contorller'); 
const router = express.Router();



router.post('/signup', userController.signup);
router.post('/login', userController.logIn);
router.get('/', userController.getAllusers); 
router.get('/:id', userController.getUserById); 
router.delete('/:id', userController.deleteuser); 



module.exports = router;
