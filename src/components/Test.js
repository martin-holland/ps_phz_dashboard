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

    if (!loading) {
      return results.map((item) => (
        <>
          <p>Survey Id: {item.surveyId}</p>
          <p>Survey Score: {item.choice}</p>
          <p>Survey Result: {item.result}</p>
          <p>Created At: {item.createdAt}</p>
        </>
      ));
    }
    return <>Loading Data</>;
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
