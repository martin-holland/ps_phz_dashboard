import React, { useEffect, useState } from "react";

// Equation for T score (basic statistical sampling)
// z = (X-μ)/σ
// X is the sample size
// σ is the population standard deviation and
// μ is the population mean.

export default function Confidence(props) {
  const { results } = props;

  const [allResults, setAllResults] = useState();
  const [std, setStd] = useState();
  const [resultsMean, setResultsMean] = useState();
  const [confidenceScore, setConfidenceScore] = useState();

  const putResultsInArray = () => {
    const resultsAsArray = [];
    if (results.length > 0) {
      results.forEach((result) => {
        resultsAsArray.push(result.choice);
      });
    }
    setStd(stdOfResults(resultsAsArray));
    return resultsAsArray;
  };

  const stdOfResults = (arr) => {
    let mean =
      arr.reduce((acc, curr) => {
        return acc + curr;
      }, 0) / arr.length;

    setResultsMean(mean);

    arr = arr.map((el) => {
      return (el - mean) ** 2;
    });

    let total = arr.reduce((acc, curr) => acc + curr, 0);
    return Math.sqrt(total / arr.length);
  };

  const calculateStatisticConfidence = (std, mean) => {
    let confidenceScore;
    std = std?.toString();
    mean = mean?.toString();
    std = Number(std?.substring(0, 6));
    mean = Number(mean?.substring(0, 6));
    let X = allResults?.length;
    // let X = 500;
    let u = mean;
    let o = std;

    confidenceScore = (X - u) / o;
    confidenceScore = Math.round(confidenceScore);
    if (confidenceScore > 100) {
      confidenceScore = 100;
    }
    setConfidenceScore(confidenceScore);
  };
  let htmlMarkUp;
  if (confidenceScore < 60) {
    htmlMarkUp = (
      <div className="confidence">
        <div className="sample-size">Confidence of Sample Size: </div>
        <div id="confidence-negative" className="confidence-score">
          {confidenceScore ? confidenceScore + "%" : "Awaiting Data"}
        </div>
      </div>
    );
  } else if (confidenceScore <= 80) {
    htmlMarkUp = (
      <div className="confidence">
        Confidence of Sample Size:{" "}
        <div id="confidence-passive" className="confidence-score">
          {confidenceScore ? confidenceScore + "%" : "Awaiting Data"}
        </div>
      </div>
    );
  } else {
    htmlMarkUp = (
      <div className="confidence">
        Confidence of Sample Size:{" "}
        <div id="confidence-positive" className="confidence-score">
          {confidenceScore ? confidenceScore + "%" : "Awaiting Data"}
        </div>
      </div>
    );
  }

  useEffect(() => {
    setAllResults(putResultsInArray());
    //eslint-disable-next-line
  }, [results]);

  useEffect(() => {
    //eslint-disable-next-line
  }, [allResults]);

  useEffect(() => {
    calculateStatisticConfidence(std, resultsMean);
    //eslint-disable-next-line
  }, [std, resultsMean]);

  return (
    <div className="confidence-container">
      <div className="sample-size">
        Sample Size: {allResults ? allResults.length : "Awaiting Data"}
      </div>
      {htmlMarkUp}
    </div>
  );
}
