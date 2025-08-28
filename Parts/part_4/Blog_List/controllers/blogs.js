const blogsRouter = require('express').Router()

const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const newBlog = request.body
    if (!request.token) {
        return response.status(401).json({ error: 'token missing' })
    }
    if (!request.user) {
        return response.status(400).json({ error: 'userId missing or not valid' })
    }
    newBlog['user'] =  request.user.id
    const blog = new Blog(newBlog)

    const savedBlog = await blog.save()
    request.user.blogs = request.user.blogs.concat(savedBlog.id)
    await request.user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
    if (!request.token) {
        return response.status(401).json({ error: 'token missing' })
    }
    if (!request.user) {
        return response.status(400).json({ error: 'userId missing or not valid' })
    }
    const blogToBeUpdated = await Blog.findById()
    if (!blogToBeUpdated) {
        return response.status(404).end()
    }
    if (blogToBeUpdated.user.toString() === request.user.id) {
        await blogToBeUpdated.updateOne(
            request.params.id,
            request.body,
            { 'runValidators':true }
        )
        response.status(204).end()
    } else {
        return response.status(401).json({ error: 'Unauthorized action' })
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    if (!request.token) {
        return response.status(401).json({ error: 'token missing' })
    }
    if (!request.user) {
        return response.status(400).json({ error: 'userId missing or not valid' })
    }
    const blogToBeDeleted = await Blog.findById(request.params.id)
    if (!blogToBeDeleted) {
        return response.status(404).json({ error: '404 Blog not found' })
    }
    if (blogToBeDeleted.user.toString() === request.user.id) {
        await blogToBeDeleted.deleteOne()
        response.status(204).end()
    } else {
        return response.status(401).json({ error: 'Unauthorized action' })
    }
})

module.exports = blogsRouter
