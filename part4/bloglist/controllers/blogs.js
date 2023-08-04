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

module.exports = blogRouter