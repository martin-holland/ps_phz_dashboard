import { LOADING_DATA, SET_DATA, SET_NEW_RESULTS } from "../types";

const initialState = {
  results: [],
  defaultResults: [],
  loading: false,
};

//eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_DATA:
      return {
        ...state,
        results: action.payload,
        loading: false,
      };
    case SET_NEW_RESULTS:
      return {
        ...state,
        defaultResults: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
