const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient()

const getBoards = async () => {
  const boards = await prisma.board.findMany({
    include: {
      cards: true,
    },
  })
  return boards
}

const getBoardById = async (id) => {
  const board = await prisma.board.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      cards: true,
    },
  })
  return board
}

const createBoard = async ({ title, category, author }) => {
  const newBoard = await prisma.board.create({
    data: {
      title,
      category,
      author,
      cards: {
        create: [],
      },
    },
  })

  return newBoard
}

const updateBoard = async (id, updatedBoardData) => {
  const board = await prisma.board.findUnique({
    where: {
      id: parseInt(id),
    },
  })

  if (board) {
    const updatedBoard = await prisma.board.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...board,
        ...updatedBoardData,
      },
    })
    return updatedBoard
  } else {
    return null
  }
}

const deleteBoardById = async (id) => {
  const deletedBoard = await prisma.board.delete({
    where: {
      id: parseInt(id),
    },
  })
  return deletedBoard
}

module.exports = {
  createBoard,
  deleteBoardById,
  getBoards,
  getBoardById,
  updateBoard,
}
