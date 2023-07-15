import React from "react";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();

  const handle_log_out = (e) => {
    navigate("/signIn");

    setTimeout(() => {
      toast.success("Logged Out");
    }, 1000);
  };
  return (
    <div className="header_main_container">
      <div className="header_sub_container" onClick={handle_log_out}>
        <CiLogout size={25} />
        <p>Log out</p>
      </div>
    </div>
  );
};

export default Header;
