export const summariseData = (dataToSummarise) => {
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
  const summaryObj = {
    promoters: promoters,
    passives: passives,
    detractors: detractors,
    errorData: errorData,
  };
  return summaryObj;
};
