const express = require('express')
const router = express.Router()
const { getProducts, getProduct } = require('../controllers/products')

router.get('/', getProducts)

router.get('/:productID', getProduct)

module.exports = router