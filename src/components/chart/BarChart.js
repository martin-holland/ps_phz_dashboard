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
    console.log(month);
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
    // if (isNaN(month)) noDate.push(item);
  });

  // console.log(
  //   "Months: ",
  //   Jan,
  //   Feb,
  //   Mar,
  //   Apr,
  //   May,
  //   Jun,
  //   Jul,
  //   Aug,
  //   Sep,
  //   Oct,
  //   Nov,
  //   Dec
  //   // "No Date Info: ",
  //   // noDate
  // );
  // console.log("Months: ", Jan, Feb, Mar, Apr, May, Jun);

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
  // const [noDataSummary, setNoDataSummary] = useState({});

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
          size: 18,
        },
        padding: 10,
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

  const calculateSummary = (dataToSummarise) => {
    if (dataToSummarise.length === 0) {
      console.log("results is empty");
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
  const months1 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const convertedDates = results.map((item) =>
    new Date(item.createdAt).toUTCString()
  );
  console.log(convertedDates);
  const filterDate = (months) => {
    let start = new Date(document.getElementById("start").value).toUTCString();
    console.log(start);
    let end = new Date(document.getElementById("end").value).toUTCString();
    console.log(end);
  };

  // const filterDate = () => {
  //   let start = new Date(document.getElementById("start").value);
  //   let isoStartDate = new Date(start).toISOString().split("-");
  //   // console.log(start);
  //   let end = new Date(document.getElementById("end").value);
  //   let isoEndDate = new Date(end).toISOString().split("-");
  //   console.log(end);

  //   let start_month_index = parseInt(isoStartDate[1], 10) - 1;
  //   console.log("The start month is " + months[start_month_index]);
  //   let end_month_index = parseInt(isoEndDate[1], 10) - 1;
  //   console.log("The end month is " + months[end_month_index]);
  //};

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
  }, []);

  console.log("Summary:", summary);
  console.log("April Summary: ", aprSummary);
  console.log("April Promoters: ", aprSummary.promoters);

  const data = {
    labels: months1,
    datasets: [
      {
        barThickness: 40,
        maxBarThickness: 25,

        label: "Promoters",
        data: [
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
          // noDataSummary.promoters,
        ],
        backgroundColor: "#19aade",
      },
      {
        barThickness: 40,
        maxBarThickness: 25,
        label: "Passive",
        data: [
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
          // noDataSummary.passives,
        ],
        backgroundColor: "#1de4bd",
      },
      {
        barThickness: 40,
        maxBarThickness: 25,
        label: "Detractors",
        data: [
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
          // noDataSummary.detractors,
        ],
        backgroundColor: "#ef7e32",
      },
    ],
  };

  return (
    <>
      <BarContainer className="bar-container">
        <div className="chart">
          <Bar options={options} data={data} id="myChart" />
        </div>
        <div className="datefilter-box">
          Start:
          <input type="date" id="start" />
          End:
          <input type="date" id="end" />
          <button onClick={filterDate}>Filter</button>
          <button>Reset</button>
        </div>
      </BarContainer>
      <CircleContainer className="circle-container">
        <div className="score-container">
          <p className="promoters">Promoters: {summary.promoters}</p>
          <p className="passive">Passive: {summary.passives}</p>
          <p className="detractors">Detractors: {summary.detractors}</p>
        </div>
        <div className="doughnut-container">
          <DoughnutChart results={results} />
        </div>
      </CircleContainer>
    </>
  );
};

export default BarChart;
