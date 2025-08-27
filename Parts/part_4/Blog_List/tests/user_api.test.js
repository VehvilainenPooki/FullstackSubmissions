const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
    {
        'username': 'Stringer',
        'passwordHash': '$2b$10$T.DAVBfVlVKjuBaTxvhl7u5X8V7WZA4KoKxsDh.lS80XhD057rVrG',
        'name': 'StringerLinger.com',
        'notes': [],
        '_id': '68af6f30e3bd5421ee84dfe7',
        '__v': 0
    },
    {
        'username': 'pentest',
        'passwordHash': '$2b$10$BbWJx2qB04GD0GIXp2Q.8OeSDZ5U1SgIZs85VaNfxUhPLD0Qoiyv6',
        'name': 'Penetration Tester',
        'notes': [],
        '_id': '68af7c0e3e1ed76e3c5a9f9b',
        '__v': 0
    },
    {
        'username': 'duck',
        'passwordHash': '$2b$10$goK/26.0qtgHayN4PgfIb.GiiiNmHs2/RggtNHbcjxS7eytJqUV6K',
        'name': 'Donald Duck',
        'notes': [],
        '_id': '68af7e39b94acdc579913b8d',
        '__v': 0
    },
    {
        'username': 'calcato',
        'passwordHash': '$2b$10$SetoZ7UAlLy3M9LId4nxLemBb9.s14wOiS0aDwVNmRVHE6Ra/5pEK',
        'name': 'calcato Maganado',
        'notes': [],
        '_id': '68af7e63b94acdc579913b8f',
        '__v': 0
    }
]

//const newUser = {
//    'username': 'The New Thing',
//    'passwordHash': 'New Guy',
//    'name': 'TheNewNew.com'
//}

beforeEach(async () => {
    await User.deleteMany({})
    for (const user of initialUsers) {
        await new User(user).save()
    }
})

after( async () => {
    await mongoose.connection.close()
})

describe('GET api/users', () => {
    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all users are returned', async () => {
        const response = await api.get('/api/users')

        assert.strictEqual(response.body.length, 4)
    })

    test('a specific user is within the returned users', async () => {
        const response = await api.get('/api/users')

        const names = response.body.map(user => user.name)
        assert(names.includes('Donald Duck'))
    })

    test('id is id not _id within the returned users', async () => {
        const response = await api.get('/api/users')

        const ids = response.body.map(user => user.id)
        assert(ids.includes('68af7e63b94acdc579913b8f'))
    })

    test('passwords arent returned within the returned users', async () => {
        const response = await api.get('/api/users')

        const stringyUsers = JSON.stringify(response.body)
        for (const pwHash of initialUsers.map(user => user.passwordHash)) {
            assert(!stringyUsers.includes(pwHash))
        }
    })
})

//describe('DELETE api/users', () => {
//    test('DELETE deletes blog with correct id', async () => {
//        await api.delete('/api/blogs/688613ab2db99f26566b922f').expect(204)
//
//        const response = await api.get('/api/blogs')
//        assert.strictEqual(response.body.length, 2)
//    })
//
//    test('DELETE returns 204 for a nonexistent blog', async () => {
//        await api.delete('/api/blogs/688613ab2db99f26566b922f').expect(204)
//    })
//})
//
//describe('PUT api/users', () => {
//    test('PUT edits entry with correct input', async () => {
//        await api.put('/api/blogs/6885c5ed159427e5faeee8ac').send(newBlog).expect(204)
//
//        const response = await api.get('/api/blogs')
//        const blog = response.body.find(blog => blog.id === '6885c5ed159427e5faeee8ac')
//        delete blog['id']
//        assert.strictEqual(toString(blog), toString(newBlog))
//    })
//
//    test('PUT succeeds with empty blog (id leads to no blog)', async () => {
//        await api.put('/api/blogs/688613ab2db00f26566b922f').send(newBlog).expect(404)
//    })
//
//    test('PUT throws 400 with malformed input', async () => {
//        newBlog['url'] = ''
//        await api.put('/api/blogs/6885c5ed159427e5faeee8ac').send(newBlog).expect(400)
//        newBlog['url'] = 'TheNewNew'
//    })
//})
//
//describe('POST api/users', () => {
//    beforeEach(async () => {
//        await Blog.deleteMany({})
//    })
//    test('POST adds blog with correct data', async () => {
//        const response = await api.post('/api/blogs').send(newBlog).expect(201)
//        const blog = response.body
//        assert.notEqual(blog.id,  undefined)
//        delete blog['id']
//        assert.strictEqual(toString(blog), toString(newBlog))
//
//    })
//
//    test('POST with no likes field defaults to 0 likes', async () => {
//        delete newBlog['likes']
//        const response = await api.post('/api/blogs').send(newBlog).expect(201)
//        const blog = response.body
//        assert.equal(blog.likes,  0)
//    })
//
//    test('POST without url', async () => {
//        delete newBlog['url']
//        await api.post('/api/blogs').send(newBlog).expect(400)
//    })
//
//    test('POST without title', async () => {
//        delete newBlog['title']
//        newBlog['url'] = 'testing.com'
//        await api.post('/api/blogs').send(newBlog).expect(400)
//    })
//})

