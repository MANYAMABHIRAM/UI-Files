import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Hud from "./Components/HUD/hud"
import Map from "./Components/MAP/map"
import AirplaneView from "./Components/ANIMATION/animation"
import guage from "./Guages.png"

const App = () => {
  const [altitude, setAltitude] = useState(1000); 
  const [groundSpeed, setGroundSpeed] = useState(120); 
  const [distanceToWP, setDistanceToWP] = useState(500); 
  const [yaw, setYaw] = useState(45); 
  const [verticalSpeed, setVerticalSpeed] = useState(5); 
  const [distanceToMAV, setDistanceToMAV] = useState(200); 
  const [roll, setRoll] = useState(10); 
  const [pitch, setPitch] = useState(5); 
  const [airSpeed, setAirSpeed] = useState(130); 
  const [flyingType, setFlyingType] = useState("Manual"); 
  const [flightMode, setFlightMode] = useState("Stabilize"); 
  const [waypoint, setWaypoint] = useState(3); 
  const [throttle, setThrottle] = useState(50); 
  const [climbRate, setClimbRate] = useState(2); 

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomized updates for each state every second
      setAltitude((prev) => prev + Math.random() * 10 - 5); 
      setGroundSpeed((prev) => prev + Math.random() * 2 - 1); 
      setDistanceToWP((prev) => Math.max(prev - Math.random() * 10, 0)); 
      setYaw((prev) => (prev + Math.random() * 10 - 5) % 360); 
      setVerticalSpeed((prev) => prev + Math.random() * 1 - 0.5); 
      setDistanceToMAV((prev) => Math.max(prev + Math.random() * 5 - 2.5, 0)); 
      setRoll((prev) => (prev + Math.random() * 5 - 2.5) % 360); 
      setPitch((prev) => (prev + Math.random() * 5 - 2.5) % 360); 
      setAirSpeed((prev) => prev + Math.random() * 2 - 1); 

      setFlyingType(Math.random() > 0.5 ? "Manual" : "Autonomous"); // Randomly set flying type
      setFlightMode(Math.random() > 0.5 ? "Stabilize" : "Cruise"); 
      setWaypoint((prev) => (prev + 1) % 10); 
      setThrottle((prev) => Math.min(Math.max(prev + Math.random() * 2 - 1, 0), 100));
      setClimbRate((prev) => prev + Math.random() * 1 - 0.5); 
    }, 1000); 

    return () => clearInterval(interval); 
  }, []); 

  const [messages, setMessages] = useState([
    "Mission started. Waiting for initialization.",
    "Waypoint 1 reached.",
    "Throttle set to 50%."
  ]);

  // Ref to scroll the message box
  const messageBoxRef = useRef(null);

  // Simulate adding new messages every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        `New message added at ${new Date().toLocaleTimeString()}.`
      ]);
    }, 3000); 

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="container">
      {/* Split 1: Map */}
      <div className="box split1">
        <Map/>
      </div>

      {/* Split 2: Heads Up Display */}
      <div className="box">
        <div className="content">
          <Hud/>
        </div>
      </div>

      {/* Split 3: EVTOL Orientation Graphics */}
      <div className="box">
        <div className="content"><AirplaneView/></div>
      </div>

      {/* Split 4: Quick View (Displays real-time data) */}
      <div className="box split4">
      <h2 className="heading">Quick View</h2>  
      <div className="menu">
          <div className="item">
            <p className="split4-heading">Altitude</p>
            <p className="value">{altitude.toFixed(2)}</p>
          </div>
          <div className="item">
            <p className="split4-heading">Ground Speed</p>
            <p className="value">{groundSpeed.toFixed(2)}</p>
          </div>
          <div className="item">
            <p className="split4-heading">Distance to WP</p>
            <p className="value">{distanceToWP.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="menu">
          <div className="item">
            <p className="split4-heading">Yaw</p>
            <p className="value">{yaw.toFixed(2)}</p>
          </div>
          <div className="item">
            <p className="split4-heading">Vertical Speed</p>
            <p className="value">{verticalSpeed.toFixed(2)}</p>
          </div>
          <div className="item">
            <p className="split4-heading">Distance to MAV</p>
            <p className="value">{distanceToMAV.toFixed(2)}</p>
          </div>
        </div>

        <div className="menu">
          <div className="item">
            <p className="split4-heading">Roll</p>
            <p className="value">{roll.toFixed(2)}</p>
          </div>
          <div className="item">
            <p className="split4-heading">Pitch</p>
            <p className="value">{pitch.toFixed(2)}</p>
          </div>
          <div className="item">
            <p className="split4-heading">Air Speed</p>
            <p className="value">{airSpeed.toFixed(2)}</p>
          </div>
        </div>
      </div>


      {/* Split 5: Extra Controls and Messages */}
      <div className="box split5">
  <h2 className="heading">Extra Controls</h2>

  <div className="menu first-line">
    {/* First line: Flying Type and Flight Mode */}
    <div className="item full-width">
      <p className="split5-heading">Flying Type</p>
      <p className="value">{flyingType}</p>
    </div>
    <div className="item full-width">
      <p className="split5-heading">Flight Mode</p>
      <p className="value">{flightMode}</p>
    </div>
  </div>

  <div className="menu second-line">
    {/* Second line: Waypoint, Throttle, Climb Rate */}
    <div className="item">
      <p className="split5-heading">Waypoint</p>
      <p className="value">{waypoint}</p>
    </div>
    <div className="item">
      <p className="split5-heading">Throttle</p>
      <p className="value">{throttle.toFixed(2)}%</p>
    </div>
    <div className="item">
      <p className="split5-heading">Climb Rate</p>
      <p className="value">{climbRate.toFixed(2)} m/s</p>
    </div>
  </div>

  <div className="message-box" ref={messageBoxRef}>
          <p><strong>Mission Planner Messages:</strong></p>
          <ul>
            {messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
</div>


      <div className="box split6">
        <div className="content">
          <img src={guage} className="Guage"></img>
        </div>
      </div>
    </div>
  );
};

export default App;
