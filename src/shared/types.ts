export type Option = {
  key: string
  value: string
}

export type Field = {
  id: string
  name: string
  type: string
  defaultValue?: string
  required?: boolean
  readonly?: boolean
  placeholder?: string
  minValue?: number
  maxValue?: number
  minLength?: number
  maxLength?: number
  disabled?: boolean
  rows?: number
  options?: Option[] & { [Symbol.iterator]: () => IterableIterator<Option> }
}

export type AllowedValue = number | string | null | undefined

export type FormData = {
  [key: string]: AllowedValue
}

export type InputField = Field & {
  value: AllowedValue
  onChange: (name: string, value: AllowedValue) => void
}

export const FIELD_TYPES = {
  DATE: 'date',
  NUMBER: 'number',
  PASSWORD: 'password',
  SELECT: 'select',
  TEXT: 'text',
  SUBMIT: 'submit',
  TEXTAREA: 'textarea',
}

export const TEXT_FIELD_TYPES = [
  FIELD_TYPES.PASSWORD,
  FIELD_TYPES.TEXT,
  FIELD_TYPES.SELECT,
  FIELD_TYPES.TEXTAREA,
]
