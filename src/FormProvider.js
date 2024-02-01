import React, { createContext, useContext } from 'react'

export const FormContext = createContext({})

const FormProvider = ({children}) => {
  const [formValues, setFormValues] = React.useState([]);
  return (
    <FormContext.Provider
      value={{
        formValues,
        setFormValues
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export const useFormContext = () => useContext(FormContext);

export default FormProvider