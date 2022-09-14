import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  useMapEvent,
  Circle,
  Tooltip,
} from "react-leaflet";
import stopData from "../data/stop.json";
function SetViewOnClick({ animateRef }) {
  const map = useMapEvent("click", (e) => {
    console.log(e.latlng);

    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    });
  });
  return null;
}
export default function Map({
  stopX,
  stopY,
  moveCameraToggle,
  busLocationName,
}) {
  const animateRef = useRef(true);
  const mapRef = useRef();
  const fillRedOptions = { fillColor: "red" };
  const handleView = () => {
    const { current = {} } = mapRef;
    current.flyTo([stopX, stopY], 16, {
      duration: 0.5,
    });
  };
  useEffect(() => {
    if (moveCameraToggle) {
      handleView(stopX, stopY);
    }
  }, [stopX]);
  return (
    <div>
      <MapContainer
        center={[33.58650764, 130.5093482]}
        zoom={15}
        scrollWheelZoom={false}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <SetViewOnClick animateRef={animateRef} />
        <Circle
          center={[stopX, stopY]}
          pathOptions={fillRedOptions}
          radius={70}
          stroke={false}
        >
          <Tooltip opacity={1} permanent>
            {busLocationName}
          </Tooltip>
        </Circle>
        {stopData.map((el) => {
          return (
            <>
              <Circle
                center={[el.stop_lat, el.stop_lon]}
                pathOptions={{ color: "#000" }}
                stroke={false}
                radius={20}
              >
                <Tooltip opacity={0.5} permanent>
                  {el.stop_name === busLocationName ? "" : el.stop_name}
                </Tooltip>
              </Circle>
            </>
          );
        })}
      </MapContainer>
    </div>
  );
}
