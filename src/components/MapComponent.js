import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
  Popup,
} from "react-leaflet";

import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = (props) => {
  const [pointA, setPointA] = useState(props.pointA);
  const [pointB, setPointB] = useState(props.pointB);
  const [distance, setDistance] = useState(props.distance);

  useEffect(() => {
    setPointA(props.pointA);
    setPointB(props.pointB);
    setDistance(props.distance);
  }, [props.pointA, props.pointB, props.distance]);

  return (
    <div className="child" id="map" style={{ height: "400px" }}>
      <MapContainer
        center={pointA || pointB || [40.72068, -74.071825]}
        zoom={13}
        minZoom={2}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MyMapComponent pointA={pointA} pointB={pointB} distance={distance} />
      </MapContainer>
    </div>
  );
};

const MyMapComponent = ({ pointA, pointB, distance }) => {
  const map = useMap();

  useEffect(() => {
    if (pointA && pointB) {
      const bounds = [pointA, pointB];
      map.fitBounds(bounds);
    }
  }, [pointA, pointB, map]);

  return (
    <>
      {pointA && (
        <Marker position={pointA}>
          <Popup>
            PointA Co-ordinates: [{pointA[0]} ,{pointA[1]}]
          </Popup>
        </Marker>
      )}
      {pointB && (
        <Marker position={pointB}>
          <Popup>
            PointB Co-ordinates: [{pointB[0]} ,{pointB[1]}]
          </Popup>
        </Marker>
      )}
      {pointA && pointB && (
        <Polyline positions={[pointA, pointB]}>
          <Popup>Distance {distance.toFixed(2)} KM</Popup>
        </Polyline>
      )}
    </>
  );
};

export default MapComponent;
