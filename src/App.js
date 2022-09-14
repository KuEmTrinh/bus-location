import React, { useRef, useState } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, Marker, Tooltip } from "react-leaflet";
import Map from "./component/Map";
import Location from "./component/Location";
function App() {
  const [moveCameraToggle, setMoveCameraToggle] = useState(false);
  const [busLocationName, setBusLocationName] = useState();
  const [stopX, setStopX] = useState(33.58650764);
  const [stopY, setStopY] = useState(130.5093482);
  return (
    <div className="map">
      <Map stopX={stopX} stopY={stopY} moveCameraToggle={moveCameraToggle} busLocationName={busLocationName}></Map>
      <Location setStopX={setStopX} setStopY={setStopY} setMoveCameraToggle={setMoveCameraToggle} moveCameraToggle={moveCameraToggle} setBusLocationName={setBusLocationName}></Location>
    </div>
  );
}

export default App;
