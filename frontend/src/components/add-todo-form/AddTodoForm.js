import { useState } from 'react'
import FormInput from '../form-input/FormInput'
import Button from '../button/Button'
import { AddTodoContainer, ButtonsContainer } from './AddTodoForm.styles'

const AddTodoForm = () => {
  const [formData, setFormData] = useState({
    todo: '',
  })
  const { todo } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      // Call add To-do Api Here

      setFormData({
        todo: '',
      })
    } catch (error) {
      console.log('Todo Error: ', error.message)
    }
  }

  return (
    <AddTodoContainer>
      <form onSubmit={onSubmit} style={{ width: '400px' }}>
        <FormInput
          label='Todo'
          type='todo'
          id='todo'
          value={todo}
          onChange={onChange}
          required
        />

        <ButtonsContainer>
          <Button type='submit'>Add Todo</Button>
        </ButtonsContainer>
      </form>
    </AddTodoContainer>
  )
}

export default AddTodoForm
