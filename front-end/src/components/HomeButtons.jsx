import React, { useState } from "react";
import { GoHistory } from "react-icons/go";
import { HiSwitchHorizontal } from "react-icons/hi";
import { AiOutlineStar } from "react-icons/ai";
const HomeButtons = ({
  setToggleRightContainer,
  setRightContainerCaller,
  rightContainerCaller,
  handleTranslate,
}) => {
  const handleHistory = (e) => {
    if (rightContainerCaller === "") {
      setToggleRightContainer(true);
      setRightContainerCaller("History");
    } else if (rightContainerCaller === "History") {
      setToggleRightContainer(false);
      setRightContainerCaller("");
    } else {
      setRightContainerCaller("History");
    }
  };
  const handleSaved = (e) => {
    if (rightContainerCaller === "") {
      setToggleRightContainer(true);
      setRightContainerCaller("Saved");
    } else if (rightContainerCaller === "Saved") {
      setToggleRightContainer(false);
      setRightContainerCaller("");
    } else {
      setRightContainerCaller("Saved");
    }
  };
  return (
    <>
      <div className="extra_buttons_container">
        <button className="extra_button" onClick={handleHistory}>
          <GoHistory size={30} className="extra_buttons_icons" />
        </button>
        <button className="extra_button" onClick={handleSaved}>
          <AiOutlineStar size={30} className="extra_buttons_icons" />
        </button>
      </div>
      <div className="translate_button_container">
        <div className="button_holder">
          <button className="translate_button" onClick={handleTranslate}>
            <HiSwitchHorizontal size={30} className="switch_languages" />
          </button>
        </div>
      </div>
    </>
  );
};

export default HomeButtons;
