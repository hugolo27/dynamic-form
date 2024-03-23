import { AllowedValue } from './types'

export const validateNumber = (
  value: AllowedValue,
  required?: boolean,
  minValue?: number,
  maxValue?: number,
) => {
  const stringValue = value?.toString() || ''
  const parsedValue = parseInt(stringValue)
  if (!required && !stringValue.length) {
    return true
  }
  if (isNaN(parsedValue)) {
    return false
  }
  if (minValue !== undefined && parsedValue < minValue) {
    return false
  }
  return !(maxValue !== undefined && parsedValue > maxValue)
}

export const validateString = (
  value: AllowedValue,
  required?: boolean,
  minLength?: number,
  maxLength?: number,
) => {
  const stringValue = value?.toString() || ''
  if (required && !value?.toString().length) {
    return false
  }

  if (minLength && stringValue.length < minLength) {
    return false
  }

  return !(maxLength && stringValue.length > maxLength)
}

export const validateDate = (value: AllowedValue, required?: boolean) => {
  if (required && !value) {
    return false
  }

  if (value) {
    const dateValue = new Date(value)
    if (isNaN(dateValue.getTime())) {
      return false
    }
  }

  return true
}
