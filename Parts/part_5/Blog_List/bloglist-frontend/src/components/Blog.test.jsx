import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

var handleLike = vi.fn()

describe('<Blog />', () => {
    beforeEach(() => {
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
        handleLike = vi.fn()
        render(<Blog blog={blog} handleLike={handleLike}/>)
    })

    test('Blog renders by default', () => {
        const blogText = screen.getByText('Stringer Linger')
        const hiddenUrl = screen.queryByText('StringerLinger.com')
        const hiddenLikes = screen.queryByText(13)
        expect(blogText).toBeDefined()
        expect(hiddenUrl).toBeNull()
        expect(hiddenLikes).toBeNull()
    })

    test('Blog renders stuff behind button', async () => {
        const user = userEvent.setup()
        const toggleButton = screen.getByText('view')
        await user.click(toggleButton)

        const blogText = screen.getByText('Stringer Linger')
        const hiddenUrl = screen.findByText('StringerLinger.com')
        const hiddenLikes = screen.findByText(13)
        expect(blogText).toBeDefined()
        expect(hiddenUrl).toBeDefined()
        expect(hiddenLikes).toBeDefined()
    })

    test('Blog like button works', async () => {
        const user = userEvent.setup()
        const toggleButton = screen.getByText('view')
        await user.click(toggleButton)
        const likeButton = screen.getByText('like')
        expect(handleLike.mock.calls).toHaveLength(0)
        await user.click(likeButton)
        expect(handleLike.mock.calls).toHaveLength(1)
        await user.click(likeButton)
        expect(handleLike.mock.calls).toHaveLength(2)
    })
})
