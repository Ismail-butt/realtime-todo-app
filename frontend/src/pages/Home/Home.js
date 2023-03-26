import { Routes, Route } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import AddTodoForm from '../../components/add-todo-form/AddTodoForm'
import Todos from '../../components/get-todos/Todos'
import './Home.styles.css'

const Home = () => {
  return (
    <div className='homeContainer'>
      <Sidebar />
      <Routes>
        <Route index element={<Todos />} />
        <Route path='/add-todo' element={<AddTodoForm />} />
      </Routes>
    </div>
  )
}

export default Home
