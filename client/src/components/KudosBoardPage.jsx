import React, { useCallback, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { useParams } from 'react-router-dom'
import { getBoardData } from '../data/boardClient'
import AddCardForm from './AddCardForm'
import Card from './Card'
import Modal from './Modal'

import useModal from '../hooks/useModal'

import './KudosBoardPage.css'

export default function KudosBoardPage() {
  const { boardId } = useParams()
  const [boardData, setBoardData] = useState({})

  const { isModalVisible, modalProps, closeModal, showModal } = useModal()

  const reloadBoardData = useCallback(() => {
    getBoardData(boardId).then((data) => setBoardData(data))
  }, [boardId])

  useEffect(() => {
    reloadBoardData()
  }, [])

  const onAddCard = useCallback(() => {
    closeModal()
    reloadBoardData()
  }, [])

  const showAddCardForm = useCallback(() => {
    showModal({boardId: boardId, afterFormSubmit: onAddCard})
  })

  return (
    <div className="KudosBoardPage">
      <header>
        <h1>{boardData.title}</h1>
        <h3>Author: {boardData.author}</h3>
      </header>
      <main className="content">
        <div className="card-container">
          <div className="add-card" onClick={showAddCardForm}>
            <strong>Add Card</strong>+
          </div>
          {boardData.cards?.map((card) => {
            return (
              <Card
                key={card.id}
                id={card.id}
                title={card.title}
                message={card.description}
                author={card.author}
                upvotes={card.upvoteCount}
                handleReload={reloadBoardData}
              />
            )
          })}
        </div>
        <Link to={`/`}>
          <button className="view-button">Back to All Boards</button>
        </Link>
      </main>
      {isModalVisible && (
        <Modal handleClose={closeModal}>
          <AddCardForm {...modalProps} />
        </Modal>
      )}
    </div>
  )
}
