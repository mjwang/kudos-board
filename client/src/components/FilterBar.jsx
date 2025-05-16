import React from 'react'

import clsx from 'clsx'

import './FilterBar.css'

const filterLabels = {
  ALL: 'All/Home',
  RECENT: 'Recent',
  CELEBRATION: 'Celebrations',
  THANK_YOU: 'Thank you',
  INSPIRATION: 'Inspiration',
}

export default function FilterBar({ filter, onSelectFilter }) {
  const handleFilterClick = (filter) => {
    onSelectFilter(filter)
  }

  return (
    <div className="FilterBar">
      {Object.keys(filterLabels).map((option) => (
        <button
          className={clsx('filter-button', filter === option && 'active')}
          key={option}
          onClick={() => handleFilterClick(option)}
        >
          {filterLabels[option]}
        </button>
      ))}
    </div>
  )
}
