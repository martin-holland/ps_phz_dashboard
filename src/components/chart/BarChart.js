import React, { useEffect, useState } from "react";
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
import { BsPersonPlus } from "react-icons/bs";

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
  maintainAspectRatio: false,
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
      //barThickness: 30,
      maxBarThickness: 30,
      label: "Promoters",
      data: [100, 289, 156, 134, 178, 123, 145, 178, 198, 123, 178, 234],
      backgroundColor: "#19aade",
    },
    {
      //barThickness: 30,
      maxBarThickness: 30,
      label: "passive",
      data: [23, 56, 69, 67, 89, 61, 23, 45, 24, 34, 89, 46],
      backgroundColor: "#1de4bd",
    },
    {
      // barThickness: 30,
      maxBarThickness: 30,
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
  const { results } = props;
  console.log("results from barchart: ", results);

  // Summarising Data:
  const [summary, setSummary] = useState({});

  let total = results.length;
  const calculateSummary = () => {
    if (results.length === 0) {
      console.log("results is empty");
    }
    let promoters = 0;
    let detractors = 0;
    let passives = 0;
    let errorData = 0;

    results.forEach((result) => {
      if (result.surveyResult === "promoter") {
        promoters++;
      } else if (result.surveyResult === "passive") {
        passives++;
      } else if (result.surveyResult === "detractor") {
        detractors++;
      } else {
        errorData++;
      }
    });
    setSummary({
      promoters: promoters,
      passives: passives,
      detractors: detractors,
      errorData: errorData,
    });
  };

  useEffect(() => {
    calculateSummary();
  }, []);

  return (
    <>
      <BarContainer className="bar-container">
        <Bar options={options} data={data} className="chart" />
      </BarContainer>
      <CircleContainer className="circle-container">
        <div className="circle-text-container">
          <p className="responses">Responses: {total}</p>
          <div className="score-container">
            <p className="promoters">Promoters: {summary.promoters}</p>
            <p className="passive">Passive: {summary.passives}</p>
            <p className="detractors">Detractors: {summary.detractors}</p>
          </div>
        </div>
        <div className="doughnut-container">
          <DoughnutChart results={results} />
        </div>
      </CircleContainer>
    </>
  );
};

export default BarChart;
