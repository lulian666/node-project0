const { products } = require('../data')

const getProducts = (req, res) => {
    const { search, limit } = req.query
    let sortedProducts = [...products]

    if (search) {
        sortedProducts = sortedProducts.filter(product => product.name.startsWith(search))
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }
    res.json(sortedProducts)
}

const getProduct = (req, res) => {
    const { productID } = req.params
    const singleProduct = products.find(product => product.id === Number(productID))
    if (!singleProduct) {
        return res.status(404).send('Product Does Not Exist.')
    }
    res.json(singleProduct)
}

module.exports = { getProducts, getProduct }