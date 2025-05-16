import React from 'react'

import { deleteBoard } from '../data/boardClient'

import './KudoBoardTile.css'

export default function KudoBoardTile({
  id,
  title,
  author,
  handleBoardChange,
}) {
  const handleDeleteBoard = () => {
    deleteBoard(id).then(handleBoardChange)
  }

  return (
    <div className="KudoBoardTile">
      <div className="board-details">
        <strong>{title}</strong>
        <span>{author}</span>
      </div>
      <div className="board-buttons">
        <button className="view-button">View</button>
        <button className="delete-button" onClick={handleDeleteBoard}>
          Delete
        </button>
      </div>
    </div>
  )
}
