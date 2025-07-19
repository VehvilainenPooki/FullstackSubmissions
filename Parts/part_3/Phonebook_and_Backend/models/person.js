require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

/* Moved to index.js so it is run only once
const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
.then(result => {
    console.log('connected to MongoDB')
})
.catch(error => {
    console.log('error connecting to MongoDB:', error.message)
})
*/

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true

    },
    number: {
        type: String,
        validate:  {
            validator: function(v) {
                return /^\d{2,3}-\d{6,10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number! Phone number must be 2-3 numbers divided by a dash (-) and 6-10 numbers.`
        },
        required: true
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
