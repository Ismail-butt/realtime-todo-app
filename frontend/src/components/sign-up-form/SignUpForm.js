import { useState } from 'react'
import FormInput from '../form-input/FormInput'
import Button from '../button/Button'
import { SignUpContainer } from './SignUpForm.styles.js'

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const { displayName, email, password, confirmPassword } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    try {
      // Call Register Api Here and move to Home Page

      setFormData({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    } catch (error) {
      console.log('User Creation Error: ', error.message)
    }
  }

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={onSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          id='displayName'
          value={displayName}
          onChange={onChange}
          required
        />

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

        <FormInput
          label='Confirm Password'
          type='password'
          id='confirmPassword'
          value={confirmPassword}
          onChange={onChange}
          required
        />

        <Button buttonType='google-sign-in' type='submit'>
          Sign Up
        </Button>
      </form>
    </SignUpContainer>
  )
}

export default SignUpForm
