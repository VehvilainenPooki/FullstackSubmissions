//library import
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
require('dotenv').config()
//module imports
const errorHandler = require('./middleware/error-handler')
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
        const newPerson = new Person({
            name: person.name,
            number: person.number
        })
        newPerson.save().then(savedPerson => {
            console.log("Person saved to database")
            response.json(savedPerson)
        })
    }
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (!person) {
            response.status(404).send({
                error: `Person with id: ${request.params.id} not found.`
            })
        }
        response.json(person)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)