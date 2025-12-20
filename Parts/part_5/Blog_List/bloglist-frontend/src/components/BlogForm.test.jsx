import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

var handleLike = vi.fn()

describe('<BlogForm/>', () => {

    test('BlogForm submits correct form content', async () => {
        const createBlog = vi.fn()
        render(<BlogForm createBlog={createBlog}/>)
        const user = userEvent.setup()

        const inputTitle = screen.getByLabelText('title')
        const inputAuthor = screen.getByLabelText('author')
        const inputURL = screen.getByLabelText('url')
        const createButton = screen.getByText('create')

        await user.type(inputTitle, 'This is a title')
        await user.type(inputAuthor, 'Author name')
        await user.type(inputURL, 'https://this-is-an-url.com')
        await user.click(createButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('This is a title')
        expect(createBlog.mock.calls[0][0].author).toBe('Author name')
        expect(createBlog.mock.calls[0][0].url).toBe('https://this-is-an-url.com')
    })
})
