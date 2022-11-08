import { useEffect, useState } from 'react'
import FormInput from '../form-input/FormInput'
import Button from '../button/Button'
import Todo from '../todo/Todo'
import {
  TodosContainer,
  UpdateFormContainer,
  ButtonsContainer,
  TodosList,
} from './todos.styles.js'
import axios from '../axios/axios'

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const Todos = () => {
  const [todos, setTodos] = useState([])
  const [formData, setFormData] = useState({
    updateTodo: '',
  })
  const { updateTodo } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      // Call Update To-do Api Here

      setFormData({
        updateTodo: '',
      })
    } catch (error) {
      console.log('updateTodo Error: ', error.message)
    }
  }

  useEffect(() => {
    const getTodos = async () => {
      const { data } = await axios.get('/api/todos')
      setTodos(data)
    }
    getTodos()
  }, [])

  return (
    <TodosContainer>
      <UpdateFormContainer>
        <form onSubmit={onSubmit} style={{ width: '400px' }}>
          <FormInput
            label='update todo!'
            type='updateTodo'
            id='updateTodo'
            value={updateTodo}
            onChange={onChange}
            required
          />

          <ButtonsContainer>
            <Button type='submit' buttonType='update'>
              Update Todo
            </Button>
          </ButtonsContainer>
        </form>
      </UpdateFormContainer>
      <TodosList>
        {todos.map((todo, index) => (
          <Todo key={index} todo={todo} />
        ))}
      </TodosList>
    </TodosContainer>
  )
}

export default Todos
