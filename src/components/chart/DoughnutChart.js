import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import "./DoughnutChart.css";
// Data Manipulation
import { calculateOverallScore } from "./helperFunctions";

Chart.register(ArcElement);

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

const DoughnutChart = (props) => {
  const { results } = props;

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
    //eslint-disable-next-line
  }, []);

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

  console.log("Summary from Doughnut: ", summary);
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
