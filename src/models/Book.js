const mongoose = require('mongoose')

const Book = mongoose.model('Book', {
  name: String,
  author: String,
  category: String,
  description: String
})

module.exports = Book
