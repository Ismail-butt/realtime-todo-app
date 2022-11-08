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
import pusherObj from '../../pusher/pusher'

const pusher = pusherObj.getInstance()
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const Todos = () => {
  const [todos, setTodos] = useState([])
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [formData, setFormData] = useState({
    text: '',
    _id: '',
  })
  const [io, setIO] = useState(null)
  const { text, _id } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.put(`/api/todos/${_id}`, { text }, config)
      console.log('data: ', data)

      setFormData({
        text: '',
        _id: '',
      })
      setBtnDisabled(true)
    } catch (error) {
      console.log('updateTodo Error: ', error.message)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`, config)
    } catch (error) {
      console.log('Error: ', error.message)
    }
  }

  const updateTodoItem = async (todo) => {
    setFormData(todo)
    setBtnDisabled(false)
  }

  useEffect(() => {
    if (io) {
      const getTodos = async () => {
        const { data } = await axios.get('/api/todos')
        setTodos(data)
      }
      getTodos()

      const channel = pusher.subscribe('todos')
      channel.bind('add-todo', (payload) => {
        console.log('add', payload)
        setTodos((prevState) => [...prevState, payload])
      })

      channel.bind('delete-todo', (payload) => {
        setTodos((prevState) => {
          return prevState.filter((todo) => todo._id !== payload._id)
        })
      })

      channel.bind('update-todo', (payload) => {
        setTodos((prevState) => {
          return prevState.map((todo) =>
            todo._id === payload._id ? { ...payload } : todo
          )
        })
      })

      return () => {
        pusher.unsubscribe('todos')
      }
    }
  }, [io])

  useEffect(() => {
    if (!io) setIO(pusherObj.getInstance())
    return () => {
      setIO(null)
    }
  }, [])

  return (
    <TodosContainer>
      <UpdateFormContainer>
        <form onSubmit={onSubmit} style={{ width: '400px' }}>
          <FormInput
            label='update todo!'
            type='updateTodo'
            id='text'
            value={text}
            onChange={onChange}
            required
          />

          <ButtonsContainer>
            <Button type='submit' buttonType='update' isDisabled={btnDisabled}>
              Update Todo
            </Button>
          </ButtonsContainer>
        </form>
      </UpdateFormContainer>

      <TodosList>
        {todos.map((todo) => (
          <Todo
            key={todo._id}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodoItem={updateTodoItem}
          />
        ))}
      </TodosList>
    </TodosContainer>
  )
}

export default Todos
