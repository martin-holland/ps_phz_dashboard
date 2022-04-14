import React from "react";
import "./BarChart.css";
import styled from "styled-components";
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
import DoughnutChart from "./DoughnutChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  plugins: {
    legend: {
      labels: {
        color: "black",
        font: {
          size: 18,
        },
      },
    },
    autocolors: false,
    title: {
      display: true,
      text: "Total respondents 450",
      color: "white",
    },
  },
  responsive: true,

  scales: {
    xAxes: {
      stacked: true,
      ticks: {
        color: "black",
      },
    },
    y: {
      stacked: true,
      ticks: {
        color: "black",
      },
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
      barThickness: 30,
      maxBarThickness: 40,
      label: "Promoters",
      data: [100, 289, 156, 134, 178, 123, 145, 178, 198, 123, 178, 234],
      backgroundColor: "#19aade",
    },
    {
      barThickness: 30,
      maxBarThickness: 40,
      label: "passive",
      data: [23, 56, 69, 67, 89, 61, 23, 45, 24, 34, 89, 46],
      backgroundColor: "#1de4bd",
    },
    {
      barThickness: 30,
      maxBarThickness: 40,
      label: "Detractors",
      data: [78, 34, 35, 27, 89, 78, 96, 85, 56, 34, 67, 45],
      backgroundColor: "#ef7e32",
    },
  ],
};
const BarContainer = styled.div`
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.chartbackground};
`;
const CircleContainer = styled.div`
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.chartbackground};
`;
const BarChart = (props) => {
  return (
    <>
      <BarContainer className="bar-container">
        <Bar options={options} data={data} className="chart" />
      </BarContainer>
      <CircleContainer className="circle-container">
        <div className="circle-text-container">
          <p className="responses">Responses: 205</p>
          <div className="score-container">
            <p className="promoters">Promoters: 335</p>
            <p className="passive">Passive: 24</p>
            <p className="detractors">Detractors: 45</p>
          </div>
          <div>
            <DoughnutChart />
          </div>
        </div>
      </CircleContainer>
    </>
  );
};

export default BarChart;
