import { BsMoonStarsFill } from "react-icons/bs";
import { BsLightbulb } from "react-icons/bs";
import styled from "styled-components";
import "./Dashboard.css";
import BarChart from "../../components/chart/BarChart";
import Message from "../../components/message/Message";
import Login from "../Login";
import { useState } from "react";
import LineChart from "../../components/chart/LineChart";
import { ThreeCircles } from "react-loader-spinner";
import dayjs from "dayjs";
import { months } from "../../util/months";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/themes/translucent.css";

// Redux imports
import { connect } from "react-redux";
import { getAllData, getSixMonths } from "../../redux/actions/dataActions";
import { logoutUser } from "../../redux/actions/userActions";
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
const LogoutButton = styled.button`
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.backgroundColor};
  transition: all 0.5s ease;
  margin: 0.5rem;
  font-size: 1.2rem;
`;
const Toggle = styled.p`
  cursor: pointer;
  // position: absolute;
  // top: 5px;
  // right: 60px;
  padding: 5px;
  margin-top: 0.5rem;
  border: none;

  transition: all 0.5s ease;

  &:focus {
    outline: none;
  }
`;

const ChartContainer = styled.div`
  color: ${(props) => props.theme.color};
`;
const FilterBox = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
  transition: all 0.5s ease;
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
  const { datesByYearAndMonth, defaultResults, results, loading } = props.data;
  const { authenticated } = props.user;
  const [newResults, setNewResults] = useState([]);
  const [sixMonthsAgo, setSixMonthsAgo] = useState();
  console.log("results from dashboard: ", results);
  // Testing datesByYearAndMonth
  console.log(
    "Dashboard datesByYearAndMonth: ",
    datesByYearAndMonth.forEach((item) => {
      console.log(item);
    })
  );

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
    let end = new Date(document.getElementById("end").value);
    end.setDate(end.getDate() + 1);
    end = end.toISOString();
    console.log("End Date: ", end);
    let newResults = results.filter(
      (date) => date.createdAt >= start && date.createdAt <= end
    ); 
    //return newResults
    setNewResults(newResults); //setNewResults(filterDate())
  };

  const resetDate = () => {
    let start = document.getElementById("start");
    start.value = sixMonthsAgo;
    let end = document.getElementById("end");
    end.value = new Date().toISOString().split("T")[0];
    filterDate();
  };

  console.log("Dates by year and Month: ", datesByYearAndMonth);

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
      return (
        <Main className="main">
          <div className="container">
            <div className="header-container">
              <TitleHead className="header">
                Promoter Score Calculation
              </TitleHead>
              <div className="navbar-rightbox">
                <Tippy
                  theme="light"
                  delay={250}
                  content={<span>Log user out</span>}
                >
                  <LogoutButton
                    className="logout-button"
                    onClick={() => props.logoutUser()}
                  >
                    Logout
                  </LogoutButton>
                </Tippy>

                <Tippy
                  theme="light"
                  delay={250}
                  content={<span>Change theme</span>}
                >
                  <Toggle className="toggle-button" onClick={changeTheme}>
                    {icon}
                  </Toggle>
                </Tippy>
              </div>
            </div>
            <ChartContainer className="chart-container">
              <BarChart
                results={newResults.length > 0 ? newResults : defaultResults}
                theme={props.theme}
              />
            </ChartContainer>
            <FilterBox className="datefilter-box">
              Start:
              <Tippy
                theme="light"
                delay={250}
                content={<span>Choose start date</span>}
              >
                <input type="date" id="start" defaultValue={sixMonthsAgo} />
              </Tippy>
              End:
              <Tippy
                theme="light"
                delay={250}
                content={<span>Choose end date</span>}
              >
                <input
                  type="date"
                  id="end"
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
              </Tippy>
              <Tippy
                theme="light"
                delay={250}
                content={<span>Filter data</span>}
              >
                <button onClick={filterDate}>Filter</button>
              </Tippy>
              <Tippy theme="light" delay={250} content={<span>Reset</span>}>
                <button onClick={resetDate}>Reset</button>
              </Tippy>
            </FilterBox>
            <div className="bottom-container">
              <MessageContainer className="message-container">
                {(newResults.length > 0 ? newResults : defaultResults)
                  // .slice(0, 100)
                  .map((result) => (
                    <Message result={result} key={result.surveyId} />
                  ))}
              </MessageContainer>
              <LineChartContainer className="line-container">
                <LineChart
                  results={newResults.length > 0 ? newResults : defaultResults}
                  theme={props.theme}
                />
              </LineChartContainer>
            </div>
          </div>
        </Main>
      );
    } else {
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
    }
  }
};

Dashboard.propTypes = {
  getAllData: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

export default connect(mapStateToProps, {
  getAllData,
  getSixMonths,
  logoutUser,
})(Dashboard);
