import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
  UpdateButton,
} from './button.styles.js'

export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted',
  update: 'update',
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    [BUTTON_TYPE_CLASSES.update]: UpdateButton,
  }[buttonType])

const Button = ({ children, buttonType, isDisabled, ...otherProps }) => {
  const CustomButton = getButton(buttonType)
  return (
    <CustomButton disabled={isDisabled} {...otherProps}>
      {children}
    </CustomButton>
  )
}

export default Button
