import "./App.css";
import Test from "./components/Test";
// Redux Imports
import { Provider } from "react-redux";
import store from "./redux/store";
import { db } from "./backend/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Test></Test>
      </Provider>
      <h1>dashboard</h1>
      <Dashboard />
    </div>
  );
}

export default App;
