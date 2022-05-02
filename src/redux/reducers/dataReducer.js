import {
  DATE_ORDERED,
  LOADING_DATA,
  SET_DATA,
  SET_NEW_RESULTS,
  MONTH_ORDERED,
  YEARS_AND_MONTHS_ORDERED,
} from "../types";

const initialState = {
  results: [],
  defaultResults: [],
  datesByYear: [],
  datesByMonth: [],
  datesByYearAndMonth: [],
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
    case DATE_ORDERED:
      return {
        ...state,
        datesByYear: action.payload,
        loading: false,
      };
    case MONTH_ORDERED:
      return {
        ...state,
        datesByMonth: action.payload,
        loading: false,
      };
    case YEARS_AND_MONTHS_ORDERED:
      return {
        ...state,
        datesByYearAndMonth: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
