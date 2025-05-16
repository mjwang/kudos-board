import React, { useCallback, useEffect, useState } from 'react'

import AddBoardForm from './AddBoardForm'
import KudosBoardTile from './KudosBoardTile'
import Modal from './Modal'

import useModal from '../hooks/useModal'
import { getBoards } from '../data/boardClient'

import './KudosBoardsGrid.css'

export default function BoardsGrid() {
  const [boards, setBoards] = useState([])
  const { isModalVisible, modalProps, closeModal, showModal } = useModal()

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

  return (
    <div className="KudosBoardsGrid">
      <header className="header">
        <h1>Kudos Board App</h1>
      </header>
      <main className="content">
        <div className="kudos-boards-container">
          <div className="create-board-container" onClick={showAddBoardForm}>
            <h2>Create New Board</h2>
            <h1>+</h1>
          </div>
          {boards.map((board) => (
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
