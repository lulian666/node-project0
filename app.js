const express = require('express')
const path = require('path')
const mogran = require('morgan')
const app = express()
const people = require('./routes/people')
const products = require('./routes/products')
const auth = require('./routes/auth')

// const logger = require('./logger')

app.use(mogran('tiny'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/people', people)
app.use('/api/products', products)
app.use('/login', auth)

app.get('/', (req, res) => {
    res.send('Home Page')
})

app.all('*', (req, res) => {
    res.status(404).send('Not Found')
})

app.listen(5001, () => {
    console.log('listening...')
})