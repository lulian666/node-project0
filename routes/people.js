const express = require('express')
const router = express.Router()
const { getPeople, createPeople, updatePeople, deletePeople } = require('../controllers/people')

router.get('/', getPeople)

router.post('/', createPeople)

router.put('/:id', updatePeople)

router.delete('/:id', deletePeople)

module.exports = router
