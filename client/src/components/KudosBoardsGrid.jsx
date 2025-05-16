import React, { useCallback, useEffect, useMemo, useState } from 'react'

import AddBoardForm from './AddBoardForm'
import FilterBar from './FilterBar'
import KudosBoardTile from './KudosBoardTile'
import Modal from './Modal'
import SearchBar from './SearchBar'

import useModal from '../hooks/useModal'
import { getBoards } from '../data/boardClient'

import './KudosBoardsGrid.css'

export default function BoardsGrid() {
  const [boards, setBoards] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('ALL')
  const { isModalVisible, modalProps, closeModal, showModal } = useModal()

  const setFilter = useCallback((filter) => {
    setSelectedFilter(filter)
  }, [])

  const reloadBoards = useCallback(() => {
    getBoards().then((data) => {
      setBoards(data)
    })
  }, [])

  useEffect(() => {
    reloadBoards()
  }, [])

  const onAddBoard = useCallback(() => {
    closeModal()
    reloadBoards()
  }, [])
  const showAddBoardForm = () => showModal({ afterFormSubmit: onAddBoard })

  const filteredBoards = useMemo(() => {
    if (boards && boards.length > 0) {
      const searchMatchBoards = boards.filter((board) =>
        board.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )

      if (selectedFilter === 'ALL') {
        return searchMatchBoards
      } else if (selectedFilter === 'RECENT') {
        return searchMatchBoards
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6)
      } else {
        return searchMatchBoards.filter(
          (board) => board.category === selectedFilter,
        )
      }
    }
    return []
  }, [boards, searchQuery, selectedFilter])

  return (
    <div className="KudosBoardsGrid">
      <header className="header">
        <h1>Kudos Board App</h1>
      </header>
      <nav className="search-filter-container">
        <FilterBar filter={selectedFilter} onSelectFilter={setFilter} />
        <SearchBar
          clearSearch={() => setSearchQuery('')}
          handleSubmitSearch={(query) => setSearchQuery(query)}
          isSearchMode={searchQuery.length > 0}
        />
      </nav>
      <main className="content">
        <div className="kudos-boards-container">
          <div className="create-board-container" onClick={showAddBoardForm}>
            <h2>Create New Board</h2>
            <h1>+</h1>
          </div>
          {filteredBoards.map((board) => (
            <KudosBoardTile
              key={board.id}
              title={board.title}
              id={board.id}
              author={board.author}
              handleBoardChange={reloadBoards}
            />
          ))}
        </div>
      </main>
      <footer>
        <span>@mjwang</span>
        <span>codepath 2025</span>
      </footer>
      {isModalVisible && (
        <Modal handleClose={closeModal}>
          <AddBoardForm {...modalProps} />
        </Modal>
      )}
    </div>
  )
}
