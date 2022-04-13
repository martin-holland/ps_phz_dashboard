import React, { useState } from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { BsLightbulb } from "react-icons/bs";
import styled from "styled-components";
import "./Dashboard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Total respondents 450",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};
const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const data = {
  labels,
  datasets: [
    {
      label: "Promoters",
      data: [100, 289, 156, 134, 178, 123, 145, 178, 198, 123, 178, 234],
      backgroundColor: "#19aade",
    },
    {
      label: "passive",
      data: [23, 56, 69, 67, 89, 61, 23, 45, 24, 34, 89, 46],
      backgroundColor: "#1de4bd",
    },
    {
      label: "Detractors",
      data: [78, 34, 35, 27, 89, 78, 96, 85, 56, 34, 67, 45],
      backgroundColor: "#ef7e32",
    },
  ],
  options: {
    events: ["click"],
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Food Chart",
        font: {
          size: 24,
        },
        color: "black",
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
  },
};

const Dashboard = (props) => {
  //theme
  const changeTheme = () => {
    props.theme === "light" ? props.setTheme("dark") : props.setTheme("light");
  };
  const icon = props.theme === "light" ? <BsMoonStarsFill /> : <BsLightbulb />;

  //Chart

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
        <div className="sub-title">
          <p>Net Promoter Score calculations with breakouts and deltas.</p>
        </div>
        <div className="chart-container">
          <Bar options={options} data={data} className="chart" />
        </div>
      </div>
    </Main>
  );
};

export default Dashboard;
