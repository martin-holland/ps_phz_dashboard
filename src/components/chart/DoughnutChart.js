import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

const data = {
  datasets: [
    {
      data: [2, 21, 55],
      borderColor: ["rgba(255,206,86,0.2)"],
      backgroundColor: [
        "rgba(232,99,132,1)",
        "rgba(232,211,6,1)",
        "rgba(54,162,235,1)",
      ],
      pointBackgroundColor: "rgba(255,206,86,0.2)",
    },
  ],
};
const options = {
  responsive: true,
  legend: {
    display: false,
  },
};

const DoughnutChart = () => {
  return (
    <div className="doughnut-container">
      <div className="doughnut-number">75%</div>
      <Doughnut
        type="doughnut"
        data={data}
        options={options}
        className="doughnut"
      />
    </div>
  );
};

export default DoughnutChart;
