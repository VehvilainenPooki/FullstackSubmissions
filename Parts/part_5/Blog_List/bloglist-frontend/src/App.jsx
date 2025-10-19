import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [notificationMessage, setNotificationMessage] = useState('Blog app')
    const [messageState, setMessageState] = useState('idle')
    const [showBlogForm, setShowBlogForm] = useState(false)

    const State = Object.freeze({
        IDLE: 'idle',
        SUCCESS: 'success',
        ERROR: 'error'
    })

    useEffect(() => { // Get All Blogs
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => { // Retrieve Token From Local Storage
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            setUser(user)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            blogService.setToken(user.token)
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            setUser(user)
            setUsername('')
            setPassword('')
            handleNotifications('successful login', State.SUCCESS)
        } catch(err) {
            if (err.status === 401) {
                handleNotifications('Password or username incorrect', State.ERROR)
            }else {
                handleNotifications(err, State.ERROR)
            }
        }
    }

    const handleNewBlog = async (event) => {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url
        }
        try {
            const response = await blogService.create(newBlog)
            setTitle('')
            setAuthor('')
            setUrl('')
            setBlogs(blogs.concat(response))
            handleNotifications('Blog created successfully', State.SUCCESS)
        } catch(err) {
            if (err.status === 400) {
                handleNotifications('Title or URL missing or invalid', State.ERROR)
            } else {
                handleNotifications(err, State.ERROR)
            }
        }
    }

    const handleNotifications = (notification, state) => {
        setMessageState(state)
        setNotificationMessage(`${notification}`)
        setTimeout(() => {
            setNotificationMessage('Blog app')
            setMessageState(State.IDLE)
        }, 5000)
    }

    const handleShowBlogForm = () => {
        if (showBlogForm) {
            setShowBlogForm(false)
        } else {
            setShowBlogForm(true)
        }
    }

    const loginForm = () => (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        username
                        <input
                            type="text"
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        password
                        <input
                            type="password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </label>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )

    const blogForm = () => (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleNewBlog}>
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

    const blogList = () => (
        <div>
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )

    const loggedInfo = () => (
        <div>
            <p>
                {user.name} logged in
                <button onClick={() => {
                    window.localStorage.removeItem('loggedBlogappUser')
                    setUser(null)
                    handleNotifications('Logged out successfully', State.SUCCESS)
                }}>Logout</button>
            </p>
            {showBlogForm ? (
                <div>
                    {blogForm()}
                    <button onClick={handleShowBlogForm}>cancel</button>
                </div>
            ) : (
                <button onClick={handleShowBlogForm}>create new blog</button>
            )}
            {blogList()}
        </div>
    )

    return (
        <div>
            <Notification message={notificationMessage} messageState={messageState} />
            {!user && loginForm()}
            {user && loggedInfo()}
        </div>
    )
}

export default App
