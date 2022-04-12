import "./App.css";
import Test from "./components/Test";
// Redux Imports
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Test></Test>
      </Provider>
    </div>
  );
}

export default App;
