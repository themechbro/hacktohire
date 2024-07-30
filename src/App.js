import "./App.css";
import Appbar from "./components/appbar";
import Pagelist from "./components/pagelist";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import ViewFlight from "./components/viewFlight";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Pagelist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/flightdetails/:flightNo" element={<ViewFlight />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
