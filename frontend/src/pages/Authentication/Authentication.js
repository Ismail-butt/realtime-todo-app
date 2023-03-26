import SignInForm from '../../components/sign-in-form/SignInForm'
import SignUpForm from '../../components/sign-up-form/SignUpForm'
import { AuthenticationContainer } from './authetication.styles.js'

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  )
}

export default Authentication
