const express = require('express');
const productsController = require('../product.controller/product.controller'); 
const router = express.Router();
const userController = require('../users.controller/users.contorller'); 
const {addToCart}  = require('../product.controller/product.controller'); 
const orderController=require('../product.controller/product.controller')

router.get('/', userController.verifyToken, productsController.getProducts); 
router.post('/',userController.adminrole , productsController.createProduct); 
router.get('/:id', userController.verifyToken, productsController.getProductById);
router.delete('/:id',userController.adminrole, productsController.deleteProduct);
router.patch('/:id', userController.adminrole, productsController.updateProduct);
router.post('/add-to-cart', addToCart);
router.post('/create-order', userController.verifyToken, orderController.createOrder);



module.exports = router;
