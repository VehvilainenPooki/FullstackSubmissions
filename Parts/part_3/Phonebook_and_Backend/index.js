const cors = require('cors')
const morgan = require('morgan')
const express = require('express')

require('dotenv').config()
const Person = require('./models/person')

const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
morgan.token('body', request => {
  return request.body && Object.keys(request.body).length > 0
    ? JSON.stringify(request.body)
    : '';
})
app.use(morgan(':method :url :status :body'))

let persons = [
    { 
        "id": "1",
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": "2",
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": "3",
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": "4",
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const options = {
        timeStyle: "full",
        dateStyle: "full"
    };
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>\n
        \n
        ${(new Date()).toLocaleString("en-GB", options)}
        `
    )
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })

})

app.post('/api/persons', (request, response) => {
    const person = request.body
    if (!person || Object.keys(person).toString() != "name,number") {
        response.status(400).send({
            error: "Malformed request body."
        })
    } else if (person.name == "" || person.number == "") {
        response.status(400).send({
            error: "Name or number is undefined"
        })
    } else {
        if (persons.find(p => p.name == person.name)) {
            response.status(409).send({
                error: `${person.name} already exists in phonebook.`
            })
        } else {
            person.id = Math.floor(Math.random() * 9999)
            persons.push(person)
            response.json(persons)
        }
    }
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
    if (!person) {
        response.status(404).send({
            error: `Person with id: ${id} not found.`
        })
    }

    response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id == id)
    if (!person) {
        response.status(404).send({
            error: `person with id: ${id} not found.`
        })
    }
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)