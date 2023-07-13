import React from 'react'

const Input = ({ placeholder, setFormData,formData }) => {
  let placeholder_id = placeholder.replace(" ", "");
  placeholder_id =
    placeholder_id.charAt(0).toLowerCase() + placeholder_id.slice(1);
  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [[placeholder_id]]: e.target.value.toString(),
    }));
  };
  

  return (
    <div className="input_component">
      <label htmlFor="input_component">{placeholder}</label>
      {placeholder !== "Birthday" && placeholder !== "Gender" ? (
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleInputChange}
          id={placeholder_id}
        ></input>
      ) : placeholder === "Birthday" ? (
        <input type="date" className="birthday" onChange={handleInputChange}/>
      ) : (
        <div className="radio-container">
          <input type="radio" id="male" name="gender" value="male" onChange={handleInputChange}/>
          <label for="male" className="gender_label">
            Male
          </label>
          <input type="radio" id="female" name="gender" value="female" onChange={handleInputChange}/>
          <label for="female" className="gender_label">
            Female
          </label>
        </div>
      )}
    </div>
  );
};

export default Input