import React, { useEffect, useState } from 'react'

import AddBoardForm from './components/AddBoardForm'
import KudoBoardTile from './components/KudoBoardTile'
import Modal from './components/Modal'
import useModal from './hooks/useModal'
import { getBoards } from './data/boardClient'

import './App.css'

function App() {
  const [boards, setBoards] = useState([])
  const { isModalVisible, modalProps, closeModal, showModal } = useModal()

  useEffect(() => {
    getBoards().then((data) => {
      setBoards(data)
    })
  }, [])

  const showAddBoardForm = () => showModal({})

  return (
    <div className="App">
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
            <KudoBoardTile
              key={board.id}
              title={board.title}
              author={board.author}
            />
          ))}
        </div>
      </main>
      {isModalVisible && (
        <Modal {...modalProps} handleClose={closeModal}>
          <AddBoardForm />
        </Modal>
      )}
    </div>
  )
}

export default App
