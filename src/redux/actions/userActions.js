import axios from "axios";
import {
  SET_ERRORS,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
} from "../types";

export const loginUser = (userData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      "https://us-central1-promoterscore-14480.cloudfunctions.net/api/login",
      userData
    )
    .then((res) => {
      //   console.log(res.data);
      setAuthorizationHeader(res.data.token);
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SET_AUTHENTICATED });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.message,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const signupUser = (newUserData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      "https://us-central1-promoterscore-14480.cloudfunctions.net/api/signup",
      newUserData
    )
    .then((res) => {
      console.log(res.data);
      setAuthorizationHeader(res.data.token);
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SET_AUTHENTICATED });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
