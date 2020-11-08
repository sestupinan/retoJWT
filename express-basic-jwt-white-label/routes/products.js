var express = require('express');
var router = express.Router();
var [getProducts, insertProduct, editProduct] = require('../controllers/product');
const auth = require('../lib/utils/auth.js')

/* GET product listing. */
router.get('/', auth.checkToken, async function (req, res, next) {
  if(req.decoded.role.includes("none") || req.decoded.role.includes("seller") || req.decoded.role.includes("owner")){
    const products = await getProducts();
    console.warn('products->', products);
    res.send(products);
  }
  else{
    res.status(403).send({
      success: false,
      message: "Your role is not allowed to access this endpoint.",
  });
  }
});

/**
 * POST product
 */
router.post('/', auth.checkToken, async function (req, res, next) {
  if(req.decoded.role.includes("seller") || req.decoded.role.includes("owner")){
    const newProduct = await insertProduct(req.body);
    console.warn('insert products->', newProduct);
    res.send(newProduct);
  }
  else{
    res.status(403).send({
      success: false,
      message: "Your role is not allowed to access this endpoint.",
  });
  }
});

/**
 * PUT product
 */
router.put('/', auth.checkToken, async function (req, res, next) {
  if(req.decoded.role.includes("owner")){
    const newProduct = await editProduct(req.body);
    console.warn('insert products->', newProduct);
    res.send(newProduct);
  }
  else{
    res.status(403).send({
      success: false,
      message: "Your role is not allowed to access this endpoint.",
  });
  }
});

module.exports = router;
