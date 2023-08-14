import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
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

  // create new blog
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
      }, 5000);
    }catch(execption) {
      setMessage(`Error ${execption.response.data.error}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000);
      
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try{
      const blog = {
        title: title,
        author: author,
        url: url
      }
      const newBlog = await blogService.create(blog)
      console.log('newBlog: ', newBlog)
      setBlogs(blogs.concat(newBlog))
      setMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }catch (execption){
      setMessage(`Error ${execption.response.data.error}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
  }

  if (user === null){
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={message} />
        <form onSubmit={handleLogin}>
          <div>username: 
          <input 
          value={username}
          name='username'
          onChange={(e) => setUsername(e.target.value)}
          type='text'
          />
          </div>
          <div>password: 
            <input 
            value={password} 
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            />
          </div>
          <button>login</button>
        </form>
      </div>
    )
  }

  return (
    <>
    <h2>blogs</h2>
    <Notification message={message} />
    <div>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </div>

    <div>
    <h2>create new</h2>
    <form onSubmit={handleCreate}>
      <div>title:
      <input
        value={title}
        name='title'
        onChange={(e) => setTitle(e.target.value)}
        type='text'
      />
      </div>
      <div>author:
      <input
        value={author}
        name='author'
        onChange={(e) => setAuthor(e.target.value)}
        type='text'
      />
      </div>
      <div>url:
      <input
        value={url}
        name='url'
        onChange={(e) => setUrl(e.target.value)}
        type='text'
      />
      </div>
      <button>create</button>
    </form>
    </div>

    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
    </>
  )
}

export default App