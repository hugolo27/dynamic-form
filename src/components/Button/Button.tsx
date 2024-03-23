import { Field } from '../../shared/types'

const Button = ({ name, disabled }: Field) => {
  return (
    <input
      disabled={disabled}
      type="submit"
      aria-label={name}
      tabIndex={0}
      value={name?.toString()}
    />
  )
}

export default Button
