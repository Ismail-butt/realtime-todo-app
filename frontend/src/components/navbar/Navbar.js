import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from './navbar.styles'

const Navbar = () => {
  return (
    <>
      <NavigationContainer>
        <LogoContainer to='/'>TODO</LogoContainer>

        <NavLinks>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/auth'>SIGN IN</NavLink>
        </NavLinks>
      </NavigationContainer>
    </>
  )
}

export default Navbar
