import { Routes, Route, Navigate } from 'react-router-dom'
import App from '../App'
import Auth from './Auth'
import Chat from './chat/Chat'
import Photo from './photo/Photo'
import Flashcards from './flashcards/Flashcards'
import Quiz from './quiz/Quiz'
import Planner from './planner/Planner'
import Library from './library/Library'
import Profile from './profile/Profile'

export default function AppRoutes(){
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/home" element={<App />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/photo" element={<Photo />} />
      <Route path="/flashcards" element={<Flashcards />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/planner" element={<Planner />} />
      <Route path="/library" element={<Library />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
