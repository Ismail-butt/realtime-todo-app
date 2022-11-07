import { Routes, Route } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import AddTodoForm from '../../components/add-todo-form/AddTodoForm'
import './Home.styles.css'

const Home = () => {
  return (
    <div className='homeContainer'>
      <Sidebar />
      <Routes>
        <Route index element={<AddTodoForm />} />
      </Routes>
    </div>
  )
}

export default Home
