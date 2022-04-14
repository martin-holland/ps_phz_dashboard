import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
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
