const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')
const { SECRET } = require('../utils/config')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const newBlog = request.body
    const decodedToken = jwt.verify(getTokenFrom(request), SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const blogUser = await User.findById(decodedToken.id)
    if (!blogUser) {
        return response.status(400).json({ error: 'userId missing or not valid' })
    }
    newBlog['user'] =  blogUser.id
    const blog = new Blog(newBlog)

    const savedBlog = await blog.save()
    blogUser.blogs = blogUser.blogs.concat(savedBlog.id)
    await blogUser.save()

    response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
    const result = await Blog.findByIdAndUpdate(
        request.params.id,
        request.body,
        { 'runValidators':true }
    )
    if (!result) {
        return response.status(404).end()
    }
    response.status(204).end()
})

blogsRouter.delete('/:id', async (request, response) => {
    const result = await Blog.findByIdAndDelete(request.params.id)
    if (!result) {
        return response.status(404).end()
    }
    response.status(204).end()
})

module.exports = blogsRouter
