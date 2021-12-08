import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Email from "./components/Email";
import Worker from "./components/Worker";
import ManagerWorker from "./components/Manager_worker";
import WorkerSignup from "./components/Worker_signup";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Frame19 from "./components/Frame19";
import Frame20 from "./components/Frame20";
import Frame21 from "./components/Frame21";
import Frame22 from "./components/Frame22";
import Frame27 from "./components/Frame27";
import Dashboard from "./components/Dashboard";
import GenerateRandomAttendanceData from "./components/GenerateRandomAttendanceData";
import Header from './components/Header';
import Footer from './components/Footer';
import ManagerSettings from "./components/ManagerSettings";

import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Header />
          <div className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<WorkerSignup/>}/>
              <Route path="/home" element={<Dashboard />} />
              <Route path="/email" element={<Email />} />
              <Route path="/worker" element={<Worker/>}/>
              <Route path="/manager-worker" element={<ManagerWorker/>}/>
              <Route path="/frame19" element={<Frame19 />} />
              <Route path="/frame20" element={<Frame20 />} />
              <Route path="/frame21" element={<Frame21 />} />
              <Route path="/frame22" element={<Frame22 />} />
              <Route path="/frame27" element={<Frame27 />} />
              <Route path="/generate-random-attendance" element={<GenerateRandomAttendanceData />} />
              <Route path="/manager-settings" element={<ManagerSettings/>}/>
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
