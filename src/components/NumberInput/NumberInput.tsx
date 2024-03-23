import React, { useState } from 'react'
import { InputField } from '../../shared/types'
import { validateNumber } from '../../shared/utils'

const NumberInput = ({
  id,
  name,
  defaultValue,
  value,
  required,
  onChange,
  placeholder,
  minValue,
  maxValue,
}: InputField) => {
  const [hasBeenChanged, setHasBeenChanged] = useState(false)
  const [isValid, setIsValid] = useState(
    validateNumber(value, required, minValue, maxValue),
  )
  const updateField = ({
    target: { value: newValue },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasBeenChanged) {
      setHasBeenChanged(true)
    }
    const isNewValueValid = validateNumber(
      newValue,
      required,
      minValue,
      maxValue,
    )
    setIsValid(isNewValueValid)
    onChange(id, newValue)
  }
  return (
    <>
      <label
        className={`${!isValid && hasBeenChanged && 'invalid-label'}`}
        htmlFor={`field-${id}`}
        aria-label={name}
      >
        {name}
        {required ? ' *' : ''}
        {minValue && ` - (min: ${minValue})`}
        {maxValue && ` - (max: ${maxValue})`}
      </label>
      <input
        aria-label={name}
        tabIndex={0}
        onChange={updateField}
        type="number"
        min={minValue}
        max={maxValue}
        placeholder={placeholder}
        value={value && !isNaN(parseInt(value.toString())) ? value : ''}
        defaultValue={defaultValue}
        className={`${!isValid && hasBeenChanged && 'invalid-input'}`}
      />
    </>
  )
}
export default NumberInput
