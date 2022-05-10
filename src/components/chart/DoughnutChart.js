import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import "./DoughnutChart.css";

// Data Manipulation
import { getEachSummary } from "./chartFunction";
import { calculateOverallScore } from "./helperFunctions";

Chart.register(ArcElement);

const options = {
  responsive: true,
  legend: {
    display: false,
  },
};

const DoughnutChart = (props) => {
  const { results, currentNPS } = props;

  // Summarising Data:
  const [summary, setSummary] = useState({});
  let total = results.length;
  const calculateSummary = (dataToSummarise) => {
    setSummary(getEachSummary(results));
  };

  useEffect(() => {
    calculateSummary();
    //eslint-disable-next-line
  }, [results, currentNPS]);

  const data = {
    datasets: [
      {
        data: [summary.promoters, summary.passives, summary.detractors],
        borderColor: ["rgba(255,206,86,0.2)"],
        backgroundColor: ["#19aade", "#1de4bd", "#ef7e32"],
        pointBackgroundColor: "rgba(255,206,86,0.2)",
      },
    ],
  };

  // summary, total should be in here
  const overallScoreMarkup = calculateOverallScore(summary, total);
  return (
    <>
      <Doughnut
        type="doughnut"
        data={data}
        options={options}
        className="doughnut"
      />
      {overallScoreMarkup}
    </>
  );
};

export default DoughnutChart;
