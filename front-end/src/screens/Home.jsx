import "../stylesheets/home.css";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import HomeLeftContainer from "../components/HomeLeftContainer";
import { AiOutlineArrowRight, AiOutlineStar } from "react-icons/ai";
import axiosInstance from "../tools/axios";
import History from "../components/History";

const Home = () => {
  const [toggleRightContainer, setToggleRightContainer] = useState(false);
  const [rightContainerCaller, setRightContainerCaller] = useState("");
  const [history, setHistory] = useState([]);
  const handleToggleRightContainer = (button_clicked) => {
    console.log(rightContainerCaller);
    if (button_clicked === "History") {
      axiosInstance.get_history(params.id).then((res) => {
        setHistory(res.data["Items"]);
      });
    }
  };
  const params = useParams();
  return (
    <div className="main_container home_page">
      <Header />
      <div className="root_container">
        <HomeLeftContainer
          setToggleRightContainer={setToggleRightContainer}
          setRightContainerCaller={setRightContainerCaller}
          toggleRightContainer={toggleRightContainer}
          rightContainerCaller={rightContainerCaller}
          handleToggleRightContainer={handleToggleRightContainer}
          user_id={params.id}
          history={history}
          setHistory={setHistory}
        />
        <div
          className={`${
            toggleRightContainer === true
              ? "right_container_splitted"
              : "right_container"
          }`}
        >
          {history.map((element) => {
            return (
              <History
                toggled={element["saved"]}
                french_text={element["fr_text"]}
                english_text={element["en_text"]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
