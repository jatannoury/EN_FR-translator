import React from "react";
import { AiOutlineArrowRight, AiOutlineStar, AiFillStar } from "react-icons/ai";

const History = ({
    toggled,
    english_text,
    french_text
}) => {
  return (
    <>
      <div className="history">
        <div className="history_description">
          <div className="from_to">
            <p>{"English "}</p>
            <span><AiOutlineArrowRight size={10}/></span>
            <p>{" French"}</p>
          </div>
          <div className="saved">
            {toggled===0?<AiOutlineStar size={20} /> : <AiFillStar size={20}/>}
          </div>
        </div>
        <span className="history_text">
          {english_text}
        </span>
        <span className="history_text history_french">
          {french_text}
        </span>
      </div>
    </>
  );
};

export default History;
