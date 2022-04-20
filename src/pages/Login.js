import "./Login.css";
import React, { Component } from "react";
import Dashboard from "./dashboard/Dashboard";

// Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
// Routes
import { Link } from "react-router-dom";

export class Login extends Component {
  state = {
    email: "",
    password: "",
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
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
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

    console.log("Props from Login: ", this.props);

    if (this.props.user.authenticated) {
      return (
        <Dashboard theme={this.props.theme} setTheme={this.props.setTheme} />
      );
    } else {
      return (
        <>
          <div id="login">
            <div id="welcome"><strong>Welcome back!</strong></div>
            <form noValidate onSubmit={this.handleSubmit}>
              <input
                id="email"
                name="email"
                type="email"
                label="Email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="Enter email"
              ></input>
              <p>{errors.email}</p>
              <input
                id="password"
                name="password"
                type="password"
                label="Password"
                value={this.state.password}
                onChange={this.handleChange}
                placeholder="Enter password"
              ></input>
              <p>{errors.password}</p>
              <button id="submit" type="submit">
                Sign In
              </button>
              <p>{errors.general}</p>
            </form>
            <Link to="/signup">
              <div id="newuser">Create an account</div>
            </Link>
          </div>
        </>
      );
    }
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
