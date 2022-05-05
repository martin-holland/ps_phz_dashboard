import React, { useEffect, useState } from "react";
import "./BarChart.css";
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
import { months } from "../../util/months";

// Styles
import { BarContainer, CircleContainer } from "./BarChartStyles";

// Data conversion
import dayjs from "dayjs";
import { summariseData } from "./helperFunctions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = (props) => {
  const { results } = props;

  const Jan = [];
  const Feb = [];
  const Mar = [];
  const Apr = [];
  const May = [];
  const Jun = [];
  const Jul = [];
  const Aug = [];
  const Sep = [];
  const Oct = [];
  const Nov = [];
  const Dec = [];

  results.forEach((item) => {
    const month = dayjs(item.createdAt).month();
    if (month === 0) Jan.push(item);
    if (month === 1) Feb.push(item);
    if (month === 2) Mar.push(item);
    if (month === 3) Apr.push(item);
    if (month === 4) May.push(item);
    if (month === 5) Jun.push(item);
    if (month === 6) Jul.push(item);
    if (month === 7) Aug.push(item);
    if (month === 8) Sep.push(item);
    if (month === 9) Oct.push(item);
    if (month === 10) Nov.push(item);
    if (month === 11) Dec.push(item);
  });

  // Summarising Data:
  const [summary, setSummary] = useState({});
  const [janSummary, setJanSummary] = useState({});
  const [febSummary, setFebSummary] = useState({});
  const [marSummary, setMarSummary] = useState({});
  const [aprSummary, setAprSummary] = useState({});
  const [maySummary, setMaySummary] = useState({});
  const [junSummary, setJunSummary] = useState({});
  const [julSummary, setJulSummary] = useState({});
  const [augSummary, setAugSummary] = useState({});
  const [sepSummary, setSepSummary] = useState({});
  const [octSummary, setOctSummary] = useState({});
  const [novSummary, setNovSummary] = useState({});
  const [decSummary, setDecSummary] = useState({});

  let total = results.length;

  const options = {
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
          size: 14,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        // stacked: true,
        ticks: {
          color: "black",
        },
      },
      y: {
        // stacked: true,
        ticks: {
          color: "black",
        },
      },
    },
  };

  const calculateSummary = (dataToSummarise) => {
    if (dataToSummarise.length === 0) {
    }
    let promoters = 0;
    let detractors = 0;
    let passives = 0;
    let errorData = 0;

    dataToSummarise.forEach((result) => {
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

  const promoterSummaries = [
    janSummary.promoters,
    febSummary.promoters,
    marSummary.promoters,
    aprSummary.promoters,
    maySummary.promoters,
    junSummary.promoters,
    julSummary.promoters,
    augSummary.promoters,
    sepSummary.promoters,
    octSummary.promoters,
    novSummary.promoters,
    decSummary.promoters,
  ];

  const passiveSummaries = [
    janSummary.passives,
    febSummary.passives,
    marSummary.passives,
    aprSummary.passives,
    maySummary.passives,
    junSummary.passives,
    julSummary.passives,
    augSummary.passives,
    sepSummary.passives,
    octSummary.passives,
    novSummary.passives,
    decSummary.passives,
  ];

  const detractorSummaries = [
    janSummary.detractors,
    febSummary.detractors,
    marSummary.detractors,
    aprSummary.detractors,
    maySummary.detractors,
    junSummary.detractors,
    julSummary.detractors,
    augSummary.detractors,
    sepSummary.detractors,
    octSummary.detractors,
    novSummary.detractors,
    decSummary.detractors,
  ];

  let thisMonth = new Date().getMonth();
  thisMonth = thisMonth - 11;

  const rollingMonths = [
    ...months.slice(thisMonth),
    ...months.slice(0, thisMonth),
  ];

  const rollingPromoters = [
    ...promoterSummaries.slice(thisMonth),
    ...promoterSummaries.slice(0, thisMonth),
  ];
  const rollingPassives = [
    ...passiveSummaries.slice(thisMonth),
    ...passiveSummaries.slice(0, thisMonth),
  ];
  const rollingDetractors = [
    ...detractorSummaries.slice(thisMonth),
    ...detractorSummaries.slice(0, thisMonth),
  ];

  console.log("Rolling Promoters", rollingPromoters);

  useEffect(() => {
    calculateSummary(results);
    setJanSummary(summariseData(Jan));
    setFebSummary(summariseData(Feb));
    setMarSummary(summariseData(Mar));
    setAprSummary(summariseData(Apr));
    setMaySummary(summariseData(May));
    setJunSummary(summariseData(Jun));
    setJulSummary(summariseData(Jul));
    setAugSummary(summariseData(Aug));
    setSepSummary(summariseData(Sep));
    setOctSummary(summariseData(Oct));
    setNovSummary(summariseData(Nov));
    setDecSummary(summariseData(Dec));
    // setNoDataSummary(summariseData(noDate));

    //eslint-disable-next-line
  }, [props]);

  const data = {
    labels: rollingMonths,
    datasets: [
      {
        barThickness: 20,
        maxBarThickness: 15,
        label: "Promoters",
        data: rollingPromoters,
        backgroundColor: "#19aade",
      },
      {
        barThickness: 20,
        // maxBarThickness: 15,
        label: "Passive",
        data: rollingPassives,
        backgroundColor: "#1de4bd",
      },
      {
        barThickness: 20,
        // maxBarThickness: 15,
        label: "Detractors",
        data: rollingDetractors,
        backgroundColor: "#ef7e32",
      },
    ],
  };

  let currentNPS =
    ((rollingPromoters[0] - rollingDetractors[0]) /
      (rollingPromoters[0] + rollingDetractors[0] + rollingPassives[0])) *
    100;

  //console.log("current nps", Math.floor(currentNPS));

  let IntcurrentNPS = Math.round(currentNPS);

  let lastMonthNPS =
    ((rollingPromoters[11] - rollingDetractors[11]) /
      (rollingPromoters[11] + rollingDetractors[11] + rollingPassives[11])) *
    100;

  //console.log("last month nps", Math.floor(lastMonthNPS));
  let IntLastmonthNPS = Math.round(lastMonthNPS);

  if (isNaN(IntLastmonthNPS)) {
    IntLastmonthNPS = "No Data";
  }
  if (isNaN(IntcurrentNPS)) {
    IntcurrentNPS = "No Data";
  }
  return (
    <>
      <BarContainer className="bar-container">
        <div className="chart">
          <Bar options={options} data={data} id="myChart" />
        </div>
      </BarContainer>
      <CircleContainer className="circle-container">
        <div className="parent-box">
          <div className="lastMonthNPS">Previous Score : {IntLastmonthNPS}</div>
          <div className="currentMonthNPS">
            Promoter Score : {IntcurrentNPS}
          </div>
        </div>
        <div className="doughnut-parent">
          <div className="score-container">
            <p className="promoters">Promoters: {summary.promoters}</p>
            <p className="passive">Passive: {summary.passives}</p>
            <p className="detractors">Detractors: {summary.detractors}</p>
          </div>
          <div className="doughnut-container">
            <DoughnutChart results={results} currentNPS={currentNPS} />
          </div>
        </div>
      </CircleContainer>
    </>
  );
};

export default BarChart;
