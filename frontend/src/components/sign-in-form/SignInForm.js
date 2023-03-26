import { useState, useContext } from 'react'
import FormInput from '../form-input/FormInput'
import Button from '../button/Button'
import UserContext from '../../contexts/UserContext'
import { SignInContainer, ButtonsContainer } from './signInForm.styles.js'

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

  const { login } = useContext(UserContext)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      // Call login Api Here & Navigate to the Home Page
      login(email, password)

      setFormData({
        email: '',
        password: '',
      })
    } catch (error) {
      console.log('Sign In Failed Error: ', error.message)
    }
  }

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={onSubmit}>
        <FormInput
          label='Email'
          type='email'
          id='email'
          value={email}
          onChange={onChange}
          required
        />

        <FormInput
          label='Password'
          type='password'
          id='password'
          value={password}
          onChange={onChange}
          required
        />

        <ButtonsContainer>
          <Button buttonType='google-sign-in' type='submit'>
            Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  )
}

export default SignInForm
