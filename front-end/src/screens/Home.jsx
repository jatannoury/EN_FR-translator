import React from "react";
import "../stylesheets/home.css";
import { BsTranslate } from "react-icons/bs";
import { GoHistory } from "react-icons/go";
import { HiSwitchHorizontal } from "react-icons/hi";
import { AiOutlineStar } from "react-icons/ai";
import Header from "../components/Header";

const Home = () => {
  
  return (
    <div className="main_container home_page">
      <Header/>
      <div className="title_container">
        <BsTranslate size={40} />
        <p>Translate</p>
      </div>
      <div className="translator_container">
        <div className="input_container">
          <textarea
            className="input_textarea"
            placeholder="Enter text to translate"
          ></textarea>
        </div>

        <div className="output_container">
          <textarea
            className="output_textarea"
            placeholder="Translation will appear here"
            readOnly
          ></textarea>
        </div>
      </div>
      <div className="extra_buttons_container">
        <button className="extra_button">
          <GoHistory size={30} className="extra_buttons_icons" />
        </button>
        <button className="extra_button">
          <AiOutlineStar size={30} className="extra_buttons_icons" />
        </button>
      </div>
      <div className="translate_button_container">
        <button className="translate_button">
          <HiSwitchHorizontal size={30} className="switch_languages" />
        </button>
      </div>
    </div>
  );
};

export default Home;
