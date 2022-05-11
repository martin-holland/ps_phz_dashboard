import React from "react";
import { StyledMenu } from "./Menu.styled";
import { bool } from "prop-types";
import psLogo from "../../assets/favicon-ps.svg";

const Menu = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <a
        href="https://en.wikipedia.org/wiki/Net_promoter_score"
        target="_blank"
        rel="noreferrer"
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span role="img" aria-label="about us">
            <img
              alt="logo"
              src={psLogo}
              style={{ height: "25px", width: "25px", marginRight: "1rem" }}
            />
          </span>
          What is PS?
        </div>
      </a>
    </StyledMenu>
  );
};

Menu.propTypes = {
  open: bool.isRequired,
};
export default Menu;
