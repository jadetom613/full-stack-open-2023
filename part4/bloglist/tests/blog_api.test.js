const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS', 30000)
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/list_helper')
const Blog = require('../models/blog')

const api = supertest(app)

describe('test Started', () => {
  let token = ''
  let initBlogsLength = 0
  let userId = ''

  beforeEach(async () => {
    await Blog.deleteMany({})
    //api.set('Authorization ' ,`Bearer ${response.body.token}`)
    await Blog.insertMany(helper.initialBlogs)
    const response = await api
      .post('/api/login')
      .send({ username: 'jjai', password: 'secret' })
    token = response.body.token
    initBlogsLength = (await api.get('/api/blogs').set('Authorization' ,`Bearer ${token}`)).body.length
  })

  test.only('4.8 blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization' ,`Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test.only('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization' ,`Bearer ${token}`)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test.only('4.9 id property is within the returned blog object', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization' ,`Bearer ${token}`)
    response.body.map(blog => expect(blog.id).toBeDefined())
  })

  test.only('4.10 blog is created by POST and save in database', async () => {
  //const initBlogsLength = (await api.get('/api/blogs').set('Authorization' ,`Bearer ${token}`)).body.length

    const newBlog = {
      title: 'Test',
      author: 'Jest',
      url: 'https://jestjs.io/',
      likes: 22
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization' ,`Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/blogs')
      .set('Authorization' ,`Bearer ${token}`)
    const titles = response.body.map(blog => blog.title)
    expect(response.body).toHaveLength(initBlogsLength + 1)
    expect(titles).toContain('Test')
  })

  test.only('4.11 verifies that if the likes property is missing', async () => {

    const newBlog = {
      title: 'Test for likes property',
      author: 'Jest',
      url: 'https://jestjs.io/'
    }
    await api
      .post('/api/blogs')
      .set('Authorization' ,`Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs').set('Authorization' ,`Bearer ${token}`)
    const likes = response.body.map(blog => blog.likes)
    expect(response.body).toHaveLength(initBlogsLength + 1)
    expect(likes[initBlogsLength]).toBe(0)
  })

  test.only('4.12 Creating new blog with missing property', async () => {
    const newBlog = {
      author: 'Jest',
      likes: 666
    }
    await api
      .post('/api/blogs')
      .set('Authorization' ,`Bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test.only('4.13 Deleting a single blog post resource', async () => {
    const newBlog = {
      title: 'Test',
      author: 'Jest',
      url: 'https://jestjs.io/',
      likes: 22
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization' ,`Bearer ${token}`)

    await api
      .delete(`/api/blogs/${response.body.id}`)
      .set('Authorization' ,`Bearer ${token}`)
      .expect(204)
  })

  test.only('4.23 Adding new blog without token return 401', async () => {
    const newBlog = {
      title: 'Test',
      author: 'Jest',
      url: 'https://jestjs.io/',
      likes: 22
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})