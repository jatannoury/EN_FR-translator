import React, { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import Input from "../components/Input";
import axiosInstance from "../tools/axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance.sign_in(formData).then((res) => {
      console.log(res);

      if (res.status === 200) {
        toast.success("Logged In!");
        setTimeout(() => {
          navigate(`/Home/${res.data['user_info']['Items'][0]['userId']}`);
        }, 1000);
      } else {
        toast.error("Wrong Credentials");
      }
    });
  };

  return (
    <div className="signup_container">
      <form onSubmit={handleSubmit} className="form_inputs">
        <h1 className="sign_up sign_in">
          <FaSignInAlt size={40} className="sing_up_icon" />
          <span className="sign_up_text">Sign In</span>
        </h1>

        <div className="row sign_in">
          <Input
            placeholder={"Email"}
            setFormData={setFormData}
            formData={formData}
            signIn={true}
          />
        </div>
        <div className="row password sign_in">
          <Input
            placeholder={"Password"}
            setFormData={setFormData}
            formData={formData}
            signIn={true}
          />
        </div>
        <div className="input_component submit sign_in">
          <input type="submit"></input>
        </div>
        <Link to={"/"} className="link_to_sign_in">
          <span>Not a User? Sign Up</span>
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
