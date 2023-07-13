import React from 'react'
import { useState } from "react";

const Input = () => {
  const [firstName, setFirstName] = useState("");
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    console.log(11);
  };
  return (
    <div className="input_component">
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={handleFirstName}
        id="firstName"
      ></input>
    </div>
  );
}

export default Input