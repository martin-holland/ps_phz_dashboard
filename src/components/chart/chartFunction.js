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

export const getEachSummary = (dataToSummarise) => {
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
  return {
    promoters: promoters,
    passives: passives,
    detractors: detractors,
    errorData: errorData,
  };
};
export const getEachMessageSummary = (dataToSummarise) => {
  let promotersMessage = [];
  let detractorsMessage = [];
  let passivesMessage = [];

  dataToSummarise.forEach((result) => {
    if (result.surveyResult === "promoter") {
      promotersMessage.push(result.message);
    } else if (result.surveyResult === "passive") {
      detractorsMessage.push(result.message);
    } else if (result.surveyResult === "detractor") {
      passivesMessage.push(result.message);
    }
  });
  return {
    promotersMessage: promotersMessage,
    passivesMessage: passivesMessage,
    detractorsMessage: detractorsMessage,
  };
};
