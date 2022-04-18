import React, { useEffect, useState } from "react";
import "./Summary.css";
import PropTypes from "prop-types";

export default function Summary(props) {
  const { results, loading } = props;
  const [summary, setSummary] = useState({});

  let total = results.length;
  const calculateSummary = () => {
    if (results.length === 0) {
      console.log("results is empty");
    }
    let promoters = 0;
    let detractors = 0;
    let passives = 0;
    let errorData = 0;

    results.forEach((result) => {
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
    setSummary({
      promoters: promoters,
      passives: passives,
      detractors: detractors,
      errorData: errorData,
    });
  };

  useEffect(() => {
    if (!loading) {
      calculateSummary();
    }
    //eslint-disable-next-line
  }, [loading]);

  console.log("total number of entries: ", total);
  console.log(summary);
  return (
    <div className="summary">
      <div className="promoters">{summary.promoters}</div>
      <div className="passive">{summary.passives}</div>
      <div className="detractors">{summary.detractors}</div>
    </div>
  );
}

Summary.propTypes = {
  results: PropTypes.array.isRequired,
};
