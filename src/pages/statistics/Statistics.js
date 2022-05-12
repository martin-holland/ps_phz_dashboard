import React, { useEffect, useState } from "react";
import axios from "axios";

// Functions
import { checkAuthenticated } from "./statisticsFunctions";
import { SET_NEW_RESULTS } from "../../redux/types";

const Statistics = (props) => {
  const [authentication, setAuthentication] = useState({});
  const [token, setToken] = useState();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

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
        console.log("Results loaded: ", res.data);
        results.push(res.data);
        setResults(results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setAuthentication(checkAuthenticated());
    if (authentication.token) {
      setToken(authentication.token);
      setAuthenticated(true);
    }
    if (authentication.authenticated) {
      getStatisticsData(token);
      setLoading(false);
    }
    console.log("results from Statistics: ", results);
    //eslint-disable-next-line
  }, [authenticated]);

  if (!authenticated && !loading) {
    return <div>Not Authorized, please return to home page</div>;
  } else if (authenticated && !loading) {
    return (
      <>
        <div>Statistics</div>
        <div>
          Results:{" "}
          {results.length > 0
            ? results.map((item) => {
                return (
                  <div>
                    <p>Created At: {item.createdAt}</p>
                    <p>Result: {item.surveyResult}</p>
                    <p>Message: {item.message}</p>
                  </div>
                );
              })
            : "No Results"}
        </div>
      </>
    );
  } else if (loading) {
    return <div>Loading...</div>;
  }
};

export default Statistics;
