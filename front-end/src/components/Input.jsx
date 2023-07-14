import React from "react";

const Input = ({ placeholder, setFormData, formData }) => {
  let placeholder_id = placeholder.replace(" ", "");
  placeholder_id =
    placeholder_id.charAt(0).toLowerCase() + placeholder_id.slice(1);

  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [placeholder_id]: e.target.value.toString(),
    }));
  };

  return (
    <div className="input_component">
      <label htmlFor={placeholder_id}>{placeholder}</label>
      {placeholder === "Password" ? (
        <input
          type="password"
          placeholder={placeholder}
          onChange={handleInputChange}
          id={placeholder_id}
        />
      ) : placeholder === "Birthday" ? (
        <input type="date" className="birthday" onChange={handleInputChange} />
      ) : placeholder === "Gender" ? (
        <div className="radio-container">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            onChange={handleInputChange}
          />
          <label htmlFor="male" className="gender_label">
            Male
          </label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            onChange={handleInputChange}
          />
          <label htmlFor="female" className="gender_label">
            Female
          </label>
        </div>
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleInputChange}
          id={placeholder_id}
        />
      )}
    </div>
  );
};

export default Input;
