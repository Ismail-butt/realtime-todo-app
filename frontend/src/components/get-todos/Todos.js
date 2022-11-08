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
import pusher from '../../pusher/pusher'

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

  const deleteTodo = async (id) => {
    try {
      console.log('Deleted btn clicked1')
      const { data } = await axios.delete(`/api/todos/${id}`, config)
      console.log('data: ', data)
    } catch (error) {
      console.log('Error: ', error.message)
    }
  }

  useEffect(() => {
    const getTodos = async () => {
      const { data } = await axios.get('/api/todos')
      setTodos(data)
    }
    getTodos()

    const channel = pusher.subscribe('todos')
    channel.bind('add-todo', (payload) => {
      setTodos((prevState) => [...prevState, payload])
    })

    channel.bind('delete-todo', (payload) => {
      console.log('Payload: ', payload)
      setTodos((prevState) => {
        console.log('Prev State: ', prevState)
        return prevState.filter((todo) => todo._id !== payload._id)
      })
    })

    return () => {
      pusher.unsubscribe('todos')
    }
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
        {todos.map((todo) => (
          <Todo key={todo._id} todo={todo} deleteTodo={deleteTodo} />
        ))}
      </TodosList>
    </TodosContainer>
  )
}

export default Todos
