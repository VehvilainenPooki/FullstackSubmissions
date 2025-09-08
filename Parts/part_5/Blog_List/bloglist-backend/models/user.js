const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'Username must be unique'],
        required: [true, 'Username missing'],
        minLength: [3, 'Username is too short (Username must be at least 3 characters long)']
    },
    passwordHash: {
        type: String,
        required: [true, 'Password missing']
    },
    name: {
        type: String,
        required: [ true, 'Name missing']
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'blog'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.passwordHash
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('user', userSchema)
