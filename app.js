const express = require('express')
const path = require('path')
const mogran = require('morgan')
const app = express()
const { products } = require('./data')
let { people } = require('./data')
// const logger = require('./logger')

app.use(mogran('tiny'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Home Page')
})

app.post('/login', (req, res) => {
    const { name } = req.body
    if (name) {
        return res.status(200).send(`ok. ${name}`)
    }
    res.status(401).send('not ok')
})

app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, people: people })
})

app.post('/api/people', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ success: false, msg: 'Name required.' })
    }
    res.status(201).json({ success: true })
})

app.put('/api/people/:id', (req, res) => {
    const { id } = req.params
    const { name } = req.body
    let person = people.find(person => person.id === Number(id))
    if (!person) {
        return res.status(404).json({ success: false, msg: `Person with id ${id} does not exist.` })
    }
    const newPeople = people.map(person => {
        if (person.id === Number(id)) {
            person.name = name
        }
        return person
    })
    res.status(200).json({ success: true, data: newPeople })
})

app.delete('/api/people/:id', (req, res) => {
    const { id } = req.params
    let person = people.find(person => person.id === Number(id))
    if (!person) {
        return res.status(404).json({ success: false, msg: `Person with id ${id} does not exist.` })
    }
    const newPeople = people.filter(person => person.id !== Number(id))
    res.status(200).json({ success: true, data: newPeople })
})


app.get('/api/products', (req, res) => {
    const { search, limit } = req.query
    let sortedProducts = [...products]

    if (search) {
        sortedProducts = sortedProducts.filter(product => product.name.startsWith(search))
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }
    res.json(sortedProducts)
})

app.get('/api/products/:productID', (req, res) => {
    const { productID } = req.params
    const singleProduct = products.find(product => product.id === Number(productID))
    if (!singleProduct) {
        return res.status(404).send('Product Does Not Exist.')
    }
    res.json(singleProduct)
})

app.all('*', (req, res) => {
    res.status(404).send('Not Found')
})

app.listen(5001, () => {
    console.log('listening...')
})