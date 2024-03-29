import React from 'react'
import { defaultJson } from "../JsonData"
import {useFormContext} from "../FormProvider"

export const parseJson = (value) => {
  try {
    return JSON.parse(value)
  } catch {
    return [];
  }
}

const JsonController = ({setShowForm}) => {
  const { setFormValues } = useFormContext();
  const [textArea, setTextArea] = React.useState(defaultJson)

  const handleCreateForm = () => {
    setFormValues(parseJson(textArea))
    setShowForm(true)
  }

  return (
    <div className='controller'>
      <textarea name="" id="" cols="50" rows="15" onChange={(e) => setTextArea(e.target.value)} defaultValue={textArea}></textarea>
      <div className='btn-container'><button onClick={handleCreateForm} className='create-form'>Create Form</button></div>
    </div>
  )
}

export default JsonController