import { FormInputLabel, Input, Group } from './formInput.styles.js'

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel
          shrink={`${otherProps.value && otherProps.value.length}`}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  )
}

export default FormInput
