import React, { useState } from 'react'

import './SearchBar.css'

export default function SearchBar({
  clearSearch,
  handleSubmitSearch,
  isSearchMode,
}) {
  const [value, setValue] = useState('')

  const handleSearchChange = (event) => {
    setValue(event.target.value)
    if (event.target.value.length === 0) {
      clearSearch()
    }
  }

  const handleSearchClick = (event) => {
    event.preventDefault()
    handleSubmitSearch(value)
  }

  const handleClear = () => {
    setValue('')
    clearSearch()
  }

  return (
    <form className="SearchBar" onSubmit={handleSearchClick}>
      <input
        className="search-box"
        type="text"
        value={value}
        onChange={handleSearchChange}
        placeholder={'Search Board Titles...'}
      />
      <button
        onClick={handleSearchClick}
        type="submit"
        className="search-button primary"
      >
        Search
      </button>
      {isSearchMode && (
        <button
          className="search-button tertiary"
          role="link"
          onClick={handleClear}
        >
          Clear
        </button>
      )}
    </form>
  )
}
