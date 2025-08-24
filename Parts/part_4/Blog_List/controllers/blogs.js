const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('dotenv').config()

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const result = await blog.save()
    response.status(201).json(result)
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
