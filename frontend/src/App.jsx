
import { Route, Routes, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
// import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import Navbar from "./components/Navbar/Navbar.jsx" 

function App() {
  return (
    <>
      {/* todo: here navbar */}
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element ={ <Profile />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
