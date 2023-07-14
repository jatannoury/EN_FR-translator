import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import Input from "../components/Input";
import axiosInstance from "../tools/axios";

const SignUp = () => {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      birthday: "",
      gender: "",
      email: "",
      password: "",
    });
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.register(formData)
  };
  
  
  return (
    <div className="signup_container">
      <form onSubmit={handleSubmit} className="form_inputs">
        <h1 className="sign_up">
          <FaUserAlt className="sing_up_icon" />
          <span className="sign_up_text">Sign Up</span>
        </h1>
        <div className="row">
          <Input
            placeholder={"First Name"}
            setFormData={setFormData}
            formData={formData}
          />
          <Input
            placeholder={"Last Name"}
            setFormData={setFormData}
            formData={formData}
          />
        </div>
        <div className="row">
          <Input
            placeholder={"Birthday"}
            setFormData={setFormData}
            formData={formData}
          />
          <Input
            placeholder={"Gender"}
            setFormData={setFormData}
            formData={formData}
          />
        </div>
        <div className="row">
          <Input
            placeholder={"Email"}
            setFormData={setFormData}
            formData={formData}
          />
          <Input
            placeholder={"Password"}
            setFormData={setFormData}
            formData={formData}
          />
        </div>
        <div className="input_component">
          <input type="submit"></input>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
