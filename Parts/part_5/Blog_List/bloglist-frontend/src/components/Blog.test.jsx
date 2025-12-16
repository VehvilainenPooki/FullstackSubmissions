import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('Blog renders by default', () => {
    const blog = {
        title: 'Stringer',
        author: 'Linger',
        url: 'StringerLinger.com',
        likes: 13,
        user: {
            username: 'calcato',
            name: 'calcato Maganado',
            id: '68b044f56cf63b0f040480db'
        }
    }

    render(<Blog blog={blog} />)

    const blogText = screen.getByText('Stringer Linger')
    const hiddenText = screen.queryByText('StringerLinger.com')
    const hiddenLikes = screen.queryByText(13)
    expect(blogText).toBeDefined()
    expect(hiddenText).toBeNull()
    expect(hiddenLikes).toBeNull()
})
