const express = require('express');
const multer = require('multer')

const router = express.Router();

const productController = require('./../src/controllers/ProductController');
const cartController = require('./../src/controllers/CartController');

// file upload
const uploadFile = multer({
   storage: multer.diskStorage({
      destination: function (req, file, cb) {
         cb(null, "uploads");
      },
      filename: function (req, file, cb) {
         let ext = file.originalname.split('.')[1];
         cb(null, file.fieldname + "-" + Date.now() + "." + ext);
      }
   })
}).single('file');

/** API Route */ 
router.get('/' , (req , res)=> res.status(200).send({ status: true, msg: 'API is running.'}))

/**
 * Products API
 */
router.get('/product', productController.getProduct)
router.post('/product', uploadFile, productController.addProduct)
router.get('/product/:id', productController.getSingleProduct)
router.put('/product/:id', uploadFile, productController.updateProduct)
router.delete('/product/:id', productController.delProduct)

/**
 * Cart API
 */
router.get('/cart', cartController.getAddedCartData)
router.post('/cart', cartController.addToCart)
router.delete('/cart/:cartid/:productid', cartController.deleteCartProduct)
router.get('/cart/:cartid/:productid/:newQty', cartController.addQtyCartProduct)

module.exports = router;