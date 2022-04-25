import "./Login.css";
import React, { Component } from "react";
import Dashboard from "./dashboard/Dashboard";
import axios from "axios";

// Authentication
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authentication } from "../firebase/config";

// Redux Imports
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
// Routes
import { Link } from "react-router-dom";

// New Login
const provider = new GoogleAuthProvider();

export class Login extends Component {
  state = {
    errors: {},
    user: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
  }

  handleSubmit = () => {
    const errorMessage = "";
    let token;
    signInWithPopup(authentication, provider)
      .then((result) => {
        const credential = result.user;
        token = credential.accessToken;
        const user = result.user;
        console.log(user);
        this.setAuthorizationHeader(credential.accessToken);
        this.props.loginUser();
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(error);
      });
  };

  setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem("FBIdToken", FBIdToken);
    axios.defaults.headers.common["Authorization"] = FBIdToken;
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

    if (this.props.user.authenticated) {
      return (
        <Dashboard theme={this.props.theme} setTheme={this.props.setTheme} />
      );
    } else {
      return (
        <>
          <div id="login">
            <div id="welcome">
              <strong>Welcome back!</strong>
            </div>
            <button id="google-signin" onClick={(event) => this.handleSubmit()}>
              Sign in with Google
            </button>
            <p>{errors.general}</p>
            <p>{errors.email}</p>
            <p>{errors.password}</p>
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
