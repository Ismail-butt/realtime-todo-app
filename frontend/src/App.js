import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Authentication from './pages/Authentication/Authentication'
import { UserProvider } from './contexts/UserContext'

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<h1>Home</h1>} />
          <Route path='/auth' element={<Authentication />} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
