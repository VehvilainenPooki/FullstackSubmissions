import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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

        render(<Blog blog={blog}/>)
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
})
