import React, { useEffect, useState } from "react";
//chart
import { Line } from "react-chartjs-2";
//eslint-disable-next-line
import Chart from "chart.js/auto";

//helper functions
import { summariseData } from "./helperFunctions";

//styles
import styled from "styled-components";
import "./LineChart.css";

import dayjs from "dayjs";

const LineContainer = styled.div`
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.chartbackground};
`;

const LineChart = (props) => {
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
  // let total = results.length;

  //eslint-disable-next-line
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

  const [npsScore, setNpsScore] = useState([]);
  // const [janNps, setJanNps] = useState();
  // const [febNps, setFebNps] = useState();
  // const [marNps, setMarNps] = useState();
  // const [aprNps, setAprNps] = useState();
  // const [mayNps, setMayNps] = useState();
  // const [junNps, setJunNps] = useState();
  // const [julNps, setJulNps] = useState();
  // const [augNps, setAugNps] = useState();
  // const [sepNps, setSepNps] = useState();
  // const [octNps, setOctNps] = useState();
  // const [novNps, setNovNps] = useState();
  // const [decNps, setDecNps] = useState();

  const calculateSummary = (dataToSummarise) => {
    setSummary(summariseData(results));
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
  const monthlySummary = [
    janSummary,
    febSummary,
    marSummary,
    aprSummary,
    maySummary,
    junSummary,
    julSummary,
    augSummary,
    sepSummary,
    octSummary,
    novSummary,
    decSummary,
  ];

  const options = {
    type: "line",
    indexAxis: "x",
    plugins: {
      legend: {
        labels: {
          color: `${props.theme.color}`,
          font: {
            size: 18,
          },
        },
      },

      autocolors: false,
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

    //eslint-disable-next-line
  }, [props]);

  const calculateNpsScore = (summary) => {
    if (rollingPromoters === undefined && rollingDetractors === undefined) {
      return "results is empty";
    }
    let score1 = [];
    for (let i = 0; i <= rollingMonths.length - 1; i++) {
      let total1 =
        rollingPromoters[i] + rollingPassives[i] + rollingDetractors[i];
      let score = ((rollingPromoters[i] - rollingDetractors[i]) / total1) * 100;
      score = Math.round(score);

      if (isNaN(score)) {
        score = 0;
      }
      score1.push(score);
    }
    setNpsScore(score1);
  };

  useEffect(() => {
    calculateNpsScore(monthlySummary);
    //eslint-disable-next-line
  }, [
    props,
    janSummary,
    febSummary,
    marSummary,
    aprSummary,
    maySummary,
    junSummary,
    julSummary,
    augSummary,
    sepSummary,
    octSummary,
    novSummary,
    decSummary,
  ]);

  const data = {
    labels: rollingMonths,
    datasets: [
      {
        label: "Promoter Score",
        data: npsScore,
        tension: 0.5,
        type: "line",
        borderWidth: 2,
        borderColor: "#BAB8B7",
        backgroundColor: "#0E5881",
      },
    ],
  };
  return (
    <LineContainer>
      <div className="linechart">
        {npsScore && <Line options={options} data={data} id="myChart" />}
      </div>
    </LineContainer>
  );
};

export default LineChart;
