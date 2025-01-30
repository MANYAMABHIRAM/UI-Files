import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import planeIconImg from "./plane.png";

const planeIcon = new L.DivIcon({
  html: `<img src="${planeIconImg}" style="transform: rotate(0deg); width: 50px; height: 50px;">`,
  iconSize: [50, 50],
  iconAnchor: [25, 25],
  className: "plane-icon",
});

const points = [
    [16.5062, 80.6480], // Vijayawada
    [14.4426, 79.9865], // Nellore
    [15.8281, 78.0373], // Kurnool
    [17.6868, 83.2185], // Visakhapatnam
    [18.1124, 79.0193], // Warangal
    [13.0827, 80.2707], // Chennai
    [19.0760, 72.8777], // Mumbai
    [28.7041, 77.1025], // Delhi
    [22.5726, 88.3639], // Kolkata
    [12.9716, 77.5946], // Bangalore
  ];
  

const PlaneAnimation = ({ setPath }) => {
  const map = useMap();
  const [position, setPosition] = useState(points[0]);
  const [index, setIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [progressPath, setProgressPath] = useState([...points, points[0]]);
  const [traveledPath, setTraveledPath] = useState([]);

  useEffect(() => {
    let interval;
    
    const movePlane = async () => {
      for (let i = index; i < points.length; i++) {
        const [lat1, lon1] = points[i];
        const [lat2, lon2] = points[i + 1] || points[0];
        const angle = Math.atan2(lon2 - lon1, lat2 - lat1) * (180 / Math.PI);
        setRotation(angle);
        setIndex(i);
        map.fitBounds([points[i], points[i + 1] || points[0]]);
        
        let step = 0;
        const steps = 200; // Increased steps to slow down movement
        const latStep = (lat2 - lat1) / steps;
        const lonStep = (lon2 - lon1) / steps;
        
        interval = setInterval(() => {
          if (step < steps) {
            const newPosition = [lat1 + latStep * step, lon1 + lonStep * step];
            setPosition(newPosition);
            setTraveledPath(prev => [...prev, newPosition]);
            step++;
          } else {
            clearInterval(interval);
          }
        }, 50); // Increased interval duration to slow down movement
        
        await new Promise(resolve => setTimeout(resolve, steps * 50));
      }
      setProgressPath([]);
    };
    
    movePlane();
    return () => clearInterval(interval);
  }, [index]);

  return (
    <>
      {progressPath.length > 1 && <Polyline positions={progressPath} color="red" dashArray="5, 10" weight={2}/>} 
      {traveledPath.length > 1 && <Polyline positions={traveledPath} color="green" weight={4}/>} 
      <Marker
        position={position}
        icon={new L.DivIcon({
          html: `<img src="${planeIconImg}" style="transform: rotate(${rotation}deg); width: 50px; height: 50px;">`,
          iconSize: [50, 50],
          iconAnchor: [25, 25],
          className: "plane-icon",
        })}
      />
    </>
  );
};

const Map = () => {
  return (
    
        <MapContainer center={[16.5062, 80.6480]} zoom={7} style={{ height: "42vh", width: "100%", borderRadius : "20px"}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <PlaneAnimation />
        </MapContainer>
    
  );
};

export default Map;