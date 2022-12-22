const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    const { name } = req.body
    if (name) {
        return res.status(200).send(`ok. ${name}`)
    }
    res.status(401).send('not ok')
})

module.exports = router