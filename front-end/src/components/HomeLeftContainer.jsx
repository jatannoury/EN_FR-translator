import HomeButtons from "../components/HomeButtons";
import { BsTranslate } from "react-icons/bs";
import React, { useState } from "react";
import axiosInstance from "../tools/axios";
import { toast } from "react-toastify";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const HomeLeftContainer = ({
  setToggleRightContainer,
  setRightContainerCaller,
  toggleRightContainer,
  rightContainerCaller,
  handleToggleRightContainer,
  user_id,
  history,
  setHistory,
}) => {
  const [frenchText, setFrenchText] = useState("");
  const [englishText, setEnglishText] = useState("");
  const [saveText, setSavedText] = useState(false);
  const [translationId, setTranslationId] = useState("");
  const handleTranslate = (e) => {
    setSavedText(false);

    const request_data = {
      user_id: user_id,
      fr_text: frenchText,
      en_text: englishText,
    };
    axiosInstance.translate(request_data).then((res) => {
      if (res === 500) {
        toast.error("Server Error");
      } else {
        setFrenchText(res.data["translated_sentence"]);
        console.log("test", res.data);
        setTranslationId(res.data["translation_id"]);
        console.log("translationId", translationId);
      }
    });
  };
  const handleInputChange = (e) => {
    setEnglishText(e.target.value);
  };
  const handleSave = (e) => {
    setSavedText(!saveText);
    axiosInstance.save_translation(translationId).then((res) => {
      if (res.status === 200) {
        toast.success(res.data[0]["message"]);
        const updatedArrayOfDicts = [...history].map((dict) => {
          if (dict["translation_id"] === translationId) {
            return { ...dict, saved: dict["saved"] === 0 ? 1 : 0 }; // Create a new object with updated `saved` value
          }
          return dict; // Return the original object for other dictionaries
        });

        setHistory(updatedArrayOfDicts);
      } else {
        toast.error("Server Error");
      }
    });
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
            <div className="save_button" onClick={handleSave}>
              {saveText === false ? (
                <AiOutlineStar size={30} />
              ) : (
                <AiFillStar size={30} />
              )}
            </div>
          </div>
        </div>
        <HomeButtons
          setToggleRightContainer={setToggleRightContainer}
          setRightContainerCaller={setRightContainerCaller}
          rightContainerCaller={rightContainerCaller}
          handleTranslate={handleTranslate}
          handleToggleRightContainer={handleToggleRightContainer}
        />
      </div>
    </>
  );
};

export default HomeLeftContainer;
