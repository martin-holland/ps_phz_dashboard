import React from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { BsLightbulb } from "react-icons/bs";
import styled from "styled-components";
import "./Dashboard.css";
const Main = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  transition: all 0.5s ease;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.backgroundColor};
  transition: all 0.5s ease;
  margin: 1rem;
  font-size: 1.5rem;
`;
const Toggle = styled.button`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 10px;
  height: 30px;
  width: 40px;
  margin-top: 1rem;
  border-radius: 5px;
  transition: all 0.5s ease;

  &:focus {
    outline: none;
  }
`;
const Dashboard = (props) => {
  const changeTheme = () => {
    props.theme === "light" ? props.setTheme("dark") : props.setTheme("light");
  };
  const icon = props.theme === "light" ? <BsMoonStarsFill /> : <BsLightbulb />;
  return (
    <Main className="main">
      <Title className="header">Net Promoter Score Calculation</Title>
      <Toggle className="toggle-button" onClick={changeTheme}>
        {icon}
      </Toggle>
    </Main>
  );
};

export default Dashboard;
