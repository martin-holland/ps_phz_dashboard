import {
  DATE_ORDERED,
  LOADING_DATA,
  SET_DATA,
  SET_NEW_RESULTS,
  MONTH_ORDERED,
  YEARS_AND_MONTHS_ORDERED,
} from "../types";
import axios from "axios";
import dayjs from "dayjs";
import { months } from "../../util/months";

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
      let today = new Date();
      today.setDate(today.getDate() + 1);
      today = today.toISOString().split("T")[0];
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
      const datesByYear = orderByYear(res.data);
      dispatch({
        type: DATE_ORDERED,
        payload: datesByYear,
      });
      const datesByMonth = orderByMonth(res.data);
      dispatch({
        type: MONTH_ORDERED,
        payload: datesByMonth,
      });
      const datesByYearAndMonth = orderByYearAndMonth(res.data);
      dispatch({
        type: YEARS_AND_MONTHS_ORDERED,
        payload: datesByYearAndMonth,
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
  return newResults;
};

function orderByYear(results) {
  const map = {};
  results.forEach((item) => {
    if (map[item.createdAt.substring(0, 4)] === undefined) {
      map[item.createdAt.substring(0, 4)] = [];
    }
    map[item.createdAt.substring(0, 4)].push(item);
  });

  const resultingArray = Object.entries(map).map(([createdAt, surveyIds]) => ({
    createdAt,
    surveyIds,
  }));
  return resultingArray;
}

function orderByMonth(results) {
  const map = {};
  results.forEach((item) => {
    if (map[item.createdAt.substring(5, 7)] === undefined) {
      map[item.createdAt.substring(5, 7)] = [];
    }
    map[item.createdAt.substring(5, 7)].push(item);
  });

  const resultingArray = Object.entries(map).map(([createdAt, surveyIds]) => ({
    createdAt,
    surveyIds,
  }));
  return resultingArray;
}

function orderByYearAndMonth(results) {
  console.log("from dataActons: Results coming in: ", results);
  const data = {};
  results.forEach((item) => {
    console.log("from dataActions: ForEach loop checking");
    let created = dayjs(item.createdAt);
    let year = created.year();
    let month = months[created.month()];
    if (data[year] === undefined) {
      data[year] = [];
    }
    if (data[year][month] === undefined) {
      data[year][month] = [];
    }
    data[year][month].push(item);
  });
  console.log("dataActions for loop complete.");
  console.log(data);
  const resultingArray = Object.entries(data).map(([year, months]) => ({
    year,
    months,
  }));
  console.log(resultingArray);
  return resultingArray;
}
