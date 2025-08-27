const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        message: 'Username missing'

    },
    passwordHash: {
        type: String,
        required: true,
        message: 'Password missing'
    },
    name: {
        type: String,
        required: true,
        message: 'Name missing'
    },
    notes: [
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
