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

const newBlog = {
    'title': 'The New Thing',
    'author': 'New Guy',
    'url': 'TheNewNew.com',
    'likes': 512,
}

beforeEach(async () => {
    await Blog.deleteMany({})
    for (const blog of initialBlogs) {
        await new Blog(blog).save()
    }
})

after( async () => {
    await mongoose.connection.close()
})

describe('GET api/blogs', () => {
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
    })
})

describe('DELETE api/blogs', () => {
    test('DELETE deletes blog with correct id', async () => {
        await api.delete('/api/blogs/688613ab2db99f26566b922f').expect(204)

        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, 2)
    })

    test('DELETE returns 204 for a nonexistent blog', async () => {
        await api.delete('/api/blogs/688613ab2db99f26566b922f').expect(204)
    })
})

describe('PUT api/blogs', () => {
    test('PUT edits entry with correct input', async () => {
        await api.put('/api/blogs/6885c5ed159427e5faeee8ac').send(newBlog).expect(204)

        const response = await api.get('/api/blogs')
        const blog = response.body.find(blog => blog.id === '6885c5ed159427e5faeee8ac')
        delete blog['id']
        assert.strictEqual(toString(blog), toString(newBlog))
    })

    test('PUT succeeds with empty blog (id leads to no blog)', async () => {
        await api.put('/api/blogs/688613ab2db00f26566b922f').send(newBlog).expect(404)
    })

    test('PUT throws 400 with malformed input', async () => {
        newBlog['url'] = ''
        await api.put('/api/blogs/6885c5ed159427e5faeee8ac').send(newBlog).expect(400)
        newBlog['url'] = 'TheNewNew'
    })
})

describe('POST api/blogs', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
    })
    test('POST adds blog with correct data', async () => {
        const response = await api.post('/api/blogs').send(newBlog).expect(201)
        const blog = response.body
        assert.notEqual(blog.id,  undefined)
        delete blog['id']
        assert.strictEqual(toString(blog), toString(newBlog))

    })

    test('POST with no likes field defaults to 0 likes', async () => {
        delete newBlog['likes']
        const response = await api.post('/api/blogs').send(newBlog).expect(201)
        const blog = response.body
        assert.equal(blog.likes,  0)
    })

    test('POST without url', async () => {
        delete newBlog['url']
        await api.post('/api/blogs').send(newBlog).expect(400)
    })

    test('POST without title', async () => {
        delete newBlog['title']
        newBlog['url'] = 'testing.com'
        await api.post('/api/blogs').send(newBlog).expect(400)
    })
})

