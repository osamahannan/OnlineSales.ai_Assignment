import React, { useState } from 'react'

const Option = ({handleAddOptions}) => {

  const [optionLabel, setOptionLabel] = useState("")

  const handleOption = () => {
    setOptionLabel("")
    handleAddOptions(optionLabel)
  }

  return (
    <div className='label-option'>
      <input type="text" placeholder='option label' onChange={(e) => setOptionLabel(e.target.value)} value={optionLabel}/>
      <button className="add-btn" onClick={handleOption}>
        Add Option
      </button>
    </div>
  )
}

export default Option