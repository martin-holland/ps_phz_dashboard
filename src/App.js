import "./App.css";
// import Test from "./components/Test";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Redux Imports
import { Provider } from "react-redux";
import store from "./redux/store";

import Dashboard from "./pages/dashboard/Dashboard";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./components/Theme";

//dark light theme
const themes = {
  light: lightTheme,
  dark: darkTheme,
};

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <div className="App">
      <Provider store={store}>
        {/* <Testdemo /> */}
        {/* <Test></Test> */}

        <ThemeProvider theme={themes[theme]}>
          <Router>
            <Routes>
              <Route
                path="/"
                element={<Login theme={theme} setTheme={setTheme} />}
              />
              <Route
                path="/signup"
                element={<Signup theme={theme} setTheme={setTheme} />}
              />
              <Route
                path="/dashboard"
                element={<Dashboard theme={theme} setTheme={setTheme} />}
              />
            </Routes>
          </Router>

          {/* <Login /> */}
          {/* <Signup /> */}
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
