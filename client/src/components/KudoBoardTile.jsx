import React from 'react'

import './KudoBoardTile.css'

export default function KudoBoardTile({ title, author }) {
  return (
    <div className="KudoBoardTile">
      <div className="board-details">
        <strong>{title}</strong>
        <span>{author}</span>
      </div>
      <div className="board-buttons">
        <button className="view-button">View</button>
        <button className="delete-button">Delete</button>
      </div>
    </div>
  )
}
