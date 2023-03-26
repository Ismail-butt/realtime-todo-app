import { useContext } from 'react'
import UserContext from '../../contexts/UserContext'
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from './navbar.styles'

const Navbar = () => {
  const { currentUser, logout } = useContext(UserContext)

  const signOutHandler = async () => {
    logout()
  }

  return (
    <>
      <NavigationContainer>
        <LogoContainer to='/'>TODO</LogoContainer>

        <NavLinks>
          <NavLink to='/'>Home</NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutHandler}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to='/auth'>SIGN IN</NavLink>
          )}
        </NavLinks>
      </NavigationContainer>
    </>
  )
}

export default Navbar
