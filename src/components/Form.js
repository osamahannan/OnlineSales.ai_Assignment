import React from "react";
import { useState, useRef } from "react";
import Input from "./Input";
import { form as JsonForm } from "../JsonData";
import Option from "./Option";
import {useFormContext} from "../FormProvider"
import { toast } from 'react-toastify';

const Form = ({setShowForm}) => {
  const { formValues, setFormValues } = useFormContext();
  const [toggle, setTogggle] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState([]);

  const inputRef = useRef();
  const selectRef = useRef();

  const handleChange = (e, index, type) => {
    const name = e.target.name
    const values = [...formValues];
    if(type === "checkbox" || type === "radio") {
      if(e.target.checked === false) {
        values[index].value = "";
      } else {
        values[index].value = String(e.target.checked);
      }
    } else if(name === "select") {
      values[index].value = e.target.value;
    } else {
      values[index].value = e.target.value;
    }
    setFormValues(values);
  };

  const handleAddField = (e) => {
    e.preventDefault();
    const values = [...formValues];
    if (selectRef.current.value === "select") {
      values.push({
        label: inputRef.current.value || "label",
        type: "select",
        options: options,
        value: options[0]?.value
      })
    } else {
      values.push({
        label: inputRef.current.value || "label",
        type: selectRef.current.value || "text",
        value: "",
      });
    }
    setFormValues(values);
    setTogggle(false);
    setShowOptions(false)
    setOptions([])
  };

  const addBtnClick = (e) => {
    e.preventDefault();
    setTogggle(true);
    setShowOptions(false)
  };

  const handleDeleteField = (e, index) => {
    const values = [...formValues];
    values.splice(index, 1);
    setFormValues(values);
  };

  const handleSubmit = (e) => {
    JsonForm.values.push([...formValues]);
    e.preventDefault();
    console.log(
      formValues.map((val) => {
        return { [val.label]: val.value };
      })
    );
  };

  const handleChangeSelect = (e) => {
    const type = e.target.value
    if (type === "select") {
      setShowOptions(true)
    } else {
      setShowOptions(false)
    }
  }

  const handleAddOptions = (value) => {
    setOptions([...options, {
      value
    }])
  }

  const handleFormSubmit = () => {
    let error = false;
    for (let i = 0; i < formValues.length; i++) {
      const value = formValues[i]?.value;
      const label = formValues[i]?.label;
      if(value === "") {
        error = true;
        toast.error(`${label} can not be empty`, {
          position: "top-right",
          autoClose: 2000
        })
        break;
      }
    }
    if(!error) {
      toast.success("Form submitted successfully", {
        position: "top-right",
        autoClose: 2000
      })
      setShowForm(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {formValues.map((obj, index) => (
          <Input
            key={index}
            objValue={obj}
            onChange={handleChange}
            index={index}
            deleteField={handleDeleteField}
          />
        ))}
        {!toggle ? (
          <div className="center">
            <button className="add-btn" onClick={addBtnClick}>
              Add new
            </button>
          </div>
        ) : (
          <div className="dialog-box">
            <input type="text" placeholder="label" ref={inputRef} />
            <select ref={selectRef} onChange={handleChangeSelect}>
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="checkbox">Checkbox</option>
              <option value="radio">Radio</option>
              <option value="select">Select</option>
              <option value="text-area">Text Area</option>
            </select>
            <button className="add-btn" onClick={handleAddField}>
              Add
            </button>
          </div>
        )}

        {showOptions && (
          <>
            <div className="option-container">
              <Option handleAddOptions={handleAddOptions} />
              {options?.map((option, idx) => {
                return (
                  <div className="option-box" key={idx}>
                    <span>{`Option label ${idx+1}: `}</span>
                    <div>{option?.value}</div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        <button type="submit" className="submit-btn" onClick={handleFormSubmit}>
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default Form;
