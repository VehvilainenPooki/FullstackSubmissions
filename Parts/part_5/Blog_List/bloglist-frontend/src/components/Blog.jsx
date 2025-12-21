import { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, user="" }) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author}
            {!visible && <button onClick={toggleVisibility}>view</button>}
            {visible && <button onClick={toggleVisibility}>hide</button>}

            {visible && (
                <div>
                    {blog.url}
                    <br/>
                    {blog.likes} <button onClick={handleLike}>like</button>
                    <br/>
                    {blog.user.name}
                    <br/>
                    { user.username === blog.user.username && <button onClick={handleRemove}>remove</button> }
                </div>
            )}
        </div>
    )
}

export default Blog
