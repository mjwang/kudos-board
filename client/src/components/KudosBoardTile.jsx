import React from 'react'

import { Link } from 'react-router-dom'

import { deleteBoard } from '../data/boardClient'

import './KudosBoardTile.css'

export default function KudosBoardTile({
  id,
  title,
  author,
  handleBoardChange,
}) {
  const handleDeleteBoard = () => {
    deleteBoard(id).then(handleBoardChange)
  }

  return (
    <div className="KudosBoardTile">
      <div className="board-details">
        <strong>{title}</strong>
        <span>{author}</span>
      </div>
      <div className="board-image">
        <img src={`https://picsum.photos/id/${id + 162}/198/150`}/>
      </div>
      <div className="board-buttons">
        <Link to={`/boards/${id}`}>
          <button className="view-button">View</button>
        </Link>
        <button className="delete-button" onClick={handleDeleteBoard}>
          Delete
        </button>
      </div>
    </div>
  )
}
