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

export const calculateOverallScore = (summary, total) => {
  let score =
    ((Number(summary.promoters) - Number(summary.detractors)) / Number(total)) *
    100;
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
