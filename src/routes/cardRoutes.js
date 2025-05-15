const express = require('express')
const { deleteCard, upvoteCardById } = require('../service/cardService')

const cardRoutes = express.Router()

cardRoutes.patch('/:id/upvote', async (req, res) => {
  const { id } = req.params

  try {
    const upvotedCard = await upvoteCardById(id)
    return res.status(204).send(upvotedCard.upvoteCount)
  } catch (error) {
    return res.status(500).json({ error: `Unable to upvote card ${id}` })
  }
})

cardRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const deletedCard = await deleteCard(id)

    if (deletedCard) {
      res.status(200).send(deletedCard)
    } else {
      res.status(400).send('No card deleted')
    }
  } catch (error) {
    return res.status(500).json({ error: `Unable to delete card ${id}` })
  }
})

module.exports = cardRoutes
