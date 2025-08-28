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
        'blogs': [],
        '_id': '68af6f30e3bd5421ee84dfe7',
        '__v': 0
    },
    {
        'username': 'pentest',
        'passwordHash': '$2b$10$BbWJx2qB04GD0GIXp2Q.8OeSDZ5U1SgIZs85VaNfxUhPLD0Qoiyv6',
        'name': 'Penetration Tester',
        'blogs': [],
        '_id': '68af7c0e3e1ed76e3c5a9f9b',
        '__v': 0
    },
    {
        'username': 'duck',
        'passwordHash': '$2b$10$goK/26.0qtgHayN4PgfIb.GiiiNmHs2/RggtNHbcjxS7eytJqUV6K',
        'name': 'Donald Duck',
        'blogs': [],
        '_id': '68af7e39b94acdc579913b8d',
        '__v': 0
    },
    {
        'username': 'calcato',
        'passwordHash': '$2b$10$SetoZ7UAlLy3M9LId4nxLemBb9.s14wOiS0aDwVNmRVHE6Ra/5pEK',
        'name': 'calcato Maganado',
        'blogs': [],
        '_id': '68af7e63b94acdc579913b8f',
        '__v': 0
    }
]

var newUser = {
    'username': 'testaaja',
    'passwordHash': 'Salainen salaisuus123',
    'name': 'Hyvin Testaa',
}

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

describe('POST api/users', () => {
    beforeEach(async () => {
        newUser = {
            'username': 'testaaja',
            'password': 'Salainen salaisuus123',
            'name': 'Hyvin Testaa',
        }
        await User.deleteMany({})
    })
    test('POST adds user with correct data', async () => {
        const response = await api.post('/api/users').send(newUser).expect(201)
        const user = response.body
        assert.notEqual(user.id,  undefined)
        delete user['id']
        delete user['blogs']
        delete newUser['password']
        assert.strictEqual(toString(user), toString(newUser))

    })

    test('POST with too short username', async () => {
        newUser['username'] = 'js'
        await api.post('/api/users').send(newUser).expect(400)
    })

    test('POST with too short password', async () => {
        newUser['password'] = 'pw'
        await api.post('/api/users').send(newUser).expect(400)
    })

    test('POST without username', async () => {
        delete newUser['username']
        await api.post('/api/users').send(newUser).expect(400)
    })

    test('POST without password', async () => {
        delete newUser['password']
        await api.post('/api/users').send(newUser).expect(400)
    })
})

//describe('DELETE api/users', () => {
//    test('DELETE deletes user with correct id', async () => {
//        await api.delete('/api/users/688613ab2db99f26566b922f').expect(204)
//
//        const response = await api.get('/api/users')
//        assert.strictEqual(response.body.length, 2)
//    })
//
//    test('DELETE returns 204 for a nonexistent user', async () => {
//        await api.delete('/api/users/688613ab2db99f26566b922f').expect(204)
//    })
//})
//
//describe('PUT api/users', () => {
//    test('PUT edits entry with correct input', async () => {
//        await api.put('/api/users/6885c5ed159427e5faeee8ac').send(newUser).expect(204)
//
//        const response = await api.get('/api/users')
//        const user = response.body.find(user => user.id === '6885c5ed159427e5faeee8ac')
//        delete user['id']
//        assert.strictEqual(toString(user), toString(newUser))
//    })
//
//    test('PUT succeeds with empty user (id leads to no user)', async () => {
//        await api.put('/api/users/688613ab2db00f26566b922f').send(newUser).expect(404)
//    })
//
//    test('PUT throws 400 with malformed input', async () => {
//        newUser['url'] = ''
//        await api.put('/api/users/6885c5ed159427e5faeee8ac').send(newUser).expect(400)
//        newUser['url'] = 'TheNewNew'
//    })
//})
//
