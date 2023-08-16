import { useState } from 'react'

const Blog = ({ blog, handleLikes, handleRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisble] = useState(false)

  const toggleVisibilty = () => {
    setVisble(!visible)
  }

  const addLikes = () => {
    const newBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    handleLikes(blog.id, newBlog)
  }

  const removeBlog = () => {
    if(window.confirm(`Do want to delete ${blog.title} from blogs`)){
      handleRemove(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibilty}>{visible ? 'hide' : 'view'}</button>
        {visible &&
      (<>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={addLikes}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div>
          <button onClick={removeBlog}>remove</button>
        </div>
      </>)
        }
      </div>
    </div>
  )
}

export default Blog