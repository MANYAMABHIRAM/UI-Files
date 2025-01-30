import React, { useState } from "react";

const AirplaneView = () => {
  const [rudder, setRudder] = useState(""); // "left" or "right"
  const [elevator, setElevator] = useState(""); // "up" or "down"

  const controlRudder = (direction) => {
    setRudder(direction);
  };

  const controlElevator = (direction) => {
    setElevator(direction);
  };

  const resetControls = () => {
    setRudder("");
    setElevator("");
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", backgroundColor: "transparent" }}>
      <svg width="240" height="200" viewBox="0 0 600 500" style={{ transform: "rotate(270deg)", zIndex: -2 }}>
        {/* Airplane Body */}
        <ellipse cx="300" cy="300" rx="60" ry="200" className="plane-body" style={{ backgroundColor: "transparent"}}/>
        <rect x="100" y="250" width="400" height="40" className="plane-body" />
        <rect x="120" y="70" width="360" height="40" className="plane-body" />
        
        {/* Elevator (Pitch Control) */}
        <rect 
          x="150" 
          y="70" 
          width="300" 
          height="20" 
          className={`plane-body ${elevator === "up" ? "glow-blue" : elevator === "down" ? "glow-orange" : ""}`} 
        />

        {/* Tail Fin */}
        <rect x="278" y="20" width="40" height="50" className="plane-body" />

        {/* Rudders (Yaw Control) */}
        <rect 
          x="100" 
          y="70" 
          width="20" 
          height="40" 
          className={`plane-body ${rudder === "left" ? "glow-red" : ""}`} 
        />
        <rect 
          x="480" 
          y="70" 
          width="20" 
          height="40" 
          className={`plane-body ${rudder === "right" ? "glow-red" : ""}`} 
        />
      </svg>
      
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => controlElevator("up")}>Pitch Up</button>
        <button onClick={() => controlElevator("down")}>Pitch Down</button>
        <button onClick={() => controlRudder("left")}>Yaw Left</button>
        <button onClick={() => controlRudder("right")}>Yaw Right</button>
        <button onClick={resetControls} style={{ backgroundColor: "red" }}>Reset</button>
      </div>
      
      <style>{`
        .plane-body {
          fill: white;
          stroke: black;
          stroke-width: 3;
          transition: fill 0.3s ease;
        }
        .glow-red { fill: red !important; }
        .glow-blue { fill: blue !important; }
        .glow-orange { fill: orange !important; }
        button {
          margin: 5px;
          padding: 8px 15px;
          font-size: 12px;
          cursor: pointer;
          background-color: blue;
          color: white;
          border: none;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: darkblue;
        }
      `}</style>
    </div>
  );
};

export default AirplaneView;
