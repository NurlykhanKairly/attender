import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Email from "./components/Email";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Frame19 from "./components/Frame19";
import Frame20 from "./components/Frame20";
import Frame21 from "./components/Frame21";
import Frame22 from "./components/Frame22";
import Frame27 from "./components/Frame27";

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
            <Route path="/frame20" element={<Frame20 />} />
            <Route path="/frame21" element={<Frame21 />} />
            <Route path="/frame22" element={<Frame22 />} />
            <Route path="/frame27" element={<Frame27 />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
