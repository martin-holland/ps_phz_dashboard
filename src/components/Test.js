// Redux Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllData } from "../redux/actions/dataActions";
import PropTypes from "prop-types";

export class home extends Component {
  componentDidMount() {
    this.props.getAllData();
  }

  render() {
    const { results, loading } = this.props.data;

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

    return <div>{recentSurveyData}</div>;
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
