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
  const [firebaseData, setFirebaseData] = useState([]);
  useEffect(() => {
    const docRef = collection(db, "survey_results");
    getDocs(docRef)
      .then((snapshot) => {
        // console.log(snapshot.docs);
        if (snapshot.empty) {
          console.log("No data available");
        } else {
          setFirebaseData(
            snapshot.docs.map((doc) => ({ id: doc.id, result: doc.data() }))
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(firebaseData.map((data) => data.result));
  return (
    <div className="App">
      <Provider store={store}>
        <Test></Test>
      </Provider>
      <h1>dashboard</h1>
      <Dashboard />
      <h1>dashboard</h1>
    </div>
  );
}

export default App;
