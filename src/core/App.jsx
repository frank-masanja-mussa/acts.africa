import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Donate from '../features/donate/Donate'
import StartChapter from '../features/chapters/StartChapter'
import ChapterApplication from '../features/chapters/ChapterApplication'
import TanzaniaChapter from '../features/chapters/TanzaniaChapter'
import TanzaniaSurvey from '../features/survey/TanzaniaSurvey'
import Resources from '../features/resources/Resources'
import LessonPlan from '../features/resources/LessonPlan'
import TellUs from '../features/feedback/TellUs'
import LiveData from '../features/analytics/LiveData'
import Programs from '../features/programs/Programs'
import ProgramApplication from '../features/programs/ProgramApplication'

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
                <Route path="/programs" element={<Programs />} />
                <Route path="/programs/apply" element={<ProgramApplication />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/lesson-plan" element={<LessonPlan />} />
                <Route path="/tell-us" element={<TellUs />} />
                <Route path="/live-data" element={<LiveData />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
