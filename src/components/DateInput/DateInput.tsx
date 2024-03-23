import React, { useState } from 'react'
import { InputField } from '../../shared/types'
import { validateDate } from '../../shared/utils'

const DateInput = ({
  id,
  name,
  value,
  required,
  onChange,
  type,
  placeholder,
}: InputField) => {
  const [hasBeenChanged, setHasBeenChanged] = useState(false)
  const [isValid, setIsValid] = useState(validateDate(value, required))
  const updateField = ({
    target: { value: newValue },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasBeenChanged) {
      setHasBeenChanged(true)
    }
    const isNewValueValid = validateDate(newValue, required)
    setIsValid(isNewValueValid)
    onChange(id, newValue)
  }

  return (
    <>
      <label
        className={`label ${!isValid && hasBeenChanged && 'invalid-label'}`}
        htmlFor={`field-${id}`}
        aria-label={name}
      >
        {name}
        {required ? ' *' : ''}
      </label>
      <input
        aria-label={name}
        tabIndex={0}
        placeholder={placeholder}
        onChange={updateField}
        type={type}
        value={typeof value === 'string' ? value : ''}
        className={`text-input ${!isValid && hasBeenChanged && 'invalid-input'}`}
      />
    </>
  )
}
export default DateInput
