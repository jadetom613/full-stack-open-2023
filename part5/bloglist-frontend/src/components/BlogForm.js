import { useState } from 'react'

const BlogForm = ({ handleCreate }) => {
   // create new blog
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    handleCreate(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <>
    <div>
    <h2>create new</h2>
    <form onSubmit={addBlog}>
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
      <button type='submit'>create</button>
    </form>
    </div>
    </>
  )
}

export default BlogForm