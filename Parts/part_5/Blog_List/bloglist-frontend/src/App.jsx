import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notificationMessage, setNotificationMessage] = useState('Blog app')
    const [messageState, setMessageState] = useState('idle')

    const blogToggleRef = useRef()
    const blogFormRef = useRef()

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

    const handleNewBlog = async (newBlog) => {
        try {
            const response = await blogService.create(newBlog)
            setBlogs(blogs.concat(response))
            handleNotifications('Blog created successfully', State.SUCCESS)
            blogToggleRef.current.toggleVisibility()
            blogFormRef.current.resetFields()
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

    const loginForm = () => (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        username
                        <input
                            type="text"
                            autoComplete='username'
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
                            autoComplete='current-password'
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </label>
                </div>
                <button type="submit">login</button>
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
            <Togglable buttonLabel="create new blog" ref={blogToggleRef}>
                <BlogForm createBlog={handleNewBlog} ref={blogFormRef}/>
            </Togglable>
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
