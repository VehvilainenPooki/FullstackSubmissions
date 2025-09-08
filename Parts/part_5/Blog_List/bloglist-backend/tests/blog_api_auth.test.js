const { test, after, describe, before } = require('node:test')
const assert = require('node:assert')
const RandExp = require('randexp')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const User = require('../models/user')
const Blog = require('../models/blog')

const api = supertest(app)

const userSetup = [
    {
        'username': 'Stringer',
        'password': 'Bee of a 123',
        'name': 'StringerLinger.com'
    },
    {
        'username': 'pentest',
        'password': '\\{p0wNEd}',
        'name': 'Penetration Tester'
    },
    {
        'username': 'duck',
        'password': 'MoneyM0neyMoney333',
        'name': 'Donald Duck'
    },
    {
        'username': 'calcato',
        'password': 'asdf1234',
        'name': 'calcato Maganado'
    }
]

let savedUsers = []

let token = ''

before(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    for (const newUser of userSetup) {
        const response = await api.post('/api/users').send(newUser)
        savedUsers.push(response.body)
    }
    token = await api.post('/api/login').send({ 'username': 'calcato', 'password': 'asdf1234' })
})

after( async () => {
    await mongoose.connection.close()
})

const newBlog = () => {
    const blogGen = {
        'title': new RandExp(/[a-z]\w{3,20}/).gen(),
        'author': new RandExp(/[a-z]\w{3,20}/).gen(),
        'url': new RandExp(/[a-z]\w{3,20}/).gen()
    }
    return blogGen
}
describe.only('Authenticated tests:', () => {
    describe('POST api/blogs', () => {
        test('POST adds blog with correct data', async () => {
            const response = await api.post('/api/blogs')
                .set('Authorization', `Bearer ${token.body.token}`)
                .send(newBlog())
                .expect(201)
            const blog = response.body
            assert.equal(blog.user,  savedUsers.find(user => user.username === 'calcato').id)
        })

        test('Blog is found with GET after POST', async () => {
            const response = await api.get('/api/blogs').expect(200)

            assert.strictEqual(response.body.length, 1)
        })

        test('POST fails adding blog with incorrect data', async () => {
            await api.post('/api/blogs')
                .set('Authorization', `Bearer ${token.body.token}`)
                .send({})
                .expect(400)
            await api.post('/api/blogs')
                .set('Authorization', `Bearer ${token.body.token}`)
                .send({ 'title': 'asdf', 'author': 'asdf' })
                .expect(400)
            await api.post('/api/blogs')
                .set('Authorization', `Bearer ${token.body.token}`)
                .send({ 'url': 'asdf', 'author': 'asdf' })
                .expect(400)
        })

        test('Non of the failed Blog POSTs end up into database', async () => {
            const response = await api.get('/api/blogs').expect(200)
            assert.strictEqual(response.body.length, 1)
        })

        test('POST adds blog with correct data', async () => {
            const response = await api.post('/api/blogs')
                .set('Authorization', `Bearer ${token.body.token}`)
                .send(newBlog())
                .expect(201)
            const blog = response.body
            assert.equal(blog.user,  savedUsers.find(user => user.username === 'calcato').id)
        })
    })

    let firstBlog = ''
    describe('PUT api/blogs', () => {
        before(async () => {
            firstBlog = await api.get('/api/blogs')
            firstBlog = firstBlog.body[0]
        })
        test('PUT edits entry with correct input', async () => {
            await api.put(`/api/blogs/${firstBlog.id}`)
                .set('Authorization', `Bearer ${token.body.token}`)
                .send({ 'title': 'changed title' })
                .expect(204)

            const response = await api.get('/api/blogs')
            assert(JSON.stringify(response.body).includes('changed title'))

        })

        test('PUT 404 with empty blog (id leads to no blog)', async () => {
            await api.put('/api/blogs/688613ab2db00f26566b922f')
                .set('Authorization', `Bearer ${token.body.token}`)
                .send({ 'title': 'changed title' })
                .expect(404)
        })

        test('PUT throws 400 with malformed input', async () => {
            await api.put(`/api/blogs/${firstBlog.id}`)
                .set('Authorization', `Bearer ${token.body.token}`)
                .send({ 'url': '' })
                .expect(400)
        })
    })
})
