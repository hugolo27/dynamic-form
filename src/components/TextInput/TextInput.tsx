import React, { useState } from 'react'
import { FIELD_TYPES, InputField } from '../../shared/types'
import { validateString } from '../../shared/utils'

const TextInput = ({
  id,
  name,
  value,
  required,
  onChange,
  type,
  placeholder,
  minLength,
  maxLength,
  rows,
}: InputField) => {
  const [hasBeenChanged, setHasBeenChanged] = useState(false)
  const [isValid, setIsValid] = useState(
    validateString(value, required, minLength, maxLength),
  )
  const updateField = ({
    target: { value: newValue },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!hasBeenChanged) {
      setHasBeenChanged(true)
    }
    const isNewValueValid = validateString(
      newValue,
      required,
      minLength,
      maxLength,
    )
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
        {minLength && ` - (min: ${minLength} chars)`}
        {maxLength && ` - (max: ${maxLength} chars)`}
      </label>
      {type === FIELD_TYPES.TEXTAREA ? (
        <textarea
          rows={rows}
          aria-label={name}
          tabIndex={0}
          placeholder={placeholder}
          onChange={updateField}
          value={typeof value === 'string' ? value : ''}
          className={`text-input ${!isValid && hasBeenChanged && 'invalid-input'}`}
        />
      ) : (
        <input
          aria-label={name}
          tabIndex={0}
          placeholder={placeholder}
          onChange={updateField}
          type={type}
          value={typeof value === 'string' ? value : ''}
          className={`text-input ${!isValid && hasBeenChanged && 'invalid-input'}`}
        />
      )}
    </>
  )
}
export default TextInput
