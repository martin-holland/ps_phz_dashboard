import React from "react";
import { useSelector } from "react-redux";

function Testdemo(props) {
  const showState = useSelector((state) => state.data);
  console.log(showState);
  return <div>{showState.results[0].surveyId}</div>;
}

export default Testdemo;
