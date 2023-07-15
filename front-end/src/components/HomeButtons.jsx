import React, { useState } from "react";
import { GoHistory } from "react-icons/go";
import { HiSwitchHorizontal } from "react-icons/hi";
import { AiOutlineStar } from "react-icons/ai";
const HomeButtons = ({
  setToggleRightContainer,
  setRightContainerCaller,
  rightContainerCaller,
  handleTranslate,
  handleToggleRightContainer,
}) => {
  const handleHistory = async (e) => {
    if (
      rightContainerCaller !== "History" &&
      rightContainerCaller !== "Saved"
    ) {
      console.log(0);
      await setRightContainerCaller("History");
      setToggleRightContainer(true);
      handleToggleRightContainer("History");
    } else if (rightContainerCaller === "History") {
      console.log(1);
      setRightContainerCaller("");
      setToggleRightContainer(false);
    } else {
      console.log(2);
      setRightContainerCaller("History");
      handleToggleRightContainer("History");
    }
  };
  const handleSaved = (e) => {
    if (rightContainerCaller === "") {
      setRightContainerCaller("Saved");
      setToggleRightContainer(true);
    } else if (rightContainerCaller === "Saved") {
      setRightContainerCaller("");
      setToggleRightContainer(false);
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
