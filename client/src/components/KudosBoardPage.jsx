import React, { useCallback, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { getBoardData } from '../data/boardClient'
import Card from './Card'

import './KudosBoardPage.css'

export default function KudosBoardPage() {
  const { boardId } = useParams()
  const [boardData, setBoardData] = useState({})

  const reloadBoardData = useCallback(() => {
    getBoardData(boardId).then((data) => setBoardData(data))
  }, [boardId])

  useEffect(() => {
    reloadBoardData()
  }, [])

  return (
    <div className="KudosBoardPage">
      <header>
        <h1>{boardData.title}</h1>
        <h3>Author: {boardData.author}</h3>
      </header>
      <main className="content">
        <div className="card-container">
          <div className="add-card">
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
      </main>
    </div>
  )
}
