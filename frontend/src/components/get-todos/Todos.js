import { useEffect, useState } from 'react'
import Todo from '../todo/Todo'
import './todos.styles.css'
// import axios from '../axios/axios'

// const config = {
//   headers: {
//     'Content-Type': 'application/json',
//   },
// }

const Todos = () => {
  const [todos] = useState([
    { text: 'Hospital Appointment', id: '1' },
    { text: 'Airport Flight Today', id: '2' },
  ])

  useEffect(() => {
    const getTodos = async () => {
      //   const { data } = await axios.get('/api/todos')
      //   console.log('data: ', data)
      console.log('Make an Api Call here')

      //   setTodos(data)
    }
    getTodos()
  }, [])

  return (
    <div>
      {todos.map((todo, index) => (
        <Todo key={index} todo={todo} />
      ))}
    </div>
  )
}

export default Todos
