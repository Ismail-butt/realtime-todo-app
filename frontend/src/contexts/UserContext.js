import { createContext, useState } from 'react'
import axios from '../components/axios/axios'

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const registerUser = async (name, email, password) => {
  try {
    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )

    localStorage.setItem('userInfo', JSON.stringify(data))
    return data
  } catch (error) {
    console.log('Error', error.message)
    return {}
  }
}

const logInUser = async (email, password) => {
  try {
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    localStorage.setItem('userInfo', JSON.stringify(data))
    return data
  } catch (error) {
    console.log('Error', error.message)
    return {}
  }
}

const logoutUser = () => {
  localStorage.removeItem('userInfo')
  return null
}

const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
})

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  const register = (name, email, password) => {
    setCurrentUser(registerUser(name, email, password))
  }

  const login = (email, password) => {
    setCurrentUser(logInUser(email, password))
  }

  const logout = () => {
    setCurrentUser(logoutUser())
  }

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, register, login, logout }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
