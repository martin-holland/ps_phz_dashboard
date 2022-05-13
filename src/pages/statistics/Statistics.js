import axios from "axios";
import { useEffect, useState } from "react";

// Redux imports
import { connect } from "react-redux";
import { getAllData } from "../../redux/actions/dataActions";
import PropTypes from "prop-types";

const Statistics = (props) => {
  //   const { defaultResults, results, loading } = props.data;
  const [token, setToken] = useState();
  const [results, setResults] = useState();

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

  useEffect(() => {
    setToken(checkAuthenticated());
  }, []);

  useEffect(() => {
    getStatisticsData(token);
  }, [token]);

  useEffect(() => {
    console.log(results);
  }, [results]);

  if (results.length > 0) {
    return (
      <>
        <div>
          {results[0].map((result) => (
            <>
              <p>Created At: {result.createdAt}</p>
              <p>surveyId: {result.surveyId}</p>
            </>
          ))}
        </div>
      </>
    );
  }
  return <div>Statistics (No Data)</div>;
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
