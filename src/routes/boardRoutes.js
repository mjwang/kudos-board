const express = require('express')
const {
  addCard,
  createBoard,
  deleteBoardById,
  getBoards,
  getBoardById,
  updateBoard,
} = require('../service/boardService')
const { getCardsByBoardId } = require('../service/cardService')

const boardRoutes = express.Router()

boardRoutes.get('/', async (req, res) => {
  try {
    const boards = await getBoards()
    res.json(boards)
  } catch (error) {
    res.status(500).json({ error: `Unable to get all boards` })
  }
})

boardRoutes.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const board = await getBoardById(id)
    if (board) {
      res.status(200).json(board)
    } else {
      res.status(404).json('No board found')
    }
  } catch (error) {
    res.status(500).json({ error: `Unable to get board ${id}` })
  }
})

boardRoutes.get('/:id/cards', async (req, res) => {
  const { id } = req.params

  try {
    const cards = await getCardsByBoardId(id)
    res.status(200).json(cards)
  } catch (error) {
    res.status(500).json({ error: `Unable to get cards for board ${id}` })
  }
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
    res.status(500).json({ error: `Unable to create board` })
  }
})

boardRoutes.post('/:id/cards', async (req, res) => {
  const { id } = req.params

  try {
    const cardData = req.body

    const newCard = await addCard(id, cardData)
    res.status(201).json(newCard)
  } catch (error) {
    return res.status(500).json({ error: `Unable to add card to board ${id}` })
  }
})

boardRoutes.patch('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const updatedBoardData = req.body

    const updatedBoard = await updateBoard(id, updatedBoardData)

    if (!updatedBoard) {
      res.status(404).send('Board not found')
    } else {
      res.status(200).send(updatedBoard)
    }
  } catch (error) {
    return res.status(500).json({ error: `Unable to update board ${id}` })
  }
})

boardRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const deletedBoard = await deleteBoardById(id)

    if (deletedBoard) {
      res.status(200).send(deletedBoard)
    } else {
      res.status(400).send('No board deleted')
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: `Unable to delete board ${id}` })
  }
})

module.exports = boardRoutes
