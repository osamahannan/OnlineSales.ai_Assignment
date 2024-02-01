import React from "react";

const Input = ({ objValue, onChange, index, deleteField }) => {
  const { label, type, value, options } = objValue;

  return (
    <div className="input-group">
      <label htmlFor={label}>{label}</label>
      <div className="input">
        {type === "select" ? (
          <select name= "select" id={index} onChange={(e) => onChange(e, index)} label = {label} className="select">
            {options?.map((rd, idx) => (
              <option value={rd.value} key={idx}>{rd.value}</option>
            ))}
          </select>
        ) : type == "text-area" ? (
          <>
            <textarea name="text-area" id="" cols="30" rows="10" onChange={(e) => onChange(e, index)} value={value || ""}/>
          </>
        ) : (
          (
            <input
              type={type || "text"}
              id={label}
              value={value || ""}
              onChange={(e) => onChange(e, index, type)}
            />
          )
        )}
        <div onClick={(e) => deleteField(e, index)}>X</div>
      </div>
    </div>
  );
  // return (
  //   <div className="input-group">
  //     <label htmlFor={label}>{label}</label>
  //     <div className="input">
  //       <input
  //         type={type || "text"}
  //         id={label}
  //         value={value || ""}
  //         onChange={(e) => onChange(e, index)}
  //       />
  //       <div onClick={(e) => deleteField(e, index)}>X</div>
  //     </div>
  //   </div>
  // );
};

export default Input;
