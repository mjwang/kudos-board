import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import KudosBoardsGrid from './components/KudosBoardsGrid'
import KudosBoardPage from './components/KudosBoardPage'

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<KudosBoardsGrid />} />
        <Route path="/boards/:boardId" element={<KudosBoardPage />} />
      </Routes>
    </Router>
  )
}

export default App
