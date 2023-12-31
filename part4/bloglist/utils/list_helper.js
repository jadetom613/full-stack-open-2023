const lodash = require('lodash')
const User = require('../models/user')
const dummy = (blogs) => {
  if(blogs){
    return 1
  }
}

const  initialBlogs = [
  {
    'title': 'Blog1',
    'author': 'jade tam',
    'url': 'https://www.google.com.hk/',
    'likes': 3,
    'userId': '64d3520891ce4787a3495c24'
  },
  {
    'title': 'Blog2',
    'author': 'jade tam',
    'url': 'https://www.google.com.hk/',
    'likes': 3,
    'userId': '64d3520891ce4787a3495c24'
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const totalLikes = (blogs) => {
  if( blogs.length === 0 ){
    return 0
  }else{
    return blogs.reduce((totalLikes, blog) => {
      return totalLikes += Number(blog.likes)
    }, 0)
  }
}

const favouriteBlog = (blogs) => {
  const mostLiked = blogs.reduce((prev, curr) => {
    return prev.likes > curr.likes ? prev : curr
  })
  const blogObject = {
    'author': mostLiked.author,
    'likes': mostLiked.likes,
    'title': mostLiked.title
  }
  return blogObject
}

const mostBlogs = (blogs) => {
  const authorList = lodash.countBy(blogs, 'author')
  console.log('authorList: ', authorList)
  const mostAuthor = Object.keys(authorList).reduce((prev, curr) => {
    return authorList[prev] > authorList[curr] ? prev : curr
  })
  const mostBlogs = {
    author: mostAuthor,
    blogs: authorList[mostAuthor]
  }

  return mostBlogs
}

const mostLikes = (blogs) => {
  /**
   * const groupByAuthor
   * _.groupBy(blogs, 'author')
   * {
   *  author1:[{},{}],
   *  author2:[{},{}],
   *  author3:[{},{},{}]
   * }
   *
   * map Author with sum of likes
   * _.mapValue(groupByAuthor, (callback))
   *
   * callback -> Sum of likes groupby author
   * author1.reduce
   * author2.reduce
   * author3.reduce
   *
   * groupByAuthorAndLikes = {author1:sumOfLikes, author2:sumOfLikes, author3:sumOflIkes}
   * */
  const groupByAuthorAndLikes = lodash.mapValues(lodash.groupBy(blogs, 'author'), (author) => author.reduce((likes, blog) => likes += blog.likes,0))
  const favAuthor = Object.keys(groupByAuthorAndLikes).reduce((prev, curr) => {
    return groupByAuthorAndLikes[prev] > groupByAuthorAndLikes[curr] ? prev : curr
  })
  const mostLikes = {
    author: favAuthor,
    likes: groupByAuthorAndLikes[favAuthor]
  }
  return mostLikes
}

module.exports = {
  dummy,
  initialBlogs,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
  usersInDb
}