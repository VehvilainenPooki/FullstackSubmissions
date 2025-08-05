const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('dummy test', () => {
    test('dummy returns one', () => {
        const blogs = []

        const result = listHelper.dummy(blogs)
        assert.strictEqual(result, 1)
    })
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })
})

describe('likes maxing', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        },
        {
            _id: '676234d17f85a422aa71b54a',
            title: 'Considered Harmful Go To Statement',
            author: 'Dijkstra Edsger W.',
            url: '/teaching/reader/Dijkstra68.pdf/https://homepages.cwi.nl/~storm',
            likes: 14,
            __v: 0
        }
    ]

    test('Show blog with most likes', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        assert.strictEqual( JSON.stringify(result), 
            JSON.stringify({
                _id: '676234d17f85a422aa71b54a',
                title: 'Considered Harmful Go To Statement',
                author: 'Dijkstra Edsger W.',
                url: '/teaching/reader/Dijkstra68.pdf/https://homepages.cwi.nl/~storm',
                likes: 14,
                __v: 0
            })
        )
    })
})

