import React, { useState } from 'react'
import { InputField } from '../../shared/types'
import { validateString } from '../../shared/utils'

const SelectInput = ({
  id,
  name,
  value,
  required,
  onChange,
  options,
}: InputField) => {
  const [hasBeenChanged, setHasBeenChanged] = useState(false)
  const [isValid, setIsValid] = useState(validateString(value, required))
  const updateField = ({
    target: { value: newValue },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    if (!hasBeenChanged) {
      setHasBeenChanged(true)
    }
    const isNewValueValid = validateString(newValue, required)
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
      <select
        aria-label={name}
        tabIndex={0}
        onChange={updateField}
        className={`text-input ${!isValid && hasBeenChanged && 'invalid-input'}`}
      >
        {options?.map((option) => (
          <option key={`${id}-${option.key}`} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    </>
  )
}
export default SelectInput
