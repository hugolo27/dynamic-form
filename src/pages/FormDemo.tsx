import React, { useState } from 'react'
import Form from '../components/Form'
import './FormDemo.css'
import { FormData, FIELD_TYPES } from '../shared/types'

const DEMO_FIELDS = [
  {
    id: 'username',
    name: 'Username',
    type: FIELD_TYPES.TEXTAREA,
    required: true,
    rows: 5,
    readonly: false,
    placeholder: 'Enter your username',
    defaultValue: 'admin',
  },
  {
    id: 'password',
    name: 'Password',
    type: FIELD_TYPES.PASSWORD,
    required: true,
    readonly: false,
    placeholder: 'Enter your password',
    minLength: 6,
  },
  {
    id: 'fecha',
    name: 'Fecha',
    type: FIELD_TYPES.DATE,
    required: true,
    readonly: false,
    placeholder: 'Enter your date',
  },

  // {
  //   id: 'age',
  //   name: 'Age',
  //   minValue: 18,
  //   maxValue: 60,
  //   type: FIELD_TYPES.NUMBER,
  //   required: false,
  //   readonly: false,
  //   placeholder: 'Enter your age',
  // },
  {
    id: 'role',
    name: 'Role',
    type: FIELD_TYPES.SELECT,
    required: true,
    readonly: false,
    options: [
      {
        key: 'backend',
        value: 'Backend Developer',
      },
      {
        key: 'fullstack',
        value: 'Full Stack Developer',
      },
      {
        key: 'frontend',
        value: 'Frontend Developer',
      },
    ],
  },
  {
    id: 'submit',
    name: 'Send Form',
    type: FIELD_TYPES.SUBMIT,
  },
]
function FormDemo() {
  const [formData, setFormData] = useState<FormData>({})
  const handleSubmit = (data: FormData) => {
    setFormData(data)
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>Dynamic Form - Demo</p>
        <Form onSubmit={handleSubmit} id="demo-form" fields={DEMO_FIELDS} />
        {Object.keys(formData).length ? (
          <div className="submitted-data">
            <h2>Submitted Data:</h2>
            {Object.keys(formData).map((key) => {
              const field = DEMO_FIELDS.find((field) => field.id === key)
              if (
                field?.type === FIELD_TYPES.PASSWORD ||
                !formData[key]?.toString().length
              ) {
                return null
              }
              return (
                <label key={key}>
                  <b>{key}:</b> <i>{formData[key]}</i>
                </label>
              )
            })}
          </div>
        ) : null}
      </header>
    </div>
  )
}

export default FormDemo
