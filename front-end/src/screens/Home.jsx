import "../stylesheets/home.css";
import React, { useState } from "react";

import Header from "../components/Header";
import HomeLeftContainer from "../components/HomeLeftContainer";

const Home = () => {
  const [toggleRightContainer, setToggleRightContainer] = useState(false);
  const [rightContainerCaller, setRightContainerCaller] = useState("");

  return (
    <div className="main_container home_page">
      <Header />
      <div className="root_container">
        <HomeLeftContainer
          setToggleRightContainer={setToggleRightContainer}
          setRightContainerCaller={setRightContainerCaller}
          toggleRightContainer={toggleRightContainer}
          rightContainerCaller={rightContainerCaller}
        />
        <div
          className={`${
            toggleRightContainer === true
              ? "right_container_splitted"
              : "right_container"
          }`}
        >
          <h1>{rightContainerCaller}</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;