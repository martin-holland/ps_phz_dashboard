import React from "react";
import { StyledBurger } from "./Burger.styled";
import { bool, func } from "prop-types";
//Tippyjs
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/themes/translucent.css";

const Burger = ({ open, setOpen }) => {
  return (
    <Tippy theme="light" delay={250} content={<span>Menu</span>}>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
    </Tippy>
  );
};

Burger.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};

export default Burger;
