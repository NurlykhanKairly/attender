import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Email from "./components/Email";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Frame19 from "./components/Frame19";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/email" element={<Email />} />
            <Route path="/frame19" element={<Frame19 />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
