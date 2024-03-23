import {
  AllowedValue,
  Field,
  FIELD_TYPES,
  TEXT_FIELD_TYPES,
  FormData,
} from '../shared/types'
import TextInput from './TextInput/TextInput'
import NumberInput from './NumberInput/NumberInput'
import SelectInput from './SelectInput/SelectInput'
import { useCallback, useEffect, useState } from 'react'
import './formStyles.css'
import Button from './Button/Button'
import { validateNumber, validateString } from '../shared/utils'
import DateInput from './DateInput/DateInput'

type FormProps = {
  id: string
  fields: Field[]
  onSubmit: (data: FormData) => void
}

const resolveEditor = (
  field: Field,
  callback: (name: string, value: AllowedValue) => void,
  value: AllowedValue,
  disableSubmit?: boolean,
) => {
  if (TEXT_FIELD_TYPES.includes(field.type)) {
    return <TextInput onChange={callback} {...field} value={value} />
  } else if (field.type === FIELD_TYPES.NUMBER) {
    return <NumberInput onChange={callback} {...field} value={value} />
  } else if (field.type === FIELD_TYPES.DATE) {
    return <DateInput onChange={callback} {...field} value={value} />
  } else if (field.type === FIELD_TYPES.SELECT) {
    return <SelectInput onChange={callback} {...field} value={value} />
  } else if (field.type === FIELD_TYPES.SUBMIT) {
    return <Button {...field} disabled={disableSubmit} />
  } else {
    return null
  }
}

const Form = ({ id, fields, onSubmit }: FormProps) => {
  const [formData, setFormData] = useState<FormData>({})
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    setFormData(
      fields
        .filter((field: Field) => field.type !== FIELD_TYPES.SUBMIT)
        .reduce(
          (acc, field) => ({
            ...acc,
            [field.id]:
              field.defaultValue ||
              (field.type === FIELD_TYPES.SELECT &&
                field?.options?.[0].value) ||
              null,
          }),
          {},
        ),
    )
  }, [fields])

  const validateForm = useCallback(() => {
    const isFormValid = fields
      .filter((field: Field) => field.type !== FIELD_TYPES.SUBMIT)
      .reduce((result: boolean, currentField: Field) => {
        if (TEXT_FIELD_TYPES.includes(currentField.type)) {
          return (
            result &&
            validateString(formData[currentField.id], currentField.required)
          )
        } else {
          return (
            result &&
            validateNumber(
              formData[currentField.id],
              currentField.required,
              currentField.minValue,
              currentField.maxValue,
            )
          )
        }
      }, true)
    setIsValid(isFormValid)
  }, [formData, fields])

  useEffect(() => {
    validateForm()
  }, [formData, validateForm])

  const updateField = (fieldId: string, value: AllowedValue) => {
    setFormData({ ...formData, [fieldId]: value })
    // validateForm()
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(formData)
  }

  return (
    <form
      id={id}
      aria-label={`Form ${id}`}
      tabIndex={0}
      onSubmit={handleSubmit}
    >
      {fields.some((field: Field) => field.required) && (
        <div className="required-container">
          <label className="required-info">* Required fields</label>
        </div>
      )}
      {fields.map((field: Field, fieldIndex: number) => (
        <div key={`form-${id}-field-${fieldIndex}`} className="field">
          {field.type === FIELD_TYPES.SUBMIT
            ? resolveEditor(field, updateField, formData[field.id], !isValid)
            : resolveEditor(field, updateField, formData[field.id])}
        </div>
      ))}
    </form>
  )
}

export default Form
