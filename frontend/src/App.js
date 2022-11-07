import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Authentication from './pages/Authentication/Authentication'
import Sidebar from './components/sidebar/Sidebar'
import { UserProvider } from './contexts/UserContext'

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Sidebar />} />
          <Route path='/auth' element={<Authentication />} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
