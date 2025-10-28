import { useState, useImperativeHandle } from 'react'

const BlogForm = ({createBlog, ref}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = (event) => {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url
        }
        createBlog(newBlog)
    } 

    const resetFields = () => {
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    useImperativeHandle(ref, () => {
        return { resetFields }
    })

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleCreateBlog}>
                <div>
                    <label>
                        title
                        <input
                            type="text"
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        author
                        <input
                            type="author"
                            value={author}
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        url
                        <input
                            type="url"
                            value={url}
                            onChange={({ target }) => setUrl(target.value)}
                        />
                    </label>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm