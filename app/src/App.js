import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { db, auth } from './firebase';
import {ref, child, get, onValue} from 'firebase/database';
import Login from "./components/Login";
import Home from "./components/Home";
import Email from "./components/Email";
import Worker from "./components/Worker";
import ManagerWorker from "./components/Manager_worker";
import Signup from "./components/Signup";
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
import CircularProgress from '@mui/material/CircularProgress';
import NoMatch from './components/NoMatch';

function App() {

  const [workers, setWorkers] = useState(null);
  const [dayoffs, setDayoffs] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState(null);
  const [uid, setUid] = useState(null);
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
          setUid(user.uid);
      } else {
          setUid(0);
      }
    });
    onValue(ref(db, '/workers'), (snapshot) => {
      if(snapshot.exists()) {
        setWorkers(snapshot.val());
      } else {
        setWorkers({});
        console.log("No workers available");
      }
    });
    onValue(ref(db, '/dayoffs'), (snapshot) => {
      if(snapshot.exists()) {
        setDayoffs(snapshot.val());
      } else {
        setDayoffs({});
        console.log("No dayoffs available");
      }
    });
    onValue(ref(db, '/additional_info'), (snapshot) => {
      if(snapshot.exists()) {
        setAdditionalInfo(snapshot.val());
      } else {
        setAdditionalInfo({});
        console.log("No add info available");
      }
    });
  }, []);

  let loading = true;
  if(uid !== null && workers !== null && dayoffs !== null && additionalInfo !== null)
    loading = false;
  let manager = false;
  if(uid && workers && workers[uid].role === "manager")
    manager = true;
  console.log(uid, workers, manager);

  return (
    <>
      { loading 
        ? 
          <div className="loading-container">
            <CircularProgress />
          </div>
        :
        <Router>
          <div className="App">
            <Header uid={uid} workers={workers} dayoffs={dayoffs} additionalInfo={additionalInfo}/>
            <div className="main-content">
              <Routes>
                <Route path="/login" element={<Login uid={uid} />} />
                <Route path="/signup" element={<Signup uid={uid}/>}/>
                {
                  manager 
                    ?
                    <>
                      <Route path="/" element={<Dashboard uid={uid} workers={workers} dayoffs={dayoffs} additionalInfo={additionalInfo}/>} />    
                      <Route path="/email" element={<Email />} />
                      <Route path="/manager-settings" element={<ManagerSettings/>}/>
                    </>
                    :
                      <Route path="/" element={<Worker/>}/>
                }
                <Route path="/manager-worker" element={<ManagerWorker/>}/>
                <Route path="/frame19" element={<Frame19 />} />
                <Route path="/frame20" element={<Frame20 />} />
                <Route path="/frame21" element={<Frame21 />} />
                <Route path="/frame22" element={<Frame22 />} />
                <Route path="/frame27" element={<Frame27 />} />
                <Route path="/generate-random-attendance" element={<GenerateRandomAttendanceData />} />
                <Route path="*" element={<NoMatch />} />                  
              </Routes>
            </div>
            <Footer uid={uid} workers={workers} dayoffs={dayoffs} additionalInfo={additionalInfo} />
          </div>
        </Router>
      }
    </>
  );
}

export default App;
