import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Donate from './pages/Donate'
import StartChapter from './pages/StartChapter'
import ChapterApplication from './pages/ChapterApplication'
import TanzaniaChapter from './pages/TanzaniaChapter'
import TanzaniaSurvey from './pages/TanzaniaSurvey'
import Resources from './pages/Resources'
import TellUs from './pages/TellUs'
import LiveData from './pages/LiveData'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/start-chapter" element={<StartChapter />} />
        <Route path="/chapter-application" element={<ChapterApplication />} />
        <Route path="/tanzania-chapter" element={<TanzaniaChapter />} />
        <Route path="/tanzania-survey" element={<TanzaniaSurvey />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/tell-us" element={<TellUs />} />
        <Route path="/live-data" element={<LiveData />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
