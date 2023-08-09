const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
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
  if(!likes){
    request.body.likes = 0
    //console.log('in If:', request.body)
  }
  const blog = new Blog(request.body)
  const result = await blog.save()
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
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
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