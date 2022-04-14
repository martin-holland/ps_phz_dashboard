import React, { useState } from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { BsLightbulb } from "react-icons/bs";
import styled from "styled-components";
import "./Dashboard.css";
import BarChart from "../../components/chart/BarChart";
import Message from "../../components/message/Message";

const Main = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  transition: all 0.5s ease;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;
const TitleHead = styled.h1`
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

const SubTitie = styled.div`
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.backgroundColor};
`;
const ChartContainer = styled.div`
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.chartbackground};
`;
const MessageContainer = styled.div`
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.backgroundColor};
`;
const Dashboard = (props) => {
  //theme

  const changeTheme = () => {
    props.theme === "light" ? props.setTheme("dark") : props.setTheme("light");
  };
  const icon = props.theme === "light" ? <BsMoonStarsFill /> : <BsLightbulb />;

  return (
    <Main className="main">
      <div className="container">
        <div className="header-container">
          <TitleHead className="header">
            Net Promoter Score Calculation
          </TitleHead>
          <Toggle className="toggle-button" onClick={changeTheme}>
            {icon}
          </Toggle>
        </div>
        <SubTitie>
          <p>Net Promoter Score calculations with breakouts and deltas.</p>
        </SubTitie>
        <ChartContainer className="chart-container">
          <BarChart />
        </ChartContainer>
        <MessageContainer className="message-container">
          <Message />
        </MessageContainer>
      </div>
    </Main>
  );
};

export default Dashboard;
