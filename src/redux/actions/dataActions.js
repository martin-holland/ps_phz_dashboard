import { LOADING_DATA, SET_DATA, SET_NEW_RESULTS } from "../types";
import axios from "axios";

// Get all Data and map to State
export const getAllData = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    // .get("https://us-central1-promoterscore-14480.cloudfunctions.net/api/data")
    .get(
      "https://us-central1-promoterscore-14480.cloudfunctions.net/api/glogin"
    )
    .then((res) => {
      dispatch({
        type: SET_DATA,
        payload: res.data,
      });
      let today = new Date().toISOString().split("T")[0];
      let sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      sixMonthsAgo = sixMonthsAgo.toISOString().split("T")[0];
      const newResults = res.data.filter(
        (date) => date.createdAt >= sixMonthsAgo && date.createdAt <= today
      );
      dispatch({
        type: SET_NEW_RESULTS,
        payload: newResults,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_DATA,
        payload: [],
      });
    });
};

export const getSixMonths = (results) => (dispatch) => {
  let today = new Date().toISOString().split("T")[0];
  let sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  sixMonthsAgo = sixMonthsAgo.toISOString().split("T")[0];
  let newResults = results.filter(
    (date) => date.createdAt >= sixMonthsAgo && date.createdAt <= today
  );
};
