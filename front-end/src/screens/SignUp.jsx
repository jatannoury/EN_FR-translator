import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import Input from "../components/Input";
import axiosInstance from "../tools/axios";
import { Link, useNavigate } from "react-router-dom";
import { encryptString } from "../tools/encrypt";
import { toast } from "react-toastify";
const SignUp = () => {
  const navigate = useNavigate();
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
    formData["password"] = encryptString(
      formData["password"],
      "abcdefghijklmnop"
    );
    axiosInstance.register(formData).then((res) => {
      console.log("RES",res)
      if (res === 201) {
        toast.success("Invalid Inputs");
        setTimeout(() => {
          navigate("/signIn");
        }, 1000);
      } else {
        console.log("TOAST");
        toast.error("Invalid Inputs");
      }
    });
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
        <div className="input_component submit sign_up">
          <input type="submit"></input>
        </div>
        <Link to={"/signIn"} className="link_to_sign_in ">
          <span>Already a User? Sign In</span>
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
