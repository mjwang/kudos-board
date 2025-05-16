import React, { useCallback, useState } from 'react'

import './AddCardForm.css'

export default function AddCardForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [gifUrl, setGifUrl] = useState('')
  const [author, setAuthor] = useState('')

  return (
    <form className="AddCardForm" onSubmit={handleCreateCard}>
      <h2>Add Card</h2>
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
      <label>Category</label>
      <select
        className="category-dropdown"
        name="category"
        onChange={handleCategoryChange}
        value={category}
      >
        {Object.keys(BoardTypes).map((boardType) => {
          return (
            <option key={boardType} value={boardType}>
              {BoardLabels[boardType]}
            </option>
          )
        })}
      </select>
      <button
        onClick={handleCreateBoard}
        type="submit"
        className="submit-button"
      >
        Create Board
      </button>
    </form>
  )
}
