const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        '_id': '6885c50c159427e5faeee8a8',
        'title': 'Popular',
        'author': 'Cool Dude',
        'url': 'CoolPopular.com',
        'likes': 256,
        '__v': 0
    },
    {
        '_id': '6885c5ed159427e5faeee8ac',
        'title': 'Known',
        'author': 'Normal guy',
        'url': 'NormalKnown.com',
        'likes': 128,
        '__v': 0
    },
    {
        '_id': '688613ab2db99f26566b922f',
        'title': 'Unknown',
        'author': 'Niche Andy',
        'url': 'NicheUnknown.com',
        'likes': 64,
        '__v': 0
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    for (const blog of initialBlogs) {
        await new Blog(blog).save()
    }
})

after( async () => {
    await mongoose.connection.close()
})

describe('Test for GET api/blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, 3)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        const titles = response.body.map(blog => blog.title)
        assert(titles.includes('Popular'))
    })

    test('id is id not _id within the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        const ids = response.body.map(blog => blog.id)
        assert(ids.includes('688613ab2db99f26566b922f'))
        await mongoose.connection.close()
    })
})
