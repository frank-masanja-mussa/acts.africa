import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('../pages/Home'))
const Donate = lazy(() => import('../features/donate/Donate'))
const StartChapter = lazy(() => import('../features/chapters/StartChapter'))
const ChapterApplication = lazy(() => import('../features/chapters/ChapterApplication'))
const TanzaniaChapter = lazy(() => import('../features/chapters/TanzaniaChapter'))
const TanzaniaSurvey = lazy(() => import('../features/survey/TanzaniaSurvey'))
const Resources = lazy(() => import('../features/resources/Resources'))
const LessonPlan = lazy(() => import('../features/resources/LessonPlan'))
const TellUs = lazy(() => import('../features/feedback/TellUs'))
const LiveData = lazy(() => import('../features/analytics/LiveData'))
const Programs = lazy(() => import('../features/programs/Programs'))
const ProgramApplication = lazy(() => import('../features/programs/ProgramApplication'))

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={null}>
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
            </Suspense>
        </BrowserRouter>
    )
}

export default App
