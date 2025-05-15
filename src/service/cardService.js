const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient()

const getCardsByBoardId = async (id) => {
  const cards = await prisma.card.findMany({
    where: {
      boardId: parseInt(id),
    },
  })
  return cards
}

const upvoteCardById = async (id) => {
  const upvotedCard = await prisma.card.update({
    where: {
      id: parseInt(id),
    },
    data: {
      upvoteCount: {
        increment: 1,
      },
    },
  })

  return upvotedCard
}

const deleteCard = async (id) => {
  const deletedCard = await prisma.card.delete({
    where: {
      id: parseInt(id),
    },
  })

  return deletedCard
}

module.exports = {
  deleteCard,
  getCardsByBoardId,
  upvoteCardById,
}
