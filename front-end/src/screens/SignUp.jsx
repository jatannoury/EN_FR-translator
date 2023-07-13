import React from "react";
import { FaUserAlt } from "react-icons/fa";
import Input from "../components/Input";

const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("HELLO");
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
            <Input placeholder={"First Name"} />
            <Input placeholder={"Last Name"} />
          </div>
          <div className="row">
            <Input placeholder={"Birthday"} />
            <Input placeholder={"Gender"} />
          </div>
          <div className="row">
            <Input placeholder={"Email"} />
            <Input placeholder={"Phone Number"} />
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
