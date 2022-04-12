import "./Header.css";
import { BsMoonStarsFill } from "react-icons/bs";
import { BsLightbulb } from "react-icons/bs";
import { useState } from "react";

const Header = () => {
  return (
    <div className="header">
      <p>Net Promoter Score Calculator</p>
      <div className="theme">
        {/* {darkmode && (
          <button  className={className}>
            <BsMoonStarsFill />
          </button>
        )} */}
        <button>
          <BsLightbulb size="30" />
        </button>
      </div>
    </div>
  );
};

export default Header;
