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

export const calculateOverallScore = (summary, total) => {
  console.log("From overall score: ", summary.promoters);
  let score =
    ((Number(summary.promoters) - Number(summary.detractors)) / Number(total)) *
    100;
  console.log("Overall Score: ", score);
  score = Math.round(score);
  let scoreString = score.toString();

  if (score >= 1) {
    return (
      <div
        id="positive"
        className={`doughnut-number ${
          scoreString.length === 1 ? "one" : "two"
        }`}
      >
        {score}
      </div>
    );
  } else if (score < 0) {
    return (
      <div
        id="negative"
        className={`doughnut-number ${
          scoreString.length === 1 ? "one" : "two"
        }`}
      >
        {score}
      </div>
    );
  }
  return (
    <div
      id="zero"
      className={`doughnut-number ${scoreString.length === 1 ? "one" : "two"}`}
    >
      {score}
    </div>
  );
};
