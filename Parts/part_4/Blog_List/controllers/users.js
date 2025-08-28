const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { SALT_ROUNDS } = require('../utils/config')

usersRouter.get('/', async (request, response) => {
    const blogs = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
    response.json(blogs)
})

usersRouter.post('/', async (request, response) => {
    const { username, password, name } = await request.body
    if (!password) {
        return response.status(400).json({
            error: 'user validation failed: password: Password missing'
        })
    } else if (password.length < 3) {
        return response.status(400).json({
            error: 'user validation failed: password: Password is too short (Password must be at least 3 characters long)'
        })
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    const user = new User({ username, passwordHash, name })

    const result = await user.save()
    response.status(201).json(result)
})

//usersRouter.put('/:id', async (request, response) => {
//    const result = await User.findByIdAndUpdate(
//        request.params.id,
//        request.body,
//        { 'runValidators':true }
//    )
//    if (!result) {
//        return response.status(404).end()
//    }
//    response.status(204).end()
//})
//
//usersRouter.delete('/:id', async (request, response) => {
//    const result = await User.findByIdAndDelete(request.params.id)
//    if (!result) {
//        return response.status(404).end()
//    }
//    response.status(204).end()
//})

module.exports = usersRouter
