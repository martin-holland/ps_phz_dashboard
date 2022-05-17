export const calculateNPS = (
  rollingPromoters,
  rollingDetractors,
  rollingPassives
) => {
  console.log("Rolling Promoters: ", rollingPromoters);
  console.log("Rolling Detractors: ", rollingDetractors);
  console.log("Rolling Passives: ", rollingPassives);
  const currentNPS =
    ((rollingPromoters[rollingPromoters.length - 1] -
      rollingDetractors[rollingDetractors.length - 1]) /
      (rollingPromoters[rollingPromoters.length - 1] +
        rollingDetractors[rollingDetractors.length - 1] +
        rollingPassives[rollingPassives.length - 1])) *
    100;

  const lastMonthNPS =
    ((rollingPromoters[rollingPromoters.length - 2] -
      rollingDetractors[rollingDetractors.length - 2]) /
      (rollingPromoters[rollingPromoters.length - 2] +
        rollingDetractors[rollingDetractors.length - 2] +
        rollingPassives[rollingPassives.length - 2])) *
    100;

  console.log("Current NPS: ", currentNPS);
  console.log("lastMonthNPS: ", lastMonthNPS);

  let IntcurrentNPS = Math.round(currentNPS);
  let IntLastmonthNPS = Math.round(lastMonthNPS);

  if (isNaN(IntLastmonthNPS)) {
    IntLastmonthNPS = "No Data";
  }
  if (isNaN(IntcurrentNPS)) {
    IntcurrentNPS = "No Data";
  }

  const NPSScores = {
    currentNPS: IntcurrentNPS,
    lastMonthNPS: IntLastmonthNPS,
  };
  return NPSScores;
};

export const getEachMessageSummary = (dataToSummarise) => {
  let promotersMessage = [];
  let detractorsMessage = [];
  let passivesMessage = [];

  dataToSummarise.forEach((result) => {
    if (result.surveyResult === "promoter") {
      promotersMessage.push(result.message);
    } else if (result.surveyResult === "passive") {
      passivesMessage.push(result.message);
    } else if (result.surveyResult === "detractor") {
      detractorsMessage.push(result.message);
    }
  });
  return {
    promotersMessage: promotersMessage,
    passivesMessage: passivesMessage,
    detractorsMessage: detractorsMessage,
  };
};

export const getLineOptions = (props) => {
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
      layout: { padding: { bottom: 0.5 } },

      autocolors: false,
    },
    responsive: true,
    hoverRadius: 12,
    hoverBackgroundColor: "#ef7e32",
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
  return options;
};
