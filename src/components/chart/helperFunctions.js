export const summariseData = (dataToSummarise) => {
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
  const summaryObj = {
    promoters: promoters,
    passives: passives,
    detractors: detractors,
    errorData: errorData,
  };
  return summaryObj;
};

export const calculateOverallScore = (score) => {
  //  let score =
  //((Number(summary.promoters) - Number(summary.detractors)) / Number(total)) *
  // 100;
  score = Math.round(score);
  let scoreString = score.toString();
  if (isNaN(score)) {
    score = 0;
  }
  let idvalue = "zero";
  if (score < 0) {
    idvalue = "negative";
  }
  if (score > 0) {
    idvalue = "positive";
  }

  return (
    <div
      id={idvalue}
      className={`doughnut-number ${scoreString.length === 1 ? "one" : "two"}`}
    >
      {score}
    </div>
  );
};

export const calculateNPS = (
  rollingPromoters,
  rollingDetractors,
  rollingPassives
) => {
  // remove all unneeded entries:
  // let monthsToRemove = monthEnd - monthStart;
  // monthsToRemove = Math.abs(monthsToRemove);
  // console.log("Months to remove: ", monthsToRemove);
  // rollingPromoters.splice(0, monthsToRemove);
  // rollingDetractors.splice(0, monthsToRemove);
  // rollingPassives.splice(0, monthsToRemove);
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

export const getChartData = (
  rollingPromoters,
  rollingPassives,
  rollingDetractors,
  rollingMonths
) => {
  const data = {
    labels: rollingMonths,
    datasets: [
      {
        barThickness: 14,
        maxBarThickness: 20,
        label: "Promoters",
        data: rollingPromoters,
        backgroundColor: "#19aade",
      },
      {
        barThickness: 14,
        maxBarThickness: 20,
        label: "Passive",
        data: rollingPassives,
        backgroundColor: "#1de4bd",
      },
      {
        barThickness: 14,
        maxBarThickness: 20,
        label: "Detractors",
        data: rollingDetractors,
        backgroundColor: "#ef7e32",
      },
    ],
  };
  return data;
};

export const getOptions = (results) => {
  let total = results.length;
  const options = {
    plugins: {
      legend: {
        labels: {
          color: "black",
          font: {
            size: 16,
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
        stacked: false,
        ticks: {
          color: "black",
        },
      },
      y: {
        stacked: false,
        ticks: {
          color: "black",
        },
      },
    },
  };
  return options;
};
