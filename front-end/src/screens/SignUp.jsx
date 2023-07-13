import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import Input from "../components/Input";
import axios from "axios";
const SignUp = () => {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      birthday: "",
      gender: "",
      email: "",
      phoneNumber: "",
    });
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:8000/")
      .then((response) => {
        // Handle the response data
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };
  
  
  return (
    <div className="signup_container">
      <div>
        <h1 className="sign_up">
          <FaUserAlt className="sing_up_icon" />
          <span className="sign_up_text">Sign Up</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <Input placeholder={"First Name"}  setFormData={setFormData} formData={formData}/>
            <Input placeholder={"Last Name"}  setFormData={setFormData} formData={formData}/>
          </div>
          <div className="row">
            <Input placeholder={"Birthday"}  setFormData={setFormData} formData={formData}/>
            <Input placeholder={"Gender"}  setFormData={setFormData} formData={formData}/>
          </div>
          <div className="row">
            <Input placeholder={"Email"}  setFormData={setFormData} formData={formData}/>
            <Input placeholder={"Phone Number"}  setFormData={setFormData} formData={formData}/>
          </div>
          <div className="row">
            <input type="submit"></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
