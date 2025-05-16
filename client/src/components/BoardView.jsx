import React from 'react'

export default function BoardView({ boardId, title, author }) {
  return (
    <div className="BoardView">
      <h1>{title}</h1>
      <span>{author}</span>
    </div>
  )
}
