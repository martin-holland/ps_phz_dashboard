import "./App.css";
// Demo only
import Testdemo from "./components/TestDemo/Testdemo";
// import Test from "./components/Test";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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
          {/* <Login /> */}
          {/* <Signup /> */}
          <div className="App">
            <Dashboard theme={theme} setTheme={setTheme} />
          </div>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
