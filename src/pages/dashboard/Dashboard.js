import { BsMoonStarsFill } from "react-icons/bs";
import { BsLightbulb } from "react-icons/bs";
import styled from "styled-components";
import "./Dashboard.css";
import BarChart from "../../components/chart/BarChart";
import Message from "../../components/message/Message";
import Login from "../Login";
import { useState } from "react";
import LineChart from "../../components/chart/LineChart";

// Redux imports
import { connect } from "react-redux";
import { getAllData, getSixMonths } from "../../redux/actions/dataActions";
import PropTypes from "prop-types";
import { useEffect } from "react";

const Main = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  transition: all 0.5s ease;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;
const TitleHead = styled.h1`
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.backgroundColor};
  transition: all 0.5s ease;
  margin: 0.5rem;
  font-size: 1.2rem;
`;
const Toggle = styled.p`
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 60px;
  margin-top: 1rem;
  border: none;

  transition: all 0.5s ease;

  &:focus {
    outline: none;
  }
`;

const ChartContainer = styled.div`
  color: ${(props) => props.theme.color};
`;
const MessageContainer = styled.div`
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.backgroundColor};
`;
const LineChartContainer = styled.div`
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.backgroundColor};
`;
const Dashboard = (props) => {
  // Data destructuring
  const { defaultResults, results, loading } = props.data;
  const { authenticated } = props.user;
  const [newResults, setNewResults] = useState([]);
  const [sixMonthsAgo, setSixMonthsAgo] = useState();
  console.log("results from dashboard: ", results);

  //theme
  const changeTheme = () => {
    props.theme === "light" ? props.setTheme("dark") : props.setTheme("light");
  };
  const icon =
    props.theme === "light" ? (
      <BsMoonStarsFill size={25} />
    ) : (
      <BsLightbulb size={25} color="white" />
    );

  const sixMonthsAgoFunc = () => {
    let sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    sixMonthsAgo = sixMonthsAgo.toISOString().split("T")[0];
    setSixMonthsAgo(sixMonthsAgo);
  };

  const filterDate = () => {
    let start = new Date(document.getElementById("start").value).toISOString();
    let end = new Date(document.getElementById("end").value).toISOString();
    let newResults = results.filter(
      (date) => date.createdAt >= start && date.createdAt <= end
    );
    setNewResults(newResults);
  };

  const resetDate = () => {
    let start = document.getElementById("start");
    start.value = sixMonthsAgo;
    let end = document.getElementById("end");
    end.value = new Date().toISOString().split("T")[0];
    setNewResults(defaultResults);
  };
  // Data retrieval
  useEffect(() => {
    props.getAllData();
    sixMonthsAgoFunc();
    //eslint-disable-next-line
  }, []);

  if (!authenticated) {
    return <Login />;
  } else {
    if (!loading && results !== undefined && results.length >= 1) {
      console.log("default results: ", defaultResults);
      console.log("newResults: ", newResults);
      return (
        <Main className="main">
          <div className="container">
            <div className="header-container">
              <TitleHead className="header">
                Net Promoter Score Calculation
              </TitleHead>
              <Toggle className="toggle-button" onClick={changeTheme}>
                {icon}
              </Toggle>
            </div>
            <ChartContainer className="chart-container">
              <BarChart
                results={newResults.length > 0 ? newResults : defaultResults}
                theme={props.theme}
              />
            </ChartContainer>
            <div className="datefilter-box">
              Start:
              <input type="date" id="start" defaultValue={sixMonthsAgo} />
              End:
              <input
                type="date"
                id="end"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
              <button onClick={filterDate}>Filter</button>
              <button onClick={resetDate}>Reset</button>
            </div>
            <div className="bottom-container">
              <MessageContainer className="message-container">
                {(newResults.length > 0 ? newResults : defaultResults)
                  .slice(0, 20)
                  .map((result) => (
                    <Message result={result} key={result.surveyId} />
                  ))}
              </MessageContainer>
              <LineChartContainer className="line-container">
                <LineChart results={results} theme={props.theme} />
              </LineChartContainer>
            </div>
          </div>
        </Main>
      );
    } else {
      return <div>Data Loading...</div>;
    }
  }
};

Dashboard.propTypes = {
  getAllData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

export default connect(mapStateToProps, { getAllData, getSixMonths })(
  Dashboard
);
