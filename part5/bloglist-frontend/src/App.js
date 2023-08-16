import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  // blog
  const [blogs, setBlogs] = useState([])

  // login
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const fetchData = async () => {
      const response = await blogService.getAll()
      setBlogs(response)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try{
      const credentials = { username, password }
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      //console.log('user: ', user)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`Welcome back ${user.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }catch(exception) {
      setMessage(`Error ${exception.response.data.error}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }


  const createBlog = async (title, author, url) => {
    try{
      blogFormRef.current.toggleVisibilty()
      const blog = {
        title: title,
        author: author,
        url: url
      }
      const createBlog = await blogService.create(blog)
      createBlog.user = user
      setBlogs(blogs.concat(createBlog))
      setMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }catch (exception){
      setMessage(`Error ${exception.response.data.error}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addLikes = async (id, newBlog) => {
    try{
      await blogService.update(id, newBlog)
      const newBlogs = blogs.map((blog) => {
        if(blog.id === id){
          blog.likes += 1
          console.log(blog.likes)
        }
        return blog
      })
      setBlogs(newBlogs)
    }catch (exception){
      setMessage(`Error ${exception.response.data.error}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const removeBlog = async (id) => {
    try{
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      setMessage('Blog removed')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }catch (exception){
      setMessage(`Error ${exception.response.data.error}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  return (
    <>
      <h1>Blog App</h1>
      <Notification message={message} />
      {!user &&
      <Toggable buttonLabel='log in'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handelPasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </Toggable>
      }
      {user &&
    <>
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Toggable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm handleCreate={createBlog} />
      </Toggable>
      <div>
        {blogs.sort((a,b) => a.likes - b.likes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleLikes={addLikes}
            handleRemove={removeBlog}
          />
        )}
      </div>
    </>
      }
    </>
  )
}

export default App