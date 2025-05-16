import React, { useCallback, useMemo, useState } from 'react'

import { createBoard } from '../data/boardClient'

import './AddBoardForm.css'

const BoardTypes = {
  CELEBRATION: 'CELEBRATION',
  THANK_YOU: 'THANK_YOU',
  INSPIRATION: 'INSPIRATION',
}

const BoardLabels = {
  [BoardTypes.CELEBRATION]: 'Celebration',
  [BoardTypes.THANK_YOU]: 'Thank you',
  [BoardTypes.INSPIRATION]: 'Inspiration',
}

export default function AddBoardForm({ afterFormSubmit }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(BoardTypes.CELEBRATION)
  const [author, setAuthor] = useState('')

  const isFormValid = useMemo(() => Boolean(title), [title])

  const handleTitleChange = useCallback((event) => {
    setTitle(event.target.value)
  }, [])

  const handleAuthorChange = useCallback((event) => {
    setAuthor(event.target.value)
  }, [])

  const handleCategoryChange = useCallback((event) => {
    setCategory(event.target.value)
  }, [])

  const handleCreateBoard = useCallback((event) => {
    event.preventDefault()
    createBoard(title, author, category).then(afterFormSubmit)
  })

  return (
    <form className="AddBoardForm" onSubmit={handleCreateBoard}>
      <h2>Create New Board</h2>
      <label>Title*</label>
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
      <label>Category*</label>
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
      {!isFormValid && (
        <span className="validation-warning">*Required field</span>
      )}
      <button
        disabled={!isFormValid}
        onClick={handleCreateBoard}
        type="submit"
        className="submit-button"
      >
        Create Board
      </button>
      <button onClick={afterFormSubmit} type="button" className="cancel-button">
        Cancel
      </button>
    </form>
  )
}
