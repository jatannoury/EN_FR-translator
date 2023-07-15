import HomeButtons from "../components/HomeButtons";
import { BsTranslate } from "react-icons/bs";

const HomeLeftContainer = ({
  setToggleRightContainer,
  setRightContainerCaller,
  toggleRightContainer,
  rightContainerCaller,
}) => {
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
        <HomeButtons
          setToggleRightContainer={setToggleRightContainer}
          setRightContainerCaller={setRightContainerCaller}
          rightContainerCaller={rightContainerCaller}
        />
      </div>
    </>
  );
};

export default HomeLeftContainer;
