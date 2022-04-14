// Redux Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllData } from "../redux/actions/dataActions";
import PropTypes from "prop-types";
import Dashboard from "../pages/dashboard/Dashboard";

export class home extends Component {
  componentDidMount() {
    this.props.getAllData();
  }

  render() {
    const { results, loading } = this.props.data;

    //eslint-disable-next-line
    let recentSurveyData = !loading ? (
      results.map((item) => (
        <div key={item.surveyId}>
          <p>Survey Id: {item.surveyId}</p>
          <p>Survey Choice: {item.choice}</p>
          <p>Survey Result: {item.surveyResult}</p>
          <p>Message: {item.message}</p>
        </div>
      ))
    ) : (
      <p>Loading Data</p>
    );

    // return <div>{recentSurveyData}</div>;
    return <Dashboard results={results} loading={loading} />;
  }
}

home.propTypes = {
  getAllData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getAllData })(home);
