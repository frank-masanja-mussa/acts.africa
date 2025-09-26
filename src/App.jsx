import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Donate from './pages/Donate'
import StartChapter from './pages/StartChapter'
import Resources from './pages/Resources'
import TellUs from './pages/TellUs'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/start-chapter" element={<StartChapter />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/tell-us" element={<TellUs />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
