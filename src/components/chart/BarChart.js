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

  //monthly message state
  const [janMessage, setJanMessage] = useState({});
  const [febMessage, setFebMessage] = useState({});
  const [marMessage, setMarMessage] = useState({});
  const [aprMessage, setAprMessage] = useState({});
  const [mayMessage, setMayMessage] = useState({});
  const [junMessage, setJunMessage] = useState({});
  const [julMessage, setJulMessage] = useState({});
  const [augMessage, setAugMessage] = useState({});
  const [sepMessage, setSepMessage] = useState({});
  const [octMessage, setOctMessage] = useState({});
  const [novMessage, setNovMessage] = useState({});
  const [decMessage, setDecMessage] = useState({});

  const options = getOptions(results);

  const calculateSummary = (dataToSummarise) => {
    setSummary(summariseData(results));
  };
  const calculateMessageSummary = (dataToSummarise) => {
    setMessageSummary(getEachMessageSummary(results));
  };

  let monthsSummaryArray = [
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
  const promoterSummaries = monthsSummaryArray.map((month) => month.promoters);
  const passiveSummaries = monthsSummaryArray.map((month) => month.passives);
  const detractorSummaries = monthsSummaryArray.map(
    (month) => month.detractors
  );

  console.log("paSummary", passiveSummaries);
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

  let monthsArray = [
    janMessage,
    febMessage,
    marMessage,
    aprMessage,
    mayMessage,
    junMessage,
    julMessage,
    augMessage,
    sepMessage,
    octMessage,
    novMessage,
    decMessage,
  ];

  const rollingMsgMonths = [
    ...monthsArray.slice(thisMonth),
    ...monthsArray.slice(0, thisMonth),
  ];

  console.log("rollingmonthMsg", rollingMsgMonths[11]);
  useEffect(() => {
    calculateSummary(results);
    calculateMessageSummary(results);
    //setting monthly data summary
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
    //Setting monthly message summary
    setJanMessage(getEachMessageSummary(Jan));
    setFebMessage(getEachMessageSummary(Feb));
    setMarMessage(getEachMessageSummary(Mar));
    setAprMessage(getEachMessageSummary(Apr));
    setMayMessage(getEachMessageSummary(May));
    setJunMessage(getEachMessageSummary(Jun));
    setJulMessage(getEachMessageSummary(Jul));
    setAugMessage(getEachMessageSummary(Aug));
    setSepMessage(getEachMessageSummary(Sep));
    setOctMessage(getEachMessageSummary(Oct));
    setNovMessage(getEachMessageSummary(Nov));
    setDecMessage(getEachMessageSummary(Dec));
    //eslint-disable-next-line
  }, [props]);

  //function for clickable chart event
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

    let clickedMonth = rollingMonths[barIndex];
    console.log(clickedMonth);

    let clickedMessage;
    const messageContainer = document.getElementById("message-container");
    messageContainer.innerText = "";

    let messageParaTitle;
    messageParaTitle = document.createElement("p");
    messageParaTitle.setAttribute("class", "msgParaTitle");
    if (clickedRating === "Promoters") {
      clickedMessage = rollingMsgMonths[barIndex].promotersMessage;

      messageParaTitle.innerText = `${clickedMonth}: Promoters Feedback`;
      messageParaTitle.setAttribute("class", "promotersmsg");
    } else if (clickedRating === "Passive") {
      clickedMessage = rollingMsgMonths[barIndex].passivesMessage;

      messageParaTitle.innerText = `${clickedMonth}: Passives Feedback`;
      messageParaTitle.setAttribute("class", "passivesmsg");
    } else if (clickedRating === "Detractors") {
      clickedMessage = rollingMsgMonths[barIndex].detractorsMessage;

      messageParaTitle.innerText = `${clickedMonth}: Detractors Feedback`;
      messageParaTitle.setAttribute("class", "detractorsmsg");
    }
    messageContainer.appendChild(messageParaTitle);
    console.log("clickedMessage", clickedMessage);
    let messagePara;

    if (clickedMessage) {
      for (const msg of clickedMessage) {
        messagePara = document.createElement("p");
        messagePara.setAttribute("class", "msgPara");
        messagePara.innerHTML = msg;
        messageContainer.appendChild(messagePara);
      }
    }
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
        <div className="overall-data">Overall Scores</div>
      </CircleContainer>
    </>
  );
};

export default BarChart;
