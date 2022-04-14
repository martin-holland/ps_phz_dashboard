import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import "./DoughnutChart.css";
Chart.register(ArcElement);

const data = {
  datasets: [
    {
      data: [79, 15, 55],
      borderColor: ["rgba(255,206,86,0.2)"],
      backgroundColor: ["#19aade", "#1de4bd", "#ef7e32"],
      pointBackgroundColor: "rgba(255,206,86,0.2)",
    },
  ],
};
const options = {
  responsive: true,
  legend: {
    display: false,
  },
  elements: {
    center: {
      text: "80%",
      color: "#FF6384", // Default is #000000
      fontStyle: "Arial", // Default is Arial
      sidePadding: 20, // Default is 20 (as a percentage)
      minFontSize: 25, // Default is 20 (in px), set to false and text will not wrap.
      lineHeight: 25,
    },
  },
};

const DoughnutChart = () => {
  return (
    <>
      <Doughnut
        type="doughnut"
        data={data}
        options={options}
        className="doughnut"
      />
      <div className="doughnut-number">75%</div>
    </>
  );
};

export default DoughnutChart;
