import axios from "axios";
import { useEffect, useState } from "react";
import "./Statistics.css";
import { ThreeCircles } from "react-loader-spinner";
import Burger from "../../components/Burger/BurgerMenu";
import Menu from "../../components/Menu/Menu";

//Styling
import { Main, TitleHead, InputBox } from "./ThemeStyle";
import Tippy from "@tippyjs/react";

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

  const checkAuthenticated = () => {
    let localStorageToken = localStorage.getItem("FBIdToken");
    if (localStorageToken && localStorageToken.startsWith("Bearer ")) {
      localStorageToken = localStorageToken.split("Bearer ")[1];
      console.log("Token from checkAuthenticated: ", localStorageToken);
    }
    return localStorageToken;
  };

  const getStatisticsData = (token) => {
    const results = [];
    console.log(
      "Token from Statistics (This means getStatsticsFunction works!): ",
      token
    );
    const FBIdToken = `Bearer ${token}`;
    axios.defaults.headers.common["Authorization"] = FBIdToken;

    axios
      .get(
        "https://us-central1-promoterscore-14480.cloudfunctions.net/api/glogin"
      )
      .then((res) => {
        results.push(res.data);
        setResults(results);
      })
      .catch((err) => console.log(err));
  };

  const calculateResponseRate = () => {
    if (employees <= 0) {
      setResponseRate("Number should be higher than 0");
    } else {
      let totalResponses = results[0].length;
      let responsesIntoMonths = totalResponses / 12;
      let rate = (responsesIntoMonths / +employees) * 100;
      console.log("Rate: ", rate);
      rate = Math.round(rate);
      setResponseRate(rate + "%");
    }
  };

  useEffect(() => {
    setToken(checkAuthenticated());
  }, []);

  useEffect(() => {
    getStatisticsData(token);
  }, [token]);

  useEffect(() => {
    console.log(results);
  }, [results]);

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
                <h4>Last 12 Months</h4>
                <div className="total-responses">Total Responses:</div>
                <div className="total">{results[0]?.length}</div>
                <div className="response-rate">
                  Response Rate:
                  <div />
                  <div className="rate">
                    {responseRate
                      ? responseRate
                      : "Please give number of employees"}{" "}
                  </div>
                  <div className="expected">
                    Expected Responses:
                    <div />
                    <div className="expected-responses">{employees * 12}</div>
                  </div>
                </div>
              </div>
              <div className="top-right">Something</div>
            </div>
            <div className="bottom-container">
              <div className="bottom-left">Something</div>
              <div className="bottom-right">
                {results[0].map((result) => (
                  <>
                    <p>Created At: {result.createdAt}</p>
                    <p>surveyId: {result.surveyId}</p>
                  </>
                ))}
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
