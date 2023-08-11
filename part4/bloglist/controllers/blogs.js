const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username:1, name: 1 })
  response.json(blogs)
  /**
   *  callback way to do async
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
  */
})

blogRouter.post('/', async (request, response) => {
  const likes = request.body.likes
  // console.log(request.token)
  if(!likes){
    request.body.likes = 0
    //console.log('in If:', request.body)
  }
  const user = request.user
  if(!user){
    response.status(401)
  }
  //console.log(user)
  request.body.user = user.id

  const blog = new Blog(request.body)
  const result = await blog.save()
  // Save the blog id and added to the blog array in user collection
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
  /**
   *  callback way to do async
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
  */
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  console.log('decodefToken: ', decodedToken)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const blog = await Blog.findById(id)
  console.log('blog: ', blog)
  if ( blog.user.toString() === decodedToken.id.toString()) {
    await Blog.deleteOne({ _id: id })
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'unauthorized operation' })
  }
})

blogRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }
  const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true, runValidators: true, context: 'query' })
  response.json(result)
})

module.exports = blogRouter