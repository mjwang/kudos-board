import React, { useCallback, useMemo, useState } from 'react'

import { addCard } from '../data/boardClient'
import './AddCardForm.css'

export default function AddCardForm({ boardId, afterFormSubmit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [gifUrl, setGifUrl] = useState('')
  const [author, setAuthor] = useState('')

  const isFormValid = useMemo(
    () => description && gifUrl,
    [description, gifUrl],
  )

  const handleTitleChange = useCallback((event) => {
    setTitle(event.target.value)
  }, [])

  const handleAuthorChange = useCallback((event) => {
    setAuthor(event.target.value)
  }, [])

  const handleMessageChange = useCallback((event) => {
    setDescription(event.target.value)
  }, [])

  const handleGifyUrlChange = useCallback((event) => {
    setGifUrl(event.target.value)
  }, [])

  const handleCreateCard = useCallback((event) => {
    event.preventDefault()
    addCard(boardId, title, description, author, gifUrl).then(afterFormSubmit)
  })

  return (
    <form className="AddCardForm" onSubmit={handleCreateCard}>
      <h2>Add Card</h2>
      <div className="form-fields">
        <div className="card-info">
          <label>Title</label>
          <input
            className="text-box"
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder={'Title'}
          />
          <label>Author</label>
          <input
            className="text-box"
            type="text"
            value={author}
            onChange={handleAuthorChange}
            placeholder={'Author'}
          />
        </div>
        <div className="card-content">
          <label>Message*</label>
          <input
            className="text-box"
            type="text"
            value={description}
            onChange={handleMessageChange}
            placeholder={'Message'}
          />
          <label>Gif URL*</label>
          <input
            className="text-box"
            type="text"
            value={gifUrl}
            onChange={handleGifyUrlChange}
            placeholder={'GIFY link'}
          />
        </div>
      </div>
      {!isFormValid && (
        <span className="validation-warning">*Required field</span>
      )}
      <button
        disabled={!isFormValid}
        onClick={handleCreateCard}
        type="submit"
        className="submit-button"
      >
        Add Card
      </button>
      <button onClick={afterFormSubmit} type="button" className="cancel-button">
        Cancel
      </button>
    </form>
  )
}
