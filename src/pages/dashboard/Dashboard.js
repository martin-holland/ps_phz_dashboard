import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
//components
import BarChart from "../../components/chart/BarChart";
import Message from "../../components/message/Message";
import Login from "../Login";
import LineChart from "../../components/chart/LineChart";
import { getNewResults, getSixMonthAgoISoString } from "./dashHelperFunc";
//Tippyjs
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/themes/translucent.css";
// Redux imports
import { connect } from "react-redux";
import { getAllData, getSixMonths } from "../../redux/actions/dataActions";
import { logoutUser } from "../../redux/actions/userActions";
import PropTypes from "prop-types";
//icons
import { BsMoonStarsFill } from "react-icons/bs";
import { BsLightbulb } from "react-icons/bs";
//styles
import {
  Main,
  TitleHead,
  LogoutButton,
  Toggle,
  ChartContainer,
  FilterBox,
  MessageContainer,
  LineChartContainer,
} from "./ThemeStyle";

import "./Dashboard.css";

const Dashboard = (props) => {
  // Data destructuring
  const { defaultResults, results, loading } = props.data;
  const { authenticated } = props.user;
  const [newResults, setNewResults] = useState([]);
  const [sixMonthsAgo, setSixMonthsAgo] = useState();
  const [loadingData, setLoadingData] = useState(true);

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
    setSixMonthsAgo(getSixMonthAgoISoString());
  };

  const filterDate = () => {
    setNewResults(getNewResults(results));
    setLoadingData(false);
  };

  const resetDate = () => {
    let start = document.getElementById("start");
    start.value = sixMonthsAgo;
    let end = document.getElementById("end");
    end.value = new Date().toISOString().split("T")[0];
    filterDate();
  };

  const runOnce = () => {
    console.log("Ran once");
    setTimeout(() => {
      filterDate();
    }, 2000);
    setLoadingData(false);
  };

  // const runOnce = () => {
  //   console.log("Ran once");
  //   setTimeout(() => {
  //   filterDate();
  //   }, 2000);
  //   setLoadingData(false);
  // };

  // Data retrieval
  useEffect(() => {
    props.getAllData();
    sixMonthsAgoFunc();
    runOnce();
    //eslint-disable-next-line
  }, [loadingData]);

  if (!authenticated) {
    return <Login />;
  }
  if (loading || results === undefined || results.length === 0) {
    return (
      <>
        <div className="loader">
          <ThreeCircles
            color="red"
            outerCircleColor="#19aade"
            middleCircleColor="#1de4bd"
            innerCircleColor="#ef7e32"
          />
        </div>
      </>
    );
  }
  return (
    <Main className="main">
      <div className="container">
        <div className="header-container">
          <TitleHead className="header">Promoter Score Calculation</TitleHead>
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
          <Tippy theme="light" delay={250} content={<span>Filter data</span>}>
            <button onClick={filterDate}>Filter</button>
          </Tippy>
          <Tippy theme="light" delay={250} content={<span>Reset</span>}>
            <button onClick={resetDate}>Reset</button>
          </Tippy>
        </FilterBox>
        <ChartContainer className="chart-container">
          <BarChart
            results={newResults.length > 0 ? newResults : defaultResults}
            theme={props.theme}
            loadingData={loadingData}
          />
        </ChartContainer>
        <div className="bottom-container">
          <MessageContainer className="message-container">
            {(newResults.length > 0 ? newResults : defaultResults).map(
              (result) => (
                <Message result={result} key={result.surveyId} />
              )
            )}
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
