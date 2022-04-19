import "./Login.css";
import React, { Component } from "react";

// Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
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

    let isAuthenticated = false;
    if (this.props.user.authenticated === true) {
      isAuthenticated = true;
    }
    if (isAuthenticated) {
      return <>Logged in Successfully.</>;
    } else {
      return (
        <>
          <div>Login</div>
          <form noValidate onSubmit={this.handleSubmit}>
            <input
              id="email"
              name="email"
              type="email"
              label="Email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Enter Email"
            ></input>
            {/* <p>{!errors.email ? "" : errors.email}</p> */}
            <input
              id="password"
              name="password"
              type="password"
              label="Password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Enter Password"
            ></input>
            <p>{!errors.password ? "" : errors.password}</p>
            <Link to="/dashboard">
              <button type="submit">Submit</button>
            </Link>
          </form>
          <Link to="/signup">
            <button>Create account</button>
          </Link>
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
