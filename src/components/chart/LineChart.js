import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import styled from "styled-components";
import "./LineChart.css";
import dayjs from "dayjs";

const LineContainer = styled.div`
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.chartbackground};
`;

const LineChart = (props) => {
  const { results } = props;
  // let sun = [];
  // let mon = [];
  // let tue = [];
  // let wed = [];
  // let thur = [];
  // let fri = [];
  // let sat = [];

  //sorting items according to month
  // results.forEach((item) => {
  //   const week = dayjs(item.createdAt).week();
  //   console.log(week);
  //   if (week === 0) sun.push(item);
  //   if (week === 1) mon.push(item);
  //   if (week === 2) tue.push(item);
  //   if (week === 3) wed.push(item);
  //   if (week === 4) thur.push(item);
  //   if (week === 5) fri.push(item);
  //   if (week === 6) sat.push(item);

  //   // if (isNaN(month)) noDate.push(item);
  // });

  let total = results.length;
  const options = {
    type: "line",
    indexAxis: "x",
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
        text: `Total respondents ${total}`,
        color: "black",
        font: {
          size: 18,
        },
        padding: 10,
      },
    },
    responsive: true,
    hoverRadius: 12,
    hoverBackgroundColor: "yellow",
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        ticks: {
          color: "black",
        },
      },
      y: {
        display: true,
        beginAtZero: true,
        ticks: {
          color: "black",
        },
      },
    },
  };
  const months = [
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
  const data = {
    labels: months,
    datasets: [
      {
        label: "Nps",
        data: [-10, -20, -3, 54, 54, 62, 67, 46, 78, 29, 10, 22],
        tension: 0.5,
        type: "line",
        backgroundColor: "#0E5881",
        // fill: true,
      },
    ],
  };
  return (
    <LineContainer>
      <div className="linechart">
        <Line options={options} data={data} id="myChart" />
      </div>
    </LineContainer>
  );
};

export default LineChart;
