let { people } = require('../data')

const getPeople = (req, res) => {
    res.status(200).json({ success: true, people: people })
}

const createPeople = (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ success: false, msg: 'Name required.' })
    }
    res.status(201).json({ success: true })
}

const updatePeople = (req, res) => {
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
}

const deletePeople = (req, res) => {
    const { id } = req.params
    let person = people.find(person => person.id === Number(id))
    if (!person) {
        return res.status(404).json({ success: false, msg: `Person with id ${id} does not exist.` })
    }
    const newPeople = people.filter(person => person.id !== Number(id))
    res.status(200).json({ success: true, data: newPeople })
}

module.exports = {
    getPeople,
    createPeople,
    updatePeople,
    deletePeople,
}