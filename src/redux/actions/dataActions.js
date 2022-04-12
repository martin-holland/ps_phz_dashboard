import { LOADING_DATA, SET_DATA } from "../types";
import axios from "axios";

// Get all Data and map to State
export const getAllData = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("https://us-central1-promoterscore-14480.cloudfunctions.net/api/data")
    .then((res) => {
      dispatch({
        type: SET_DATA,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_DATA,
        payload: [],
      });
    });
};
