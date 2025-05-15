const express = require('express')
const {
  createBoard,
  deleteBoardById,
  getBoards,
  getBoardById,
} = require('../service/boardService')

const boardRoutes = express.Router()

boardRoutes.get('/', async (req, res) => {
  const boards = await getBoards()
  res.json(boards)
})

boardRoutes.get('/:id', async (req, res) => {
  const { id } = req.params

  const board = await getBoardById(id)
  res.status(200).json(board)
})

boardRoutes.post('/', async (req, res) => {
  try {
    const { title, category, author } = req.body

    const newBoard = await createBoard({
      title,
      category,
      author,
    })

    if (newBoard) {
      res.status(201).json(newBoard)
    } else {
      res.status(400).json('No board updated')
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

boardRoutes.patch('/:id', async (req, res) => {
  const { id } = req.params
  const updatedBoardData = req.body

  const board = await getBoardById(id)

  if (!board) {
    res.status(404).send('Board not found')
  } else {
    await updateBoard(id, updatedBoardData)
  }
})

boardRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params

  const deletedBoard = await deleteBoardById(id)

  if (deletedBoard) {
    res.status(204).send(deletedBoard)
  } else {
    res.status(400).send('No board deleted')
  }
})

module.exports = boardRoutes
