/* eslint-disable no-useless-return */
/* eslint-disable no-undef */
const router = require('express').Router()
const Book = require('../models/Book')

router.post('/', async (req, res) => {
  const { name, author, category, description } = req.body

  if (!name) {
    res.status(422).json({ error: 'O nome é obrigatório!' })
  }

  const Book = {
    name,
    author,
    category,
    description
  }

  try {
    const books = await Book.find()

    res.status(200).json(books)
  } catch {
    res.status(500).json({ error: err })
  }
})

router.get('/', async (req, res) => {
  try {
    const books = await Book.find()

    res.status(200).json(books)
  } catch {
    res.status(500).json({ error: err })
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const book = await Book.findOne({ _id: id })

    if (!book) {
      res.status(422).json({ message: 'O nome é obrigatório' })
      return
    }
    res.status(200).json(book)
  } catch {
    res.statusCode(500).json({ error: err })
  }
})

router.patch('/:id', async (req, res) => {
  const id = req.params.id

  const { name, author, category, description } = req.body

  const book = {
    name,
    author,
    category,
    description
  }

  try {
    const updatedBook = await Book.updateOne({ _id: id }, book)

    if (updatedBook.matchedCount === 0) {
      res.status(422).json({ message: 'Livro não encontrado' })
    }
    res.status(200).json(book)
  } catch {
    res.status(500).json({ error: err })
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const book = await Book.findOne({ _id: id })

  if (!book) {
    res.status(422).json({ message: 'Livro não encontrado' })
  }

  try {
    await Book.deleteOne({ _id: id })

    res.status(200).json({ message: 'Livro removido com sucesso' })
  } catch (error) {
    res.status(500).json({ error: err })
  }
})
