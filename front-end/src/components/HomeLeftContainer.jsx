import HomeButtons from "../components/HomeButtons";
import { BsTranslate } from "react-icons/bs";
import React, { useState } from "react";
import axiosInstance from "../tools/axios";
import { toast } from "react-toastify";

const HomeLeftContainer = ({
  setToggleRightContainer,
  setRightContainerCaller,
  toggleRightContainer,
  rightContainerCaller,
}) => {
  const [frenchText, setFrenchText] = useState("");
  const [englishText, setEnglishText] = useState("");
  const handleTranslate = (e) => {
    axiosInstance.translate(englishText).then((res) => {
      if (res === 500) {
        toast.error("Server Error");
      } else {
        setFrenchText(res.data);
      }
    });
  };
  const handleInputChange = (e) => {
    setEnglishText(e.target.value);
  };
  return (
    <>
      <div
        className={` ${
          toggleRightContainer === true
            ? "left_container_splitted"
            : "left_container"
        }`}
      >
        <div className="title_container">
          <BsTranslate size={40} />
          <p>Translate</p>
        </div>
        <div className="translator_container">
          <div className="input_container">
            <textarea
              className="input_textarea"
              placeholder="Enter text to translate"
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="output_container">
            <textarea
              className="output_textarea"
              placeholder="Translation will appear here"
              readOnly
              value={frenchText}
            ></textarea>
          </div>
        </div>
        <HomeButtons
          setToggleRightContainer={setToggleRightContainer}
          setRightContainerCaller={setRightContainerCaller}
          rightContainerCaller={rightContainerCaller}
          handleTranslate={handleTranslate}
        />
      </div>
    </>
  );
};

export default HomeLeftContainer;
