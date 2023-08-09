const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS', 30000)
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/list_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('test Started', () => {

  test('4.8 blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('4.9 id property is within the returned blog object', async () => {
    const response = await api
      .get('/api/blogs')
    response.body.map(blog => expect(blog.id).toBeDefined())
  })
})

test('4.10 blog is created by POST and save in database', async () => {
  const initBlogsLength = (await api.get('/api/blogs')).body.length

  const newBlog = {
    title: 'Test',
    author: 'Jest',
    url: 'https://jestjs.io/',
    likes: 22
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(blog => blog.title)
  expect(response.body).toHaveLength(initBlogsLength + 1)
  expect(titles).toContain('Test')
})

test('4.11 verifies that if the likes property is missing', async () => {
  const initBlogsLength = (await api.get('/api/blogs')).body.length

  const newBlog = {
    title: 'Test for likes property',
    author: 'Jest',
    url: 'https://jestjs.io/'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const likes = response.body.map(blog => blog.likes)
  expect(response.body).toHaveLength(initBlogsLength + 1)
  expect(likes[initBlogsLength]).toBe(0)
})

test('4.12 Creating new blog with missing property', async () => {
  const newBlog = {
    author: 'Jest',
    likes: 666
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('4.13 Deleting a single blog post resource', async () => {
  await api
    .delete('/api/blogs/64cb20fcd8740c539fe61eb5')
    .expect(204)
})

afterAll(async () => {
  await mongoose.connection.close()
})