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
        'user': '68af6f30e3bd5421ee84dfe7',
        'likes': 256,
        '__v': 0
    },
    {
        '_id': '6885c5ed159427e5faeee8ac',
        'title': 'Known',
        'author': 'Normal guy',
        'url': 'NormalKnown.com',
        'user': '68af6f30e3bd5421ee84dfe7',
        'likes': 128,
        '__v': 0
    },
    {
        '_id': '688613ab2db99f26566b922f',
        'title': 'Unknown',
        'author': 'Niche Andy',
        'url': 'NicheUnknown.com',
        'user': '68af6f30e3bd5421ee84dfe7',
        'likes': 64,
        '__v': 0
    }
]

const newBlog = {
    'title': 'The New Thing',
    'author': 'New Guy',
    'url': 'TheNewNew.com',
    'user': '68af6f30e3bd5421ee84dfe7',
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
    test('DELETE deletes blog with correct id UNAUTH 401', async () => {
        await api.delete('/api/blogs/688613ab2db99f26566b922f').expect(401)

        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, 3)
    })

    test('DELETE returns 204 for a nonexistent blog UNAUTH 401', async () => {
        await api.delete('/api/blogs/688613ab2db99f26566b922f').expect(401)
    })
})

describe('PUT api/blogs', () => {
    test('PUT edits entry with correct input UNAUTH 401', async () => {
        await api.put('/api/blogs/6885c5ed159427e5faeee8ac').send(newBlog).expect(401)

        const response = await api.get('/api/blogs')
        assert((response.body.find(blog => blog.author === 'Normal guy')))
        assert(!(response.body.find(blog => blog.author === 'New Guy')))

    })

    test('PUT succeeds with empty blog (id leads to no blog) UNAUTH 401', async () => {
        await api.put('/api/blogs/688613ab2db00f26566b922f').send(newBlog).expect(401)
    })

    test('PUT throws 400 with malformed input UNAUTH 401', async () => {
        newBlog['url'] = ''
        await api.put('/api/blogs/6885c5ed159427e5faeee8ac').send(newBlog).expect(401)
        newBlog['url'] = 'TheNewNew'
    })
})

describe('POST api/blogs', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
    })
    test('POST adds blog with correct data UNAUTH 401', async () => {
        const response = await api.post('/api/blogs').send(newBlog).expect(401)
        const blog = response.body
        assert.equal(blog.id,  undefined)
    })

    test('POST with no likes field defaults to 0 likes UNAUTH 401', async () => {
        delete newBlog['likes']
        await api.post('/api/blogs').send(newBlog).expect(401)
    })

    test('POST without url UNAUTH 401', async () => {
        delete newBlog['url']
        await api.post('/api/blogs').send(newBlog).expect(401)
    })

    test('POST without title UNAUTH 401', async () => {
        delete newBlog['title']
        newBlog['url'] = 'testing.com'
        await api.post('/api/blogs').send(newBlog).expect(401)
    })
})

