import { useState } from 'react'
import Sandbox from './components/Sandbox'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>React Sandbox</h1>
        <p>Reactを練習できる環境です</p>
      </header>
      <Sandbox />
    </div>
  )
}

export default App
