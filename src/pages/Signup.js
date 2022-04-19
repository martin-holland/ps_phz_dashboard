import "./Signup.css";
import React, { Component } from "react";

// Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
export class Signup extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    console.log("new user:", newUserData);
    this.props.signupUser(newUserData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    return (
      <>
        <form noValidate onSubmit={this.handleSubmit}>
          <input
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Enter email here"
            value={this.state.email}
            onChange={this.handleChange}
          ></input>
          <p>{errors.email}</p>
          <input
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter password here"
            value={this.state.password}
            onChange={this.handleChange}
          ></input>
          <p>{errors.password}</p>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Please confirm password"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
          ></input>
          <p>{errors.confirmPassword}</p>
          <input
            id="handle"
            name="handle"
            type="text"
            label="Username"
            placeholder="Please enter a username"
            value={this.state.handle}
            onChange={this.handleChange}
          ></input>
          <p>{errors.handle}</p>
          <Link to="/">
            <button type="submit">Submit</button>
          </Link>
          <Link to="/">
            <button>Already have account</button>
          </Link>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

Signup.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { signupUser })(Signup);
