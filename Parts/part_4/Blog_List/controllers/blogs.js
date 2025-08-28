const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')
const { SECRET } = require('../utils/config')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const newBlog = request.body
    if (!request.token) {
        return response.status(401).json({ error: 'token missing' })
    }
    const decodedToken = jwt.verify(request.token, SECRET)
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
    if (!request.token) {
        return response.status(401).json({ error: 'token missing' })
    }
    const decodedToken = jwt.verify(request.token, SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const blogUser = await User.findById(decodedToken.id)
    if (!blogUser) {
        return response.status(400).json({ error: 'userId missing or not valid' })
    }
    const blogToBeDeleted = await Blog.findById(request.params.id)
    if (!blogToBeDeleted) {
        return response.status(404).json({ error: '404 Blog not found' })
    }

    console.log(blogToBeDeleted.user.toString(), decodedToken.id)
    if (blogToBeDeleted.user.toString() === decodedToken.id) {
        await blogToBeDeleted.deleteOne()
        response.status(204).end()
    } else {
        return response.status(401).json({ error: 'Unauthorized action' })
    }
})

module.exports = blogsRouter
