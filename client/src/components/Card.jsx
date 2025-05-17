import React, { useCallback, useState } from 'react'

import { deleteCard, upvoteCard } from '../data/boardClient'

import './Card.css'

export default function Card({
  id,
  title,
  message,
  author,
  upvotes,
  gifUrl,
  handleReload,
}) {
  const [numUpvotes, setNumUpvotes] = useState(upvotes)

  const handleDelete = useCallback(() => {
    deleteCard(id).then(handleReload)
  }, [id])

  const handleUpvote = useCallback(() => {
    setNumUpvotes((prevNumUpvotes) => (prevNumUpvotes += 1))
    upvoteCard(id)
  }, [id])

  return (
    <div className="Card">
      <div className="delete-icon" onClick={handleDelete}>
        +
      </div>
      <div className="card-content">
        <strong>
          <u>{title}</u>
        </strong>
        <span>{message}</span>
        <span>
          <strong>From:</strong> {author}
        </span>
      </div>
      {gifUrl && <img className="card-gif" src={gifUrl} alt="Gif" />}
      <button className="upvote-button" onClick={handleUpvote}>
        +{numUpvotes}
      </button>
    </div>
  )
}
