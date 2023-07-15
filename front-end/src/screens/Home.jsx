import React from "react";
import "../stylesheets/home.css";
import {BsTranslate} from "react-icons/bs"
const Home = () => {
  return (
    <div className="main_container home_page">

      <div className="title_container">
        <BsTranslate size={40} />
        <p >Translate</p>
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
    </div>
  );
};

export default Home;
