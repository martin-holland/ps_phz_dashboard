import React from "react";
import { StyledMenu } from "./Menu.styled";
import { bool } from "prop-types";
import psLogo from "../../assets/favicon-ps.svg";
import { Link } from "react-router-dom";

const Menu = ({ open }, props) => {
  const closeMenu = () => {
    // const navBar = document.querySelectorAll("nav");
    // navBar.addEventListener("mouseleave", (e) => {
    //   e.target.style.transform = "translateX(-100%)";
    //   console.log("mouse leave event triggered");
    // });
  };
  return (
    <StyledMenu open={open} onMouseLeave={closeMenu}>
      <a
        href="https://en.wikipedia.org/wiki/Net_promoter_score"
        target="_blank"
        rel="noreferrer"
      >
        <div style={{ display: "flex", alignItems: "center", width: "20vw" }}>
          <span role="img" aria-label="about us">
            <img
              alt="logo"
              src={psLogo}
              style={{ height: "30px", width: "30px", marginRight: "1rem" }}
            />
          </span>
          What is Promoter Score?
        </div>
      </a>
      <a href="/statistics" target="_blank" rel="noreferrer">
        <div style={{ display: "flex", alignItems: "center", width: "20vw" }}>
          <span role="img" aria-label="about us">
            <img
              alt="logo"
              src={psLogo}
              style={{ height: "30px", width: "30px", marginRight: "1rem" }}
            />
          </span>
          Statistics
        </div>
      </a>
      {/* <a href="/" target="_blank" rel="noreferrer"> */}
      <Link to="/dashboard">
        <div style={{ display: "flex", alignItems: "center", width: "20vw" }}>
          <span role="img" aria-label="about us">
            <img
              alt="logo"
              src={psLogo}
              style={{ height: "30px", width: "30px", marginRight: "1rem" }}
            />
          </span>
          Dashboard
        </div>
      </Link>
      {/* </a> */}
    </StyledMenu>
  );
};

Menu.propTypes = {
  open: bool.isRequired,
};
export default Menu;
