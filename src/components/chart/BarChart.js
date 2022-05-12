import React, { useEffect, useState, useRef } from "react";

//chartjs
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
import { getChartData } from "./helperFunctions";
import { getOptions } from "./helperFunctions";
import { getElementAtEvent } from "react-chartjs-2";
// Styles
import { BarContainer, CircleContainer } from "./BarChartStyles";
import "./BarChart.css";

// Data conversion
import dayjs from "dayjs";
import { summariseData } from "./helperFunctions";
import { calculateNPS, getEachMessageSummary } from "./chartFunction";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = (props) => {
  const { results, loadingData } = props;
  const [NPSScores, setNPSScores] = useState();

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
  //eslint-disable-next-line
  const [messageSummary, setMessageSummary] = useState({});
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

  const options = getOptions(results);

  const calculateSummary = (dataToSummarise) => {
    setSummary(summariseData(results));
  };
  const calculateMessageSummary = (dataToSummarise) => {
    setMessageSummary(getEachMessageSummary(results));
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

  useEffect(() => {
    calculateSummary(results);
    calculateMessageSummary(results);
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

  console.log("NPS Scores: ", NPSScores);

  const chartRef = useRef();

  const onClick = (event, element) => {
    console.log("clicked bar");
    const clickedElement = getElementAtEvent(chartRef.current, event);
    console.log(clickedElement);
    const barIndex = clickedElement[0].index;
    console.log(barIndex);
    console.log(
      "type",
      clickedElement[0].element.$context.dataset.data[barIndex]
    );
    let clickedRating = clickedElement[0].element.$context.dataset.label;
    console.log(clickedRating);
    console.log(clickedElement[0].element.$context.parsed.x);
  };
  useEffect(() => {
    setNPSScores(
      calculateNPS(rollingPromoters, rollingDetractors, rollingPassives)
    );

    //eslint-disable-next-line
  }, [results]);
  return (
    <>
      <BarContainer className="bar-container">
        <div className="chart">
          <Bar
            options={options}
            data={getChartData(
              rollingPromoters,
              rollingPassives,
              rollingDetractors,
              rollingMonths
            )}
            id="myChart"
            ref={chartRef}
            onClick={onClick}
          />
        </div>
      </BarContainer>
      <CircleContainer className="circle-container">
        <div className="parent-box">
          <div className="lastMonthNPS">
            Last month:{" "}
            {!loadingData
              ? NPSScores
                ? NPSScores.lastMonthNPS
                : "No Data"
              : "Loading"}
          </div>
          <div className="currentMonthNPS">
            This month:{" "}
            {!loadingData
              ? NPSScores
                ? NPSScores.currentNPS
                : "No Data"
              : "Loading"}
          </div>
        </div>
        <div className="doughnut-parent">
          <div className="score-container">
            <p className="promoters">Promoters: {summary.promoters}</p>
            <p className="passive">Passive: {summary.passives}</p>
            <p className="detractors">Detractors: {summary.detractors}</p>
          </div>
          <div className="doughnut-container">
            <DoughnutChart results={results} />
          </div>
        </div>
      </CircleContainer>
    </>
  );
};

export default BarChart;
