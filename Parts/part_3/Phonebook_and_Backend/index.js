//library import
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
require('dotenv').config()

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to', url)
mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

//module imports
const errorHandler = require('./middleware/error-handler')
const Person = require('./models/person')
const opts = { runValidators: true };

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
    Person.find({}).then(people =>{
        response.send(
            `<p>Phonebook has info for ${people.length} people</p>\n
            \n
            ${(new Date()).toLocaleString("en-GB", options)}
            `
        )
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
    
})

app.post('/api/persons', (request, response, next) => {
    const newPerson = new Person({
        name: request.body.name,
        number: request.body.number
    })
    newPerson.save()
    .then(savedPerson => {
        console.log("Person saved to database")
        response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndUpdate(request.params.id, {number: request.body.number}, opts)
    .then(result => {
        response.status(204).end()
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
