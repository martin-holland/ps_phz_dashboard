import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Statistics.css";
import { ThreeCircles } from "react-loader-spinner";
import Burger from "../../components/Burger/BurgerMenu";
import Menu from "../../components/Menu/Menu";
import Popup from "reactjs-popup";
import { TagCloud } from "react-tagcloud";

//Styling
import { Main, TitleHead, InputBox } from "./ThemeStyle";
import Tippy from "@tippyjs/react";
import { GrCircleInformation } from "react-icons/gr";
import oneYearIcon from "../../assets/one-year.svg";
import oneMonthIcon from "../../assets/one-month.svg";
import confidenceIcon from "../../assets/confidence.svg";
import wordsIcon from "../../assets/words.svg";

// Redux imports
import { connect } from "react-redux";
import { getAllData } from "../../redux/actions/dataActions";
import PropTypes from "prop-types";

const Statistics = (props) => {
  const [token, setToken] = useState();
  const [results, setResults] = useState();
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState(0);
  const [responseRate, setResponseRate] = useState();
  const [oneMonthRate, setOneMonthRate] = useState();
  const [data, setData] = useState();
  const [newResults, setNewResults] = useState();
  const [oneMonthResults, setOneMonthResults] = useState();

  const checkAuthenticated = () => {
    let localStorageToken = localStorage.getItem("FBIdToken");
    if (localStorageToken && localStorageToken.startsWith("Bearer ")) {
      localStorageToken = localStorageToken.split("Bearer ")[1];
    }
    return localStorageToken;
  };

  const getStatisticsData = (token) => {
    const results = [];
    const FBIdToken = `Bearer ${token}`;
    axios.defaults.headers.common["Authorization"] = FBIdToken;

    axios
      .get(
        "https://us-central1-promoterscore-14480.cloudfunctions.net/api/glogin"
      )
      .then((res) => {
        results.push(res.data);
        setNewResults(oneYearAgo(results));
        setOneMonthResults(oneMonthAgo(results));
        setResults(results);
      })
      .catch((err) => console.log(err));
  };

  const oneYearAgo = (results) => {
    let today = new Date();
    today.setDate(today.getDate() + 1);
    today = today.toISOString().split("T")[0];
    let oneYearAgo = new Date();
    oneYearAgo.setMonth(oneYearAgo.getMonth() - 12);
    oneYearAgo = oneYearAgo.toISOString().split("T")[0];
    const newResults = results[0].filter(
      (date) => date.createdAt >= oneYearAgo && date.createdAt <= today
    );
    return newResults;
  };

  const oneMonthAgo = (results) => {
    let today = new Date();
    today.setDate(today.getDate() + 1);
    today = today.toISOString().split("T")[0];
    let oneYearAgo = new Date();
    oneYearAgo.setMonth(oneYearAgo.getMonth() - 1);
    oneYearAgo = oneYearAgo.toISOString().split("T")[0];
    const oneMonthResults = results[0].filter(
      (date) => date.createdAt >= oneYearAgo && date.createdAt <= today
    );
    return oneMonthResults;
  };

  const calculateResponseRate = () => {
    if (employees <= 0) {
      setResponseRate("Number should be higher than 0");
    } else {
      let totalResponses = newResults.length;
      let responsesIntoMonths = totalResponses / 12;
      let rate = (responsesIntoMonths / +employees) * 100;
      rate = Math.round(rate);
      setResponseRate(rate + "%");
      let oneMonthResponses = oneMonthResults.length;
      let oneMonthResponse = oneMonthResponses;
      let oneMonthRate = (oneMonthResponse / +employees) * 100;
      oneMonthRate = Math.round(oneMonthRate);
      console.log("One Month Rate: ", oneMonthRate);
      setResponseRate(rate + "%");
      setOneMonthRate(oneMonthRate + "%");
      wordCounting();
    }
  };

  const wordCounting = () => {
    if (newResults.length > 0) {
      const sentences = [];
      newResults.forEach((result) => {
        sentences.push(result.message);
      });

      const split = [];
      for (let i = 0; i < sentences.length; i++) {
        split[i] = sentences[i].split(" ");
      }

      let occurances = {};

      for (let words of split) {
        for (let word of words) {
          if (occurances[word]) {
            occurances[word]++;
          } else {
            occurances[word] = 1;
          }
        }
      }

      const dataArray = [];
      for (const key in occurances) {
        let dataPrep = {};
        dataPrep.value = key;
        dataPrep.count = occurances[key];
        dataArray.push(dataPrep);
      }
      dataArray.sort(function (a, b) {
        var keyA = a.count,
          keyB = b.count;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
      const last20 = dataArray.slice(-20);
      setData(last20);
    }
  };

  useEffect(() => {
    setToken(checkAuthenticated());
  }, []);

  useEffect(() => {
    getStatisticsData(token);
    //eslint-disable-next-line
  }, [token]);

  useEffect(() => {
    console.log(results);
  }, [results]);

  useEffect(() => {
    console.log(newResults);
  }, [newResults]);

  if (results?.length > 0) {
    return (
      <>
        <Main className="main">
          <div className="header-container">
            <Burger theme={props.theme} open={open} setOpen={setOpen}></Burger>
            <Menu theme={props.theme} open={open} setOpen={setOpen}></Menu>
            <TitleHead className="header">Promoter Score Statistics</TitleHead>
          </div>
          <InputBox className="inputbar">
            <p className="input-titles">Employees:</p>
            <Tippy
              theme="light"
              delay={250}
              content={<span>Number Of Employees</span>}
            >
              <input
                type="number"
                id="employees"
                placeholder="Team Size"
                onChange={(event) => setEmployees(event.target.value)}
              />
            </Tippy>
            <Tippy
              theme="light"
              delay={250}
              content={<span>Calculate Statistics</span>}
            >
              <input
                type="button"
                id="calculate"
                onClick={calculateResponseRate}
                value="Calculate"
              />
            </Tippy>
          </InputBox>
          <div className="container">
            <div className="top-container">
              <div className="top-left">
                <div className="statistics-headings">
                  <h4>Last 12 Months</h4>
                  <img
                    alt="one year icon"
                    className="heading-icons"
                    src={oneYearIcon}
                  />
                </div>
                <div className="organiser">
                  <div className="total-responses">
                    Total Responses:
                    <div className="total">{newResults.length}</div>
                  </div>
                  <div className="response-rate">
                    Response Rate:
                    <div />
                    <div className="rate">
                      {responseRate
                        ? responseRate
                        : "Please give number of employees"}{" "}
                    </div>
                  </div>
                </div>
                <div className="expected">
                  Expected Responses:
                  <div />
                  <div className="expected-responses">{employees * 12}</div>
                </div>
                <Popup
                  trigger={(open) => (
                    <button className="info-button">
                      <GrCircleInformation size="1rem" />
                    </button>
                  )}
                  position="right center"
                  closeOnDocumentClick
                >
                  <span>Information is based upon a 12 month period.</span>
                  <br></br>
                  <br></br>
                  <span>
                    Response rate is the percentage of responses based on the
                    total number of employees
                  </span>
                  <br></br>
                  <br></br>
                  <span>
                    {" "}
                    Expected responses is the total number of employees
                    multipled by the number of months{" "}
                  </span>
                </Popup>
              </div>
              <div className="top-right">
                <div className="statistics-headings">
                  <h4>Confidence of Data</h4>
                  <img
                    alt="confidence icon"
                    className="heading-icons"
                    src={confidenceIcon}
                  />
                </div>
              </div>
            </div>
            <div className="bottom-container">
              <div className="bottom-left">
                <div className="statistics-headings">
                  <h4>Last Month</h4>
                  <img
                    alt="one year icon"
                    className="heading-icons"
                    src={oneMonthIcon}
                  />
                </div>
                <div className="organiser">
                  <div className="total-responses">
                    Total Responses:
                    <div className="total">{oneMonthResults.length}</div>
                  </div>
                  <div className="response-rate">
                    Response Rate:
                    <div />
                    <div className="rate">
                      {oneMonthRate
                        ? oneMonthRate
                        : "Please give number of employees"}{" "}
                    </div>
                  </div>
                </div>
                <div className="expected">
                  Expected Responses:
                  <div />
                  <div className="expected-responses">{employees}</div>
                </div>
                <Popup
                  trigger={(open) => (
                    <button className="info-button">
                      <GrCircleInformation size="1rem" />
                    </button>
                  )}
                  position="right center"
                  closeOnDocumentClick
                >
                  <span>Information is based on last month data only.</span>
                  <br></br>
                  <br></br>
                  <span>
                    Response rate is the percentage of responses based on the
                    total number of employees
                  </span>
                  <br></br>
                  <br></br>
                  <span>
                    {" "}
                    Expected responses is the total number of employees, where
                    you are expecting a response from each individual once per
                    month.{" "}
                  </span>
                </Popup>
              </div>
              <div className="bottom-right">
                <div className="statistics-headings">
                  <h4>Most used words...</h4>
                  <img
                    alt="confidence icon"
                    className="heading-icons-smaller"
                    src={wordsIcon}
                  />
                </div>
                {data && (
                  <TagCloud
                    minSize={10}
                    maxSize={50}
                    tags={data}
                    className="simple-cloud"
                    onClick={(tag) =>
                      alert(
                        `The word: '${tag.value}' has been seen: ${tag.count} time(s)`
                      )
                    }
                  />
                )}
                <Popup
                  trigger={(open) => (
                    <button className="info-button">
                      <GrCircleInformation size="1rem" />
                    </button>
                  )}
                  position="top center"
                  closeOnDocumentClick
                >
                  <span>
                    This tag cloud shows the occurances of words and how often
                    they appear within all of the results.
                  </span>
                  <br></br>
                  <br></br>
                  <span>
                    This will show a maximum of the 20 most commonly found
                    words.
                  </span>
                  <br></br>
                  <br></br>
                  <span>The words with the most counts are the largest.</span>
                  <br></br>
                  <br></br>
                  <span>
                    You can click an individual word to be shown the number of
                    times the word has been found.
                  </span>
                </Popup>
              </div>
            </div>
          </div>
        </Main>
      </>
    );
  }
  return (
    <div className="loader">
      <ThreeCircles
        color="red"
        outerCircleColor="#19aade"
        middleCircleColor="#1de4bd"
        innerCircleColor="#ef7e32"
      />
    </div>
  );
};

Statistics.propTypes = {
  getAllData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

export default connect(mapStateToProps, {
  getAllData,
})(Statistics);
