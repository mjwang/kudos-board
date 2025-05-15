const kudosBoardData = require('../data/boards.js')

const getBoards = async () => {
  return kudosBoardData
}

const getBoardById = async (id) => {
  return kudosBoardData.find((board) => board.id.toString() === id)
}

const createBoard = async ({ title, category, author }) => {
  const nextId = kudosBoardData.length + 1
  const newBoard = {
    id: nextId,
    title,
    category,
    author,
    cards: [],
  }

  kudosBoardData.push(newBoard)

  return newBoard
}

const updateBoard = async (id, updatedBoardData) => {
  const board = kudosBoardData.find((board) => board.id.toString() === id)

  if (board) {
  }
}

const deleteBoardById = async (id) => {
  kudosBoardData = kudosBoardData.filter((board) => board.id !== parseInt(id))

  return kudosBoardData.some((board) => board.id === parseInt(id))
}

module.exports = {
  createBoard,
  deleteBoardById,
  getBoards,
  getBoardById,
  updateBoard,
}
