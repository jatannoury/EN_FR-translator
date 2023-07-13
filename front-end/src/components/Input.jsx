import React from "react";
import { useState } from "react";

const Input = ({ placeholder }) => {
  const [firstName, setFirstName] = useState("");
  let placeholder_id = placeholder.replace(" ", "");
  placeholder_id =
    placeholder_id.charAt(0).toUpperCase() + placeholder_id.slice(1);
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    console.log(11);
  };
  return (
    <div className="input_component">
      <label htmlFor="input_component">{placeholder}</label>
      {placeholder !== "Birthday" && placeholder !== "Gender" ? (
        <input
          type="text"
          placeholder={placeholder}
          value={firstName}
          onChange={handleFirstName}
          id={placeholder_id}
        ></input>
      ) : placeholder === "Birthday" ? (
        <input type="date" className="birthday" />
      ) : (
        <div className="radio-container">
          <input type="radio" id="male" name="gender" value="male" />
          <label for="male" className="gender_label">
            Male
          </label>
          <input type="radio" id="female" name="gender" value="female" />
          <label for="female" className="gender_label">
            Female
          </label>
        </div>
      )}
    </div>
  );
};

export default Input;
